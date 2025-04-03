import { motion } from "framer-motion";
import { workExperience } from "~/data/home";

export default function ExperienceSection({
  scrollToSection,
}: {
  scrollToSection: (sectionId: string) => void;
}) {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Mi <span className="text-secondary-500">Experiencia</span>
          </h2>
          <div className="w-20 h-1 bg-secondary-500 mx-auto mt-4"></div>
          <p className="text-[#205781]/80 max-w-2xl mx-auto mt-4">
            Mi trayectoria profesional y proyectos en los que he trabajado.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-10">
          {workExperience.map((work, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#98D2C0]/30"
            >
              <div className="md:flex">
                <div className="md:w-1/3 bg-[#F6F8D5] p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#205781]">
                      {work.position}
                    </h3>
                    <p className="text-secondary-500 font-medium mt-1">
                      {work.company}
                    </p>
                    <p className="text-[#205781]/70 text-sm mt-4">
                      {work.period}
                    </p>
                  </div>
                  <div className="hidden md:block mt-6">
                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-[#98D2C0]/20 text-[#205781] text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="text-[#205781]/80 mb-4">{work.description}</p>
                  <ul className="space-y-2 text-[#205781]/80">
                    {work.tasks.map((resp, index) => (
                      <li className="flex items-start">
                        <span className="text-secondary-500 mr-2">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="md:hidden mt-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-[#98D2C0]/20 text-[#205781] text-xs px-2 py-1 rounded-full">
                        React
                      </span>
                      <span className="bg-[#98D2C0]/20 text-[#205781] text-xs px-2 py-1 rounded-full">
                        TypeScript
                      </span>
                      <span className="bg-[#98D2C0]/20 text-[#205781] text-xs px-2 py-1 rounded-full">
                        Next.js
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}