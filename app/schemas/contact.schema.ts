import { z } from "zod";

export const contactSchema = z.object({
  name    : z.string().min(2, "El nombre es obligatorio"),
  lastname: z.string().min(2, "El apellido es obligatorio"),
  email   : z.string().email("Correo inválido"),
  message : z.string().min(10, "El mensaje es obligatorio"),
});