import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, activityParam } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Insert into Supabase (optional, non-blocking if DB fails)
    try {
      const { error: dbError } = await supabaseAdmin
        .from('inquiries')
        .insert([
          {
            name,
            email,
            phone,
            message,
            activity_ref: activityParam || null,
          },
        ])

      if (dbError) {
        console.error('Supabase insert error:', dbError)
      }
    } catch (dbEx) {
      console.warn('Supabase exception ignored, proceeding with email:', dbEx)
    }

    // 2. Send email via Resend
    const destinationEmail = (process.env.CONTACT_EMAIL_DESTINATION || 'beflextravel@gmail.com').trim().replace(/^["']|["']$/g, '')
    let emailFrom = (process.env.EMAIL_FROM || '').trim().replace(/^["']|["']$/g, '')
    if (!emailFrom || emailFrom.includes('yourdomain.com') || (!emailFrom.includes('@') && !emailFrom.includes('<'))) {
      emailFrom = 'onboarding@resend.dev'
    }

    const resendApiKey = (process.env.RESEND_API_KEY || 're_dummy_key_for_build').trim().replace(/^["']|["']$/g, '')

    const emailSubject = activityParam
      ? `New Inquiry: ${activityParam} - ${name}`
      : `New General Inquiry - ${name}`

    if (resendApiKey === 're_dummy_key_for_build' || resendApiKey === 'your_resend_api_key' || !resendApiKey) {
      console.warn('⚠️ [DEV MODE] Resend API Key is missing or placeholder. Email sending is SIMULATED.')
      console.log(`To: ${destinationEmail}\nSubject: ${emailSubject}\nReply-To: ${email}\nMessage: ${message}`)
      return NextResponse.json({ success: true, simulated: true })
    }

    const resend = new Resend(resendApiKey)

    const { error: emailError } = await resend.emails.send({
      from: emailFrom,
      to: [destinationEmail],
      replyTo: email,
      subject: emailSubject,
      html: `
        <h2>New Inquiry from Be Flex Travel Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone/WhatsApp:</strong> ${phone || 'Not provided'}</p>
        ${activityParam ? `<p><strong>Interested in:</strong> ${activityParam}</p>` : ''}
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    })

    if (emailError) {
      console.error('Resend email error:', emailError)
      return NextResponse.json({ error: emailError.message || JSON.stringify(emailError) }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 })
  }
}
