"use client";

import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";
import { useEffect, useState } from "react";

interface ScrollToTopButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

export default function ScrollToTopButton({
  isVisible,
  onClick,
}: ScrollToTopButtonProps) {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.offsetHeight;
      const threshold = 100; // Puedes ajustar este valor según tus necesidades

      if (scrollPosition >= pageHeight - threshold) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bg-secondary text-white p-3 rounded-full shadow-lg z-50 hover:bg-secondary-600 transition-colors duration-300"
          onClick={onClick}
          style={{ right: "1.5rem" }}
          initial={{ y: 100, opacity: 0, bottom: 24 }}
          animate={{ y: 0, opacity: 1, bottom: isAtBottom ? 144 : 24 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          aria-label="Volver arriba"
        >
          <span>
            <Icon iconName="chevron-up" size={40} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
