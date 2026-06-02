import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const { name, email, company, whatsapp, requirement, message } = await request.json()

    const requirementMap: Record<string, string> = {
      lace: 'Lace Fabric',
      embroidery: 'Embroidery Fabric',
      stretch: 'Stretch Lace',
      eyelash: 'Eyelash Lace',
      other: 'Other',
    }

    const html = `
      <h2>New Inquiry Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || '-'}</p>
      <p><strong>WhatsApp:</strong> ${whatsapp || '-'}</p>
      <p><strong>Product Requirement:</strong> ${requirementMap[requirement] || requirement || '-'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `

    if (resend) {
      await resend.emails.send({
        from: 'Qihong Website <sales@qihongtextile.com>',
        to: 'sales@qihongtextile.com',
        subject: `New Inquiry: ${name} - ${company || email}`,
        html,
      })
    } else {
      // Log for debugging if no API key
      console.log('Email would be sent:', { name, email, company, whatsapp, requirement, message })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}