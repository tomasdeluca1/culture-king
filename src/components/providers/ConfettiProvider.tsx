"use client";

import JSConfetti from "js-confetti";
import { createContext, useContext, useEffect, useState } from "react";

type ConfettiContextType = {
  confetti: JSConfetti | null;
  throwConfetti: () => void;
};

const ConfettiContext = createContext<ConfettiContextType>({
  confetti: null,
  throwConfetti: () => {},
});

export function ConfettiProvider({ children }: { children: React.ReactNode }) {
  const [confetti, setConfetti] = useState<JSConfetti | null>(null);

  useEffect(() => {
    setConfetti(new JSConfetti());
  }, []);

  const throwConfetti = () => {
    confetti?.addConfetti({
      confettiColors: [
        "#ff0a54",
        "#ff477e",
        "#ff7096",
        "#ff85a1",
        "#fbb1bd",
        "#f9bec7",
      ],
    });
  };

  return (
    <ConfettiContext.Provider value={{ confetti, throwConfetti }}>
      {children}
    </ConfettiContext.Provider>
  );
}

export const useConfetti = () => useContext(ConfettiContext);
