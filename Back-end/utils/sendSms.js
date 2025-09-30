import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendSms(to, message) {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE, 
      to,
    });
    console.log("SMS sent to:", to);
  } catch (err) {
    console.error("Error sending SMS:", err.message);
  }
}
