import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, circuit: startingCity, endingCity, duration, date, passengers, notes } = body

    if (!name || !email || !startingCity || !endingCity || !duration || !date) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    const destinationEmail = (process.env.CONTACT_EMAIL_DESTINATION || 'beflextravel@gmail.com').trim().replace(/^["']|["']$/g, '')
    let emailFrom = (process.env.EMAIL_FROM || '').trim().replace(/^["']|["']$/g, '')
    if (!emailFrom || emailFrom.includes('yourdomain.com') || (!emailFrom.includes('@') && !emailFrom.includes('<'))) {
      emailFrom = 'onboarding@resend.dev'
    }

    const resendApiKey = (process.env.RESEND_API_KEY || 're_dummy_key_for_build').trim().replace(/^["']|["']$/g, '')

    const emailSubject = `🏜️ Nouvelle Demande de Circuit : ${startingCity} → ${endingCity} - ${name}`

    if (resendApiKey === 're_dummy_key_for_build' || resendApiKey === 'your_resend_api_key' || !resendApiKey) {
      console.warn('⚠️ [DEV MODE] Clé API Resend manquante. Envoi email SIMULÉ.')
      console.log(`À: ${destinationEmail}\nSujet: ${emailSubject}\nDe: ${name} (${email})\nItinéraire: ${startingCity} → ${endingCity}\nDurée: ${duration} jours\nDate: ${date}\nVoyageurs: ${passengers}\nNotes: ${notes}`)
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
            <h1 style="color: #c9a84c; font-size: 24px; margin: 0;">🏜️ Nouvelle Demande de Circuit</h1>
            <p style="color: #888; margin-top: 8px;">Be Flex Travel — Créez Votre Propre Voyage</p>
          </div>

          <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #c9a84c; font-size: 16px; margin: 0 0 16px;">🗺️ Détails du Circuit</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 40%;">Ville de départ</td>
                <td style="padding: 8px 0; color: #fff; font-weight: bold;">${startingCity}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; width: 40%;">Ville d'arrivée</td>
                <td style="padding: 8px 0; color: #fff; font-weight: bold;">${endingCity}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Durée</td>
                <td style="padding: 8px 0; color: #fff;">${duration} jours</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Date de départ</td>
                <td style="padding: 8px 0; color: #fff;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Nombre de voyageurs</td>
                <td style="padding: 8px 0; color: #fff;">${passengers || '1'}</td>
              </tr>
            </table>
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
            </table>
          </div>

          ${notes ? `
          <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #c9a84c; font-size: 16px; margin: 0 0 8px;">📝 Notes Supplémentaires</h2>
            <p style="color: #ccc; margin: 0; white-space: pre-wrap;">${notes}</p>
          </div>` : ''}

          <p style="color: #555; font-size: 12px; text-align: center; margin-top: 24px;">
            Cette demande a été soumise via le formulaire de réservation du site Be Flex Travel.
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
      subject: `✅ Demande Reçue — Circuit ${startingCity} → ${endingCity} | Be Flex Travel`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 28px;">
            <h1 style="color: #c9a84c; font-size: 26px; margin: 0;">🏜️ Be Flex Travel</h1>
            <p style="color: #888; margin-top: 8px; font-size: 14px;">Votre demande de voyage a bien été reçue !</p>
          </div>

          <div style="background: linear-gradient(135deg, #c9a84c22, #1a1a1a); border: 1px solid #c9a84c44; border-radius: 10px; padding: 20px; margin-bottom: 20px; text-align: center;">
            <p style="color: #c9a84c; font-size: 18px; margin: 0 0 8px; font-weight: bold;">Merci, ${name} ! 🎉</p>
            <p style="color: #ccc; margin: 0; font-size: 14px;">Nous avons bien reçu votre demande de circuit personnalisé. Notre équipe vous contactera très prochainement pour discuter des détails et vous fournir un devis personnalisé.</p>
          </div>

          <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #c9a84c; font-size: 16px; margin: 0 0 16px;">📋 Récapitulatif de votre demande</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #2a2a2a;">
                <td style="padding: 10px 0; color: #888; width: 45%;">Itinéraire</td>
                <td style="padding: 10px 0; color: #fff; font-weight: bold;">${startingCity} → ${endingCity}</td>
              </tr>
              <tr style="border-bottom: 1px solid #2a2a2a;">
                <td style="padding: 10px 0; color: #888;">Durée</td>
                <td style="padding: 10px 0; color: #fff;">${duration} jours</td>
              </tr>
              <tr style="border-bottom: 1px solid #2a2a2a;">
                <td style="padding: 10px 0; color: #888;">Date de départ</td>
                <td style="padding: 10px 0; color: #fff;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888;">Voyageurs</td>
                <td style="padding: 10px 0; color: #fff;">${passengers || '1'}</td>
              </tr>
            </table>
          </div>

          <div style="background: #1a1a1a; border-radius: 8px; padding: 16px; margin-bottom: 20px; text-align: center;">
            <p style="color: #888; margin: 0 0 8px; font-size: 13px;">Besoin de nous contacter directement ?</p>
            <a href="https://wa.me/212665641200" style="color: #c9a84c; text-decoration: none; font-weight: bold;">📱 WhatsApp</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="mailto:beflextravel@gmail.com" style="color: #c9a84c; text-decoration: none; font-weight: bold;">✉️ beflextravel@gmail.com</a>
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
  } catch (error) {
    console.error('Erreur API Tour Booking:', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
