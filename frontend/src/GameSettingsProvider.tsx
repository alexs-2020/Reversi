import React, { createContext, useContext, useState, ReactNode } from 'react';

type GameSettingsContextType = {
  startingPieceColor: string;
  setStartingPieceColor: (color: string) => void;
  currboardSize: number;
  setBoardSize: (size: number) => void;
  showResp: { [key: string]: boolean };
  setShowResp: (id: string, show: boolean) => void;
};


const GameSettingsContext = createContext<GameSettingsContextType | undefined>(undefined);

type GameSettingsProviderProps = {
  children: ReactNode;
};

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  if (context === undefined) {
    throw new Error('useGameSettings must be used within a GameSettingsProvider');
  }
  return context;
};

export const GameSettingsProvider: React.FC<GameSettingsProviderProps> = ({ children }) => {
  const [startingPieceColor, setStartingPieceColor] = useState<string>('#D4F4FE');
  const [currboardSize, setBoardSize] = useState<number>(8);
   const [showResp, setShowRespState] = useState<{ [key: string]: boolean }>({});

  const setShowResp = (id: string, show: boolean) => {
    setShowRespState((prev) => ({ ...prev, [id]: show }));
  };

  return (
    <GameSettingsContext.Provider value={{ startingPieceColor, setStartingPieceColor, currboardSize, setBoardSize, showResp, setShowResp }}>
      {children}
    </GameSettingsContext.Provider>
  );
};
