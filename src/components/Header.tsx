import { FaHeart, FaInfo, FaGamepad } from "react-icons/fa";
import { motion } from "framer-motion";

interface HeaderProps {
  activePage: "game" | "howto";
  onNavigate: (page: "game" | "howto") => void;
}

const Header = ({ activePage, onNavigate }: HeaderProps) => {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-10 border-b-4 border-pink-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.h1
            className="text-3xl md:text-4xl text-center font-bold flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <FaHeart className="text-red-500" />
            </motion.div>
            <span className="bg-gradient-to-r from-pink-500 via-red-400 to-pink-400 text-transparent bg-clip-text">
              Caça ao Tesouro do Amor
            </span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                delay: 0.5,
              }}
            >
              <FaHeart className="text-red-500" />
            </motion.div>
          </motion.h1>

          <nav className="mt-4 md:mt-0 flex justify-center">
            <motion.div
              className="bg-gradient-to-r from-pink-200 to-red-100 rounded-full p-1.5 flex gap-1.5 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("game")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-medium ${
                  activePage === "game"
                    ? "bg-gradient-to-r from-pink-500 to-red-400 text-white shadow-md"
                    : "text-pink-800 hover:bg-pink-200"
                }`}
              >
                <FaGamepad /> Jogo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("howto")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-medium ${
                  activePage === "howto"
                    ? "bg-gradient-to-r from-pink-500 to-red-400 text-white shadow-md"
                    : "text-pink-800 hover:bg-pink-200"
                }`}
              >
                <FaInfo /> Como Jogar
              </motion.button>
            </motion.div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
