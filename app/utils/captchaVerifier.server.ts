import { APP_CONFIG } from "~/config/app.config";

export async function verifyCaptcha(token: string): Promise<void | never> {
  const secretKey = APP_CONFIG.recaptcha.secret_key;

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Error al verificar el CAPTCHA");
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error("CAPTCHA no verificado");
  }
};