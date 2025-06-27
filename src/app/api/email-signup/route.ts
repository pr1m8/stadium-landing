import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, source, url } = await request.json();

    // Basic validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 },
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

    // Mailchimp Integration
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      try {
        const response = await fetch(
          `https://us1.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email_address: email,
              status: "subscribed",
              tags: source ? [source] : ["staidium-signup"],
              merge_fields: {
                SOURCE: source || "website",
                SIGNUP_URL: url || "staidium.io",
              },
            }),
          },
        );

        const responseData = await response.json();

        if (!response.ok) {
          // Handle existing subscriber
          if (responseData.title === "Member Exists") {
            return NextResponse.json({
              success: true,
              message: "You're already signed up! Thanks for your interest.",
            });
          }
          throw new Error(
            responseData.detail || "Failed to subscribe to Mailchimp",
          );
        }

        console.log("Successfully added to Mailchimp:", email, "from", source);
      } catch (mailchimpError) {
        console.error("Mailchimp error:", mailchimpError);
        // Continue with fallback logging if Mailchimp fails
      }
    }

    // Log the email signup for monitoring (with source info)
    console.log("Email signup:", email, "Source:", source, "URL:", url);

    return NextResponse.json({
      success: true,
      message:
        "Successfully signed up! Welcome to the Agent Olympics community.",
    });
  } catch (error) {
    console.error("Email signup error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
