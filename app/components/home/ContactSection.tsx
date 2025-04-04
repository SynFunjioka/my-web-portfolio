import { motion } from "framer-motion";
import Icon from "../shared/Icon";
import { email, linkedin } from "~/data/home";
import Button from "../shared/Button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISendEmailParams } from "~/utils/mailer.server";
import { useGlobalAlert } from "~/context/AlertContext";
import { FormControl } from "../shared/forms";
import { Form } from "@remix-run/react";

export default function ContactSection() {
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
    <section id="contact" className="py-20 bg-[#98D2C0]/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ponte en <span className="text-secondary-500">Contacto</span>
          </h2>
          <div className="w-20 h-1 bg-secondary-500 mx-auto mt-4"></div>
          <p className="text-[#205781]/80 max-w-2xl mx-auto mt-4">
            ¿Tienes un proyecto en mente o quieres hablar sobre oportunidades de
            colaboración? No dudes en contactarme.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2 space-y-6"
          >
            <h3 className="text-2xl font-semibold text-[#205781]">
              Información de Contacto
            </h3>
            <p className="text-[#205781]/80">
              Estoy disponible para proyectos freelance, oportunidades de
              trabajo a tiempo completo o simplemente para charlar sobre
              tecnología.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary-500/10 p-3 rounded-full">
                  <span className="text-secondary-500">
                    <Icon iconName="mail" />
                  </span>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-[#205781]/80">{email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-secondary-500/10 p-3 rounded-full">
                  <span className="text-secondary-500">
                    <Icon iconName="linkedin" />
                  </span>
                </div>
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <a
                    className="text-[#205781]/80 underline"
                    href={`https://www.${linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkedin}
                  </a>
                </div>
              </div>

              {/* <div className="flex items-center space-x-4">
                  <div className="bg-secondary-500/10 p-3 rounded-full">
                    <span className="text-secondary-500">
                      <Icon iconName="github" />
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-[#205781]/80">github.com/username</p>
                  </div>
                </div> */}
            </div>
          </motion.div>

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
        </div>
      </div>
    </section>
  );
}
