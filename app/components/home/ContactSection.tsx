import { motion } from "framer-motion";
import Icon from "../shared/Icon";
import { email, linkedin } from "~/data/home";
import ContactForm from "./ContactForm";
import { ClientOnly } from "~/wrappers/ClientOnly";

export default function ContactSection() {
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

          <ClientOnly>
            <ContactForm />
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}
