import { NextRequest, NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER_PREFIX,
});

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!audienceId) {
    return NextResponse.json({ error: 'Audience ID is not configured.' }, { status: 500 });
  }

  try {
    const response = await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: 'subscribed',
    });

    if (response && 'id' in response) {
      return NextResponse.json(
        { success: true, message: 'Successfully subscribed!', memberId: response.id },
        { status: 201 }
      );
    } else {
      console.error("Mailchimp returned an unexpected success response shape:", response);
      throw new Error("Unexpected response from Mailchimp.");
    }

  } catch (error: any) {
    console.error('Mailchimp API Error:', error);
    
    if (error.response?.body?.title === 'Member Exists') {
      return NextResponse.json({ error: 'This email is already subscribed.' }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'An error occurred during subscription. Please try again.',
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}