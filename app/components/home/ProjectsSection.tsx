import { motion } from "framer-motion";
import { projects } from "~/data/home";
import { Card, CardContent } from "../CustomCard";
import Button from "../shared/Button";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Mis <span className="text-secondary-500">Proyectos</span>
          </h2>
          <div className="w-20 h-1 bg-secondary-500 mx-auto mt-4"></div>
          <p className="text-[#205781]/80 max-w-2xl mx-auto mt-4">
            Aquí hay una selección de proyectos en los que he trabajado. Cada
            proyecto representa diferentes habilidades y tecnologías.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-ful lg:w-1/2 px-4 p-8"
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={project.image || "https://placehold.co/600x400"}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#205781] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[#205781]/80 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-secondary-100 text-primary-500 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <Button size="small" variant="secondary" outline>
                      Ver Demo
                    </Button>
                    <Button size="small" variant="secondary" outline>
                      Ver Código
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-[#205781]/80">
              Y muchos más proyectos en mi{" "}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-500 underline"
              >
                GitHub
              </a>
              .
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
