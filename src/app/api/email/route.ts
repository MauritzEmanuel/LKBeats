import { Resend } from "resend";
import { Email } from "@/types/email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const emailProps: Email = await req.json();

    const {data, error} = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'mastaremanuel@gmail.com',
        subject: 'Beat request',
        text: `Email: ${emailProps.email}, Name: ${emailProps.name} \nMessage: ${emailProps.message}`
    });

    if (error) {
        return Response.json({ error });
    }

    return Response.json(data);
}