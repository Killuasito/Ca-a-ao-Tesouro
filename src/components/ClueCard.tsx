import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLock,
  FaUnlock,
  FaKey,
  FaHeart,
  FaLightbulb,
  FaStar,
  FaGift,
} from "react-icons/fa";
import { ClueType } from "../types";

interface ClueCardProps {
  clue: ClueType;
  isUnlocked: boolean;
  onCorrectCode: (clueId: number) => void;
}

const ClueCard = ({ clue, isUnlocked, onCorrectCode }: ClueCardProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toLowerCase() === clue.code?.toLowerCase()) {
      onCorrectCode(clue.id);
      setError(false);
    } else {
      setError(true);
      // Shake animation will be triggered by key change
      setCode("");
    }
  };

  // Function to format text with line breaks
  const formatText = (text: string) => {
    if (clue.isLast) {
      // For the last clue, split by double newlines to create paragraphs
      return text.split("\n\n").map((paragraph, index) => (
        <p
          key={index}
          className={`${
            index > 0 ? "mt-3" : ""
          } text-lg text-gray-800 font-medium leading-relaxed`}
        >
          {paragraph}
        </p>
      ));
    }
    // Regular text for other clues
    return (
      <p className="text-lg text-gray-800 font-medium leading-relaxed">
        {text}
      </p>
    );
  };

  if (!isUnlocked) {
    return (
      <motion.div
        className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-md border-2 border-pink-200 relative overflow-hidden"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-100/50 rounded-full blur-xl"></div>
        <div className="flex items-center justify-center gap-3 text-gray-400 py-6 relative z-10">
          <motion.div
            animate={{
              y: [0, -5, 0],
              rotateZ: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <FaLock className="text-3xl text-pink-300" />
          </motion.div>
          <span className="font-medium text-lg text-pink-300">
            Pista Bloqueada
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-pink-300 hover:shadow-xl transition-all relative overflow-hidden"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3, borderColor: "rgb(244, 114, 182)" }}
    >
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-100/60 to-red-100/60 rounded-full blur-xl"></div>
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-pink-100/40 to-red-100/40 rounded-full blur-xl"></div>

      <div className="space-y-4 relative z-10">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            {clue.isLast ? (
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <FaHeart className="text-red-500 text-2xl drop-shadow-md" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.5 }}
              >
                <FaUnlock className="text-green-500 text-2xl drop-shadow-sm" />
              </motion.div>
            )}
          </div>
          <div className={`${clue.isLast ? "w-full" : ""}`}>
            {formatText(clue.text)}

            {clue.isLast && (
              <motion.div
                className="mt-6 p-5 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg border border-pink-200 shadow-inner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                    >
                      <FaStar className="text-yellow-400 mx-1 drop-shadow-md" />
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 text-pink-600 font-medium text-center mb-4">
                  <FaGift className="text-xl text-pink-500" />
                  <p className="italic">
                    Parabéns por completar a caça ao tesouro!
                  </p>
                  <FaGift className="text-xl text-pink-500" />
                </div>
                <motion.div
                  className="text-center bg-white/50 p-3 rounded-lg border border-pink-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="font-semibold text-pink-700">
                    Nosso tesouro é nosso amor, mas tem um presente especial te
                    esperando! ❤️
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {!clue.isLast && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              className="flex flex-col sm:flex-row gap-2"
              key={error ? "error" : "normal"}
              animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                placeholder="Digite o código..."
                className={`flex-1 p-3 rounded-md border ${
                  error ? "border-red-300" : "border-pink-200"
                } focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm font-medium`}
              />
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-red-400 hover:from-pink-600 hover:to-red-500 text-white px-4 py-3 rounded-md flex items-center justify-center gap-2 transition-colors shadow-sm font-medium sm:w-auto w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaKey />
                <span>Desbloquear</span>
              </motion.button>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-red-500 text-sm flex items-center gap-1 bg-red-50 p-2 rounded-md border border-red-100"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>❌</span> Código incorreto, tente novamente!
                </motion.p>
              )}
            </AnimatePresence>

            {clue.hint && (
              <div className="mt-2">
                <motion.button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1.5 transition-colors bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 hover:bg-pink-100"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaLightbulb className="text-yellow-500" />
                  {showHint ? "Esconder dica" : "Mostrar dica"}
                </motion.button>

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      className="mt-3 text-sm text-gray-600 italic bg-gradient-to-r from-yellow-50 to-pink-50 p-3 rounded-md border border-yellow-100 shadow-inner"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex gap-2 items-center">
                        <FaLightbulb className="text-yellow-500 flex-shrink-0" />
                        <p>Dica: {clue.hint}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default ClueCard;
