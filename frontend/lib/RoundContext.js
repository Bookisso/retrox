import { createContext, useState } from "react";
import { roundsData } from "../data/rounds";

export const RoundContext = createContext([]);

export function RoundContextProvider({ children }) {
  const [rounds, setRounds] = useState(roundsData);

  return (
    <RoundContext.Provider value={{ rounds, setRounds }}>
      {children}
    </RoundContext.Provider>
  );
}
