import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, activityParam } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Insert into Supabase
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
      // Even if DB fails, we still want to try sending the email
    }

    // 2. Send email via Resend
    const destinationEmail = process.env.CONTACT_EMAIL_DESTINATION || 'montassirchaghough5@gmail.com'

    const emailSubject = activityParam
      ? `New Inquiry: ${activityParam} - ${name}`
      : `New General Inquiry - ${name}`

    const resendApiKey = process.env.RESEND_API_KEY || 're_dummy_key_for_build'
    if (resendApiKey === 're_dummy_key_for_build' || resendApiKey === 'your_resend_api_key') {
      console.log('Development mode: Simulating email send')
      console.log(`To: ${destinationEmail}\nSubject: ${emailSubject}\nReply-To: ${email}\nMessage: ${message}`)
      return NextResponse.json({ success: true, simulated: true })
    }

    const { error: emailError } = await resend.emails.send({
      from: 'Be Flex Travel <onboarding@resend.dev>', // Update to a verified domain in production
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
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
