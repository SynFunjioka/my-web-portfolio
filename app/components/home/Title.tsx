import React, { useState, useEffect } from "react";

interface iSegment {
  text: string;
  className: string;
}

interface iChar {
  char: string;
  className: string;
}

export default function Title() {
  // Definimos los segmentos de texto y sus estilos
  const segments: iSegment[] = [
    { text: "Hola, soy ", className: "" },
    { text: "Alan!", className: "text-secondary-500" },
    { text: "\n", className: "" },
    { text: "Desarrollador Web", className: "text-[#205781]" },
  ];

  // Aplanamos los segmentos en una lista de objetos { char, className }
  const characters = segments.reduce<iChar[]>((acc, segment) => {
    const chars = segment.text
      .split("")
      .map((char) => ({ char, className: segment.className }));
    return [...acc, ...chars];
  }, []);

  const [displayChars, setDisplayChars] = useState<iChar[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < characters.length) {
      const timeout = setTimeout(() => {
        setDisplayChars((prev) => [...prev, characters[index]]);
        setIndex(index + 1);
      }, 100); // Ajusta la velocidad del efecto (100ms por carácter)
      return () => clearTimeout(timeout);
    }
  }, [index, characters]);

  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-relaxed align-middle tracking-wide">
      {displayChars.map((item, i) => {
        if (item.char === "\n") {
          return <br key={i} />;
        }
        return (
          <span key={i} className={item.className}>
            {item.char}
          </span>
        );
      })}
      <span className="blinking-cursor">|</span>
    </h1>
  );
}
