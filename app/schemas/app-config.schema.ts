import { z } from "zod";

// Creamos un esquema que valide la sección de SMTP.
export const APP_CONFIG_SCHEMA = z.object({
  recipient_email: z.string().email(),
  smtp: z.object({
    host: z.string().min(1, "SMTP_HOST no puede estar vacío"),
    port: z.number(),
    secure: z.boolean(),
    user: z.string().min(1, "SMTP_USER no puede estar vacío"),
    pass: z.string().min(1, "SMTP_PASS no puede estar vacío"),
  }),
  recaptcha: z.object({
    site_key: z.string().min(1, "RECAPTCHA_SITE_KEY no puede estar vacío"),
    secret_key: z.string().min(1, "RECAPTCHA_SECRET_KEY no puede estar vacío"),
  }),
  emailjs: z.object({
    public_key: z.string().min(1, "EMAILJS_PUBLIC_KEY no puede estar vacío"),
    private_key: z.string().min(1, "EMAILJS_PUBLIC_KEY no puede estar vacío"),
    template_id: z.string().min(1, "EMAILJS_TEMPLATE_ID no puede estar vacío"),
    service_id: z.string().min(1, "EMAILJS_SERVICE_ID no puede estar vacío"),
  })
});

// Extraemos el tipo para poder usarlo en toda la aplicación
export type TAppConfig = z.infer<typeof APP_CONFIG_SCHEMA>;
