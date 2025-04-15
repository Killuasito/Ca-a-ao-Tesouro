import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clues } from "./data/clues";
import ClueCard from "./components/ClueCard";
import Header from "./components/Header";
import HowToPage from "./components/HowToPage";
import DevPage from "./components/DevPage";
import { GameState } from "./types";

const INITIAL_STATE: GameState = {
  currentClue: 1,
  unlockedClues: [1],
  currentPage: "game",
  devAccess: false,
};

function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [secretTaps, setSecretTaps] = useState(0);

  useEffect(() => {
    const savedState = localStorage.getItem("treasureHuntState");
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("treasureHuntState", JSON.stringify(gameState));
  }, [gameState]);

  // Secret tap counter for accessing dev page
  useEffect(() => {
    if (secretTaps >= 5) {
      setGameState((prev) => ({ ...prev, currentPage: "dev" }));
      setSecretTaps(0);
    }

    // Reset counter after delay
    const timer = setTimeout(() => {
      if (secretTaps > 0) {
        setSecretTaps(0);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [secretTaps]);

  const handleCorrectCode = (clueId: number) => {
    setGameState((prev) => ({
      ...prev,
      currentClue: clueId + 1,
      unlockedClues: [...prev.unlockedClues, clueId + 1],
    }));
  };

  const handleNavigation = (page: "game" | "howto") => {
    setGameState((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleDevAuthentication = (authenticated: boolean) => {
    setGameState((prev) => ({ ...prev, devAccess: authenticated }));
  };

  const handleSecretTap = () => {
    setSecretTaps((prev) => prev + 1);
  };

  const handleDevPageBack = () => {
    setGameState((prev) => ({ ...prev, currentPage: "game" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 bg-fixed">
      <div className="fixed inset-0 z-0 bg-pattern opacity-10"></div>
      <div className="relative z-10">
        {gameState.currentPage !== "dev" && (
          <Header
            activePage={gameState.currentPage as "game" | "howto"}
            onNavigate={handleNavigation}
            onSecretTap={handleSecretTap}
          />
        )}
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {gameState.currentPage === "game" ? (
              <motion.div
                key="game"
                className="max-w-2xl mx-auto space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {clues.map((clue) => (
                  <motion.div
                    key={clue.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ClueCard
                      clue={clue}
                      isUnlocked={gameState.unlockedClues.includes(clue.id)}
                      onCorrectCode={handleCorrectCode}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : gameState.currentPage === "howto" ? (
              <motion.div
                key="howto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <HowToPage />
              </motion.div>
            ) : (
              <motion.div
                key="dev"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DevPage
                  onBack={handleDevPageBack}
                  isAuthenticated={gameState.devAccess}
                  onAuthenticate={handleDevAuthentication}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
