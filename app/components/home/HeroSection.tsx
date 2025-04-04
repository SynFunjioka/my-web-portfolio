import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import Button from "../shared/Button";
import Icon from "../shared/Icon";
import { email, linkedin } from "~/data/home";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="pt-32 pb-20 min-h-screen flex items-center bg-gradient-to-b from-[#F6F8D5] to-[#98D2C0]/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hola, soy <span className="text-secondary-500">Alan!</span>
              <br />
              <span className="text-[#205781]">Desarrollador Web</span>
            </h1>
            <p className="text-lg text-[#205781]/80 max-w-lg">
              Desarrollo soluciones web modernas y atractivas con un enfoque en
              la experiencia del usuario y el rendimiento.
            </p>
            <div className="flex space-x-4 pt-4">
              <Button
                variant="secondary"
                onClick={() => scrollToSection("contact")}
              >
                Contáctame
              </Button>
              <Button
                variant="secondary"
                onClick={() => scrollToSection("projects")}
                outline
              >
                Ver Proyectos
              </Button>
            </div>
            <div className="flex space-x-4 pt-6">
              {/* <Link
                  to="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon iconName="github" />
                  <span className="sr-only">GitHub</span>
                </Link> */}
              <Link
                to={`https://www.${linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon iconName="linkedin" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link to={`mailto:${email}`}>
                <Icon iconName="mail" /> <span className="sr-only">Email</span>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-[24rem] md:h-[24rem] lg:w-[32rem] lg:h-[32rem] xl:w-[40rem] xl:h-[40rem] rounded-full overflow-hidden border-4 md:border-8 border-secondary-500">
              <img
                src="/imgs/hero.png"
                alt="Desarrollador Web"
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
