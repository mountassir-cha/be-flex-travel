import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, activityParam } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    // 1. Insertion dans Supabase (optionnel, non bloquant si la DB échoue)
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
        console.error('Erreur Supabase insert:', dbError)
      }
    } catch (dbEx) {
      console.warn('Exception Supabase ignorée, envoi email en cours:', dbEx)
    }

    // 2. Envoi email via Resend
    const destinationEmail = (process.env.CONTACT_EMAIL_DESTINATION || 'beflextravel@gmail.com').trim().replace(/^["']|["']$/g, '')
    let emailFrom = (process.env.EMAIL_FROM || '').trim().replace(/^["']|["']$/g, '')
    if (!emailFrom || emailFrom.includes('yourdomain.com') || (!emailFrom.includes('@') && !emailFrom.includes('<'))) {
      emailFrom = 'onboarding@resend.dev'
    }

    const resendApiKey = (process.env.RESEND_API_KEY || 're_dummy_key_for_build').trim().replace(/^["']|["']$/g, '')

    const emailSubject = activityParam
      ? `🌍 Nouvelle Demande : ${activityParam} - ${name}`
      : `📩 Nouvelle Demande de Contact - ${name}`

    if (resendApiKey === 're_dummy_key_for_build' || resendApiKey === 'your_resend_api_key' || !resendApiKey) {
      console.warn('⚠️ [DEV MODE] Clé API Resend manquante. Envoi email SIMULÉ.')
      console.log(`À: ${destinationEmail}\nSujet: ${emailSubject}\nRépondre à: ${email}\nMessage: ${message}`)
      return NextResponse.json({ success: true, simulated: true })
    }

    const resend = new Resend(resendApiKey)

    // --- Email 1 : Notification à l'administrateur ---
    const { error: emailError } = await resend.emails.send({
      from: emailFrom,
      to: [destinationEmail],
      replyTo: email,
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #c9a84c; font-size: 24px; margin: 0;">📩 Nouvelle Demande de Contact</h1>
            <p style="color: #888; margin-top: 8px;">Be Flex Travel — Site Web</p>
          </div>

          <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #c9a84c; font-size: 16px; margin: 0 0 16px;">👤 Informations du Client</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 40%;">Nom</td>
                <td style="padding: 8px 0; color: #fff;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Email</td>
                <td style="padding: 8px 0; color: #fff;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Téléphone / WhatsApp</td>
                <td style="padding: 8px 0; color: #fff;">${phone || 'Non renseigné'}</td>
              </tr>
              ${activityParam ? `
              <tr>
                <td style="padding: 8px 0; color: #888;">Activité souhaitée</td>
                <td style="padding: 8px 0; color: #fff; font-weight: bold;">${activityParam}</td>
              </tr>` : ''}
            </table>
          </div>

          <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #c9a84c; font-size: 16px; margin: 0 0 8px;">💬 Message</h2>
            <p style="color: #ccc; margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <p style="color: #555; font-size: 12px; text-align: center; margin-top: 24px;">
            Ce message a été envoyé via le formulaire de contact du site Be Flex Travel.
          </p>
        </div>
      `,
    })

    if (emailError) {
      console.error('Erreur Resend (admin):', emailError)
      return NextResponse.json({ error: emailError.message || JSON.stringify(emailError) }, { status: 500 })
    }

    // --- Email 2 : Confirmation au client ---
    const { error: clientEmailError } = await resend.emails.send({
      from: emailFrom,
      to: [email],
      subject: `✅ Message Reçu | Be Flex Travel`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 28px;">
            <h1 style="color: #c9a84c; font-size: 26px; margin: 0;">🌍 Be Flex Travel</h1>
            <p style="color: #888; margin-top: 8px; font-size: 14px;">Votre message a bien été reçu !</p>
          </div>

          <div style="background: linear-gradient(135deg, #c9a84c22, #1a1a1a); border: 1px solid #c9a84c44; border-radius: 10px; padding: 20px; margin-bottom: 20px; text-align: center;">
            <p style="color: #c9a84c; font-size: 18px; margin: 0 0 8px; font-weight: bold;">Merci, ${name} ! 🎉</p>
            <p style="color: #ccc; margin: 0; font-size: 14px;">
              Nous avons bien reçu votre message${activityParam ? ` concernant <strong style="color:#c9a84c;">${activityParam}</strong>` : ''}. 
              Notre équipe vous répondra dans les plus brefs délais, généralement sous 24h.
            </p>
          </div>

          <div style="background: #1a1a1a; border-radius: 8px; padding: 16px; margin-bottom: 20px; text-align: center;">
            <p style="color: #888; margin: 0 0 12px; font-size: 13px;">Besoin d'une réponse rapide ?</p>
            <a href="https://wa.me/212600000000" style="display: inline-block; background: #25D366; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 14px; margin-bottom: 8px;">📱 Contactez-nous sur WhatsApp</a>
            <br/>
            <a href="mailto:beflextravel@gmail.com" style="color: #c9a84c; text-decoration: none; font-size: 13px;">✉️ beflextravel@gmail.com</a>
          </div>

          <p style="color: #555; font-size: 12px; text-align: center; margin-top: 24px;">
            © 2025 Be Flex Travel — Votre Agence de Voyage au Maroc<br/>
            <a href="https://beflextravel.com" style="color: #c9a84c;">www.beflextravel.com</a>
          </p>
        </div>
      `,
    })

    if (clientEmailError) {
      console.warn('Email de confirmation client échoué (non bloquant):', clientEmailError)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Erreur API Contact:', error)
    return NextResponse.json({ error: error?.message || 'Erreur interne du serveur' }, { status: 500 })
  }
}
