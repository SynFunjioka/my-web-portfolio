import { APP_CONFIG_SCHEMA, TAppConfig } from "~/schemas/app-config.schema";

export function loadAppConfig(): TAppConfig {
  const envVars = {
    recipient_email: process.env.RECIPIENT_EMAIL,
    smtp: {
      host: process.env.SMTP_HOST ?? "",
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
      user: process.env.SMTP_USER ?? "",
      pass: process.env.SMTP_PASS ?? "",
      secure: process.env.SMTP_SECURE === "true"
    },
    recaptcha: {
      site_key: process.env.GOOGLE_CAPTCHA_SITE_KEY,
      secret_key: process.env.GOOGLE_CAPTCHA_SECRET_KEY,
    },
  };

  // Validamos con Zod y, si algo está mal, Zod lanzará una excepción
  const parsedConfig = APP_CONFIG_SCHEMA.parse(envVars);

  return parsedConfig;
}

// Opcionalmente, puedes exportar directamente la configuración
// validada para que esté disponible en toda tu app:
export const APP_CONFIG = loadAppConfig();
