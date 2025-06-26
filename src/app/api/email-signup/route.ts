import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Basic validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // TODO: Implement actual email service integration
    // Option 1: Supabase
    /*
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { error } = await supabase
      .from('email_subscribers')
      .insert([{ email, subscribed_at: new Date().toISOString() }]);
    
    if (error) {
      throw new Error(error.message);
    }
    */

    // Option 2: Mailchimp
    /*
    const response = await fetch(`https://us1.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to subscribe to Mailchimp');
    }
    */

    // For now, just log the email (remove this in production)
    console.log("Email signup:", email);

    return NextResponse.json({ message: "Successfully subscribed" });
  } catch (error) {
    console.error("Email signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}