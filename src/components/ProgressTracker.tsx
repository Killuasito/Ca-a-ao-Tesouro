import { motion } from "framer-motion";
import { FaHeart, FaLock, FaUnlock } from "react-icons/fa";
import { clues } from "../data/clues";

interface ProgressTrackerProps {
  unlockedClues: number[];
}

const ProgressTracker = ({ unlockedClues }: ProgressTrackerProps) => {
  const totalClues = clues.length;
  const progress = Math.floor((unlockedClues.length / totalClues) * 100);

  return (
    <motion.div
      className="mb-8 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md border-2 border-pink-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-pink-600">Seu progresso</h3>
        <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm font-bold">
          {progress}% Completo
        </span>
      </div>

      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 to-red-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        {clues.map((clue) => {
          const isUnlocked = unlockedClues.includes(clue.id);
          return (
            <motion.div
              key={clue.id}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isUnlocked
                  ? clue.isLast
                    ? "bg-red-100"
                    : "bg-green-100"
                  : "bg-gray-100"
              }`}
              whileHover={{ scale: 1.1 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: clue.id * 0.1 }}
            >
              {isUnlocked ? (
                clue.isLast ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaUnlock className="text-green-600" />
                )
              ) : (
                <FaLock className="text-gray-400" />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
