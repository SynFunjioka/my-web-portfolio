import { ActionFunctionArgs } from "@remix-run/node";
import { contactSchema } from "~/schemas/contact.schema";
import { verifyCaptcha } from "~/utils/captchaVerifier.server";
import { ISendEmailParams, sendEmail } from "~/utils/mailer.server";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const token = String(formData.get("token"));
    if (!token) {
        return new Response(
            JSON.stringify({ message: "Token no proporcionado." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    try {
        await verifyCaptcha(token);

        const data = {
            name: String(formData.get("name")),
            subject: String(formData.get("subject")),
            email: String(formData.get("email")),
            message: String(formData.get("message")),
        };

        const validation = contactSchema.safeParse(data);
        if (!validation.success) {
            return new Response(
                JSON.stringify({ errors: validation.error.format() }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        await sendEmail(data as ISendEmailParams);
        return new Response(
            JSON.stringify({ success: "Correo enviado exitosamente." }),
            { headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Hubo un problema al enviar el correo." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}