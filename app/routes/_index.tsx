import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import Header from "~/components/layout/Header";
import HeroSection from "~/components/home/HeroSection";
import AboutSection from "~/components/home/AboutSection";
import EducationSection from "~/components/home/EducationSection";
import ExperienceSection from "~/components/home/ExperienceSection";
import SkillsSection from "~/components/home/SkillsSection";
import ProjectsSection from "~/components/home/ProjectsSection";
import ContactSection from "~/components/home/ContactSection";
import Footer from "~/components/layout/Footer";
import { APP_CONFIG } from "~/config/app-config.server";
import { useLoaderData } from "@remix-run/react";
import ScrollToTopButton from "~/components/shared/ScrollToTopButton";

export const meta: MetaFunction = () => {
  const metaContent = "Soy Alan Flores, un desarrollador web apasionado por la tecnología y el diseño. Aquí encontrarás mi portafolio, donde muestro mis proyectos y habilidades.";

  return [
    {
      title: "Alan Flores - Desarrollador Web | Portafolio",
      content: metaContent,
    },
    {
      property: "og:description",
      content: metaContent,
    },
  ];
};

export const loader = async () => {
  const cvPath  = process.env.PUBLIC_CV_FILE_PATH__SPANISH;
  const emailjs = {
    public_key : process.env.PUBLIC_EMAILJS_PUBLIC_KEY,
    template_id: process.env.PUBLIC_EMAILJS_TEMPLATE_ID,
    service_id : process.env.PUBLIC_EMAILJS_SERVICE_ID,
  }

  return Response.json({
    cvPath,
    emailjs,
  });
};

export default function Index() {
  const { cvPath, emailjs } = useLoaderData<typeof loader>();

  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "education", "projects", "skills", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
      setMobileMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSection("home");
  };

  return (
    <div className="min-h-screen bg-light-goldenrod-yellow text-primary-500">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />

      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection cvPath={cvPath} />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection scrollToSection={scrollToSection} />
      <ContactSection emailjs={emailjs} />

      <Footer />

      <ScrollToTopButton
        isVisible={activeSection !== "home"}
        onClick={scrollToTop}
      />
    </div>
  );
}
