// Test script for email signup
// Run with: node test-email-signup.js

const testEmailSignup = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/email-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "wrasstley@gmail.com",
        source: "agent-olympics",
        url: "staidium.io",
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (data.success) {
      console.log("✅ Email signup successful!");
    } else {
      console.log("❌ Email signup failed:", data.message);
    }
  } catch (error) {
    console.error("Error testing email signup:", error);
  }
};

testEmailSignup();
