import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = process.env.MY_EMAIL_ADDRESS;

export async function POST(request: NextRequest) {
  if (!myEmail) {
    return NextResponse.json({ error: 'Recipient email address is not configured.' }, { status: 500 });
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Resend API key is not configured.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'aan.syidin@gmail.com',
      subject: `New Message from Portfolio Contact Form - ${name}`,
      replyTo: email,
      html: `
        <p>You have a new message from your portfolio contact form:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <span class="math-inline">${email}</p\>
        <p><strong>Message:</strong></p>
        \n${message}`
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send message.', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!', data }, { status: 200 });

  } catch (err: any) {
    console.error('Error processing contact form:', err);
    return NextResponse.json({ error: 'Error processing request.', details: err.message }, { status: 500 });
  }
}