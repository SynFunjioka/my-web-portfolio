import { motion } from "framer-motion";
import Button from "../shared/Button";
import { email } from "~/data/home";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Sobre <span className="text-secondary-500">Mí</span>
          </h2>
          <div className="w-20 h-1 bg-secondary-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <img
              src="/imgs/full.png"
              alt="Sobre mí"
              width={512}
              height={512}
              className="rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2 space-y-6"
          >
            <h3 className="text-2xl font-semibold text-[#205781]">
              Desarrollador Web con pasión por crear experiencias digitales
              excepcionales
            </h3>
            <p className="text-[#205781]/80">
              Soy un desarrollador web con más de 2 años de experiencia creando
              aplicaciones web modernas y responsivas. Me especializo en
              tecnologías frontend como React, Remix.js y TypeScript, pero
              también tengo experiencia en desarrollo backend con Node.js. y
              Laravel.
            </p>
            <p className="text-[#205781]/80">
              Mi enfoque se centra en crear interfaces de usuario intuitivas y
              atractivas que proporcionen una excelente experiencia al usuario.
              Me apasiona aprender nuevas tecnologías y metodologías para
              mejorar constantemente mis habilidades.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <p className="font-medium">Nombre:</p>
                <p className="text-[#205781]/80">Alan Amador Flores Fiscal</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-[#205781]/80">{email}</p>
              </div>
              <div>
                <p className="font-medium">Ubicación:</p>
                <p className="text-[#205781]/80">Durango, Dgo. México</p>
              </div>
              {/* Hacer esto configurable desde un dashboard */}
              <div>
                <p className="font-medium">Disponibilidad:</p>
                <p className="text-[#205781]/80">Disponible para proyectos</p>
              </div>
            </div>
            <Button
              onClick={() => window.open("/cv.pdf", "_blank")}
              className="bg-secondary-500 hover:bg-[#205781] text-white mt-4"
            >
              Descargar CV
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
