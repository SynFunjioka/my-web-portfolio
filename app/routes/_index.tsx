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

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const config = APP_CONFIG
  return Response.json({});
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "education", "experience", "skills", "projects", "contact"]
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

  return (
    <div className="min-h-screen bg-[#F6F8D5] text-[#205781]">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />

      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <EducationSection />
      <ExperienceSection scrollToSection={scrollToSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />

      <Footer />
    </div>
  );
}
