import { Form } from "@remix-run/react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { useGlobalAlert } from "~/context/AlertContext";
import { ISendEmailParams } from "~/utils/mailer.server";
import Button from "../shared/Button";
import { FormControl } from "../shared/forms";
import { useConfirmModal } from "~/hooks/useConfirmModal";

export default function ContactForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleCaptchaChange = (token: string | null) => {
    setIsCaptchaVerified(!!token);
  };

  const globalAlert = useGlobalAlert();
  const { ConfirmDialog, confirm } = useConfirmModal();
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISendEmailParams>();

  const onSubmit: SubmitHandler<ISendEmailParams> = async (data, event) => {
    event?.preventDefault();

    if (!isCaptchaVerified) {
      globalAlert.addAlert(
        "CAPTCHA no verificado. Por favor, verifica el CAPTCHA.",
        "danger",
        3000
      );
      return;
    }

    const result = await confirm({
      title: "Enviar correo",
      message: "¿Estás seguro de enviar este mensaje?",
    });

    if(!result) return;

    const formData = new FormData();

    // Add each field to the FormData
    (Object.keys(data) as (keyof ISendEmailParams)[]).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append the token to the FormData
    const token = recaptchaRef.current?.getValue();
    if (token) {
      formData.append("token", token);
    }

    try {
      setIsSending(true);

      // Send FormData without setting Content-Type because FormData does that automatically
      const response = await fetch("/sendEmail", {
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
      recaptchaRef.current?.reset();
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
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede exceder los 50 caracteres",
              },
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
            minLength: {
              value: 2,
              message: "El asunto debe tener al menos 2 caracteres",
            },
            maxLength: {
              value: 100,
              message: "El asunto no puede exceder los 100 caracteres",
            },
          })}
          error={errors.subject}
        />

        <FormControl
          type="textarea"
          placeholder="Escribe tu mensaje aquí..."
          label="Mensaje"
          register={register("message", {
            required: "Campo obligatorio",
            minLength: {
              value: 10,
              message: "El mensaje debe tener al menos 10 caracteres",
            },
            maxLength: {
              value: 500,
              message: "El mensaje no puede exceder los 500 caracteres",
            },
          })}
          error={errors.message}
        />

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfBiQorAAAAAA9JYnmNzlIH4Sl3pk2_3wY0zwCM"
          onChange={handleCaptchaChange}
          onExpired={() => setIsCaptchaVerified(false)}
        />
        <Button
          variant="secondary"
          type="submit"
          className="w-full"
          isLoading={isSending}
        >
          Enviar Mensaje
        </Button>
        {ConfirmDialog}
      </Form>
    </motion.div>
  );
}
