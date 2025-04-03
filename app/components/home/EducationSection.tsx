import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { certificates, education } from "~/data/home";

export default function EducationSection() {
  return (
    <section id="education" className="py-20 bg-[#F6F8D5]/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Educación y <span className="text-secondary-500">Certificados</span>
          </h2>
          <div className="w-20 h-1 bg-secondary-500 mx-auto mt-4"></div>
          <p className="text-[#205781]/80 max-w-2xl mx-auto mt-4">
            Mi formación académica y certificaciones profesionales que respaldan
            mis habilidades.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-secondary-500/30"></div>

            {/* Education Items */}
            <div className="space-y-12">
              {education.map((edu, index) => {
                const isEven = index % 2 === 0; // índice par: layout A; impar: layout B
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: isEven ? 0 : 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex flex-col md:flex-row items-center md:justify-between"
                  >
                    {isEven ? (
                      <>
                        {/* Contenido en el lado izquierdo */}
                        <div className="flex items-center order-1 md:order-1 md:w-1/2 md:justify-end md:pr-8 pb-4 md:pb-0">
                          <div className="z-10 flex md:justify-end">
                            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-secondary-500 max-w-md">
                              <span className="text-sm text-secondary-500 font-semibold">
                                {edu.period}
                              </span>
                              <h3 className="text-xl font-bold text-[#205781] mt-1">
                                {edu.title}
                              </h3>
                              <p className="text-[#205781]/80 mt-1">
                                {edu.institution}
                              </p>
                              <p className="text-sm text-[#205781]/70 mt-2">
                                {edu.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Línea central */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-secondary-500 shadow z-10 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-white"></div>
                          </div>
                        </div>

                        {/* Espacio vacío para el lado derecho */}
                        <div className="md:w-1/2 md:pl-8"></div>
                      </>
                    ) : (
                      <>
                        {/* Espacio vacío para el lado izquierdo */}
                        <div className="md:w-1/2 md:pr-8"></div>

                        {/* Línea central */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-secondary-500 shadow z-10 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-white"></div>
                          </div>
                        </div>

                        {/* Contenido en el lado derecho */}
                        <div className="flex items-center order-1 md:w-1/2 md:justify-start md:pl-8 pb-4 md:pb-0">
                          <div className="z-10">
                            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-secondary-500 max-w-md">
                              <span className="text-sm text-secondary-500 font-semibold">
                                {edu.period}
                              </span>
                              <h3 className="text-xl font-bold text-[#205781] mt-1">
                                {edu.title}
                              </h3>
                              <p className="text-[#205781]/80 mt-1">
                                {edu.institution}
                              </p>
                              <p className="text-sm text-[#205781]/70 mt-2">
                                {edu.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Certificates Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h3 className="text-2xl font-semibold text-center mb-8">
              Certificados Adicionales
            </h3>
            <div className="flex flex-wrap justify-center">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="w-full sm:w-1/2 md:w-1/3 p-2"
                >
                  <div className="h-full bg-white p-4 rounded-lg shadow-sm border border-[#98D2C0]/50 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-[#205781]">
                          {cert.url ? (
                            <Link
                              to={`https://${cert.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {cert.name}
                            </Link>
                          ) : (
                            cert.name
                          )}
                        </h4>
                        <p className="text-sm text-[#205781]/70">
                          {cert.issuer}
                        </p>
                      </div>
                      <span className="text-xs bg-[#98D2C0]/20 text-secondary-500 px-2 py-1 rounded-full">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}