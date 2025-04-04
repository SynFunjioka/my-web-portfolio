import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useGlobalAlert } from "~/context/AlertContext";
import { ISendEmailParams } from "~/utils/mailer.server";
import Button from "../shared/Button";
import { FormControl } from "../shared/forms";
import { Form } from "@remix-run/react";

export default function ContactForm() {
  const globalAlert = useGlobalAlert();
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISendEmailParams>();

  const onSubmit: SubmitHandler<ISendEmailParams> = async (data, event) => {
    event?.preventDefault();

    const formData = new FormData();

    // Add each field to the FormData
    (Object.keys(data) as (keyof ISendEmailParams)[]).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      setIsSending(true);

      // Send FormData without setting Content-Type because FormData does that automatically
      const response = await fetch("/", {
        method: "POST",
        body: formData, // Use the FormData as the request body
      });

      if (!response.ok) {
        globalAlert.addAlert(
          "Error al enviar mensaje. Por favor, intenta nuevamente.",
          "danger",
          3000
        );
        console.error(response.statusText);
        return;
      }

      globalAlert.addAlert("Mensaje enviado exitosamente.", "success", 3000);

      // Reset the form after successful submission
      event?.target.reset();
    } catch (error) {
      globalAlert.addAlert(
        "Error al enviar mensaje. Por favor, intenta nuevamente.",
        "danger",
        3000
      );
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="md:w-1/2"
      >
        <Form
          method="post"
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormControl
              type="text"
              label="Nombre"
              placeholder="Tu nombre"
              register={register("name", {
                required: "Campo obligatorio",
              })}
              error={errors.name}
              className="w-full"
            />

            <FormControl
              type="text"
              placeholder="Tu correo electrónico"
              label="Email"
              register={register("email", {
                required: "Campo obligatorio",
              })}
              error={errors.email}
            />
          </div>
          <FormControl
            type="text"
            placeholder="Asunto"
            label="Asunto"
            register={register("subject", {
              required: "Campo obligatorio",
            })}
            error={errors.subject}
          />

          <FormControl
            type="textarea"
            placeholder="Escribe tu mensaje aquí..."
            label="Mensaje"
            register={register("message", {
              required: "Campo obligatorio",
            })}
            error={errors.message}
          />

          <Button
            variant="secondary"
            type="submit"
            className="w-full"
            isLoading={isSending}
          >
            Enviar Mensaje
          </Button>
        </Form>
      </motion.div>
  );
}
