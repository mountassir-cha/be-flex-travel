import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, origin, destination, date, passengers, notes } = body

    if (!name || !email || !origin || !destination || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const destinationEmail = process.env.CONTACT_EMAIL_DESTINATION || 'beflextravel@gmail.com'
    const emailSubject = `🚗 New Transfer Booking: ${origin} → ${destination} - ${name}`

    const resendApiKey = process.env.RESEND_API_KEY || 're_dummy_key_for_build'
    if (resendApiKey === 're_dummy_key_for_build' || resendApiKey === 'your_resend_api_key') {
      console.log('Development mode: Simulating transport booking email')
      console.log(`To: ${destinationEmail}\nSubject: ${emailSubject}\nFrom: ${name} (${email})\nRoute: ${origin} → ${destination}\nDate: ${date}\nPassengers: ${passengers}\nNotes: ${notes}`)
      return NextResponse.json({ success: true, simulated: true })
    }

    const { error: emailError } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Be Flex Travel <onboarding@resend.dev>',
      to: [destinationEmail],
      replyTo: email,
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #c9a84c; font-size: 24px; margin: 0;">🚗 New Transport Booking</h1>
            <p style="color: #888; margin-top: 8px;">Be Flex Travel — Custom Transfer Request</p>
          </div>

          <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #c9a84c; font-size: 16px; margin: 0 0 16px;">📍 Route Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 40%;">From</td>
                <td style="padding: 8px 0; color: #fff; font-weight: bold;">${origin}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">To</td>
                <td style="padding: 8px 0; color: #fff; font-weight: bold;">${destination}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Date</td>
                <td style="padding: 8px 0; color: #fff;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Passengers</td>
                <td style="padding: 8px 0; color: #fff;">${passengers || '1'}</td>
              </tr>
            </table>
          </div>

          <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #c9a84c; font-size: 16px; margin: 0 0 16px;">👤 Client Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 40%;">Name</td>
                <td style="padding: 8px 0; color: #fff;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Email</td>
                <td style="padding: 8px 0; color: #fff;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Phone / WhatsApp</td>
                <td style="padding: 8px 0; color: #fff;">${phone || 'Not provided'}</td>
              </tr>
            </table>
          </div>

          ${notes ? `
          <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #c9a84c; font-size: 16px; margin: 0 0 8px;">📝 Additional Notes</h2>
            <p style="color: #ccc; margin: 0; white-space: pre-wrap;">${notes}</p>
          </div>` : ''}

          <p style="color: #555; font-size: 12px; text-align: center; margin-top: 24px;">
            This request was submitted through the Be Flex Travel website transport booking form.
          </p>
        </div>
      `,
    })

    if (emailError) {
      console.error('Resend email error:', emailError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Transport Booking API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
