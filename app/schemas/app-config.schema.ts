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
});

// Extraemos el tipo para poder usarlo en toda la aplicación
export type TAppConfig = z.infer<typeof APP_CONFIG_SCHEMA>;
