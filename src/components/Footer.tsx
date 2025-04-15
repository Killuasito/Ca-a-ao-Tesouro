import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaQuestion, FaRedo } from "react-icons/fa";

interface FooterProps {
  onSecretTap: () => void;
  onResetGame?: () => void;
}

const Footer = ({ onSecretTap, onResetGame }: FooterProps) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetClick = () => {
    if (onResetGame) {
      setShowResetConfirm(true);
    }
  };

  const handleConfirmReset = () => {
    if (onResetGame) {
      onResetGame();
      setShowResetConfirm(false);
    }
  };

  return (
    <footer className="py-4 bg-white/30 backdrop-blur-sm border-t border-pink-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="text-pink-400 text-sm flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>Feito com</span>
            <motion.div
              whileTap={{ scale: 0.8 }}
              onClick={onSecretTap}
              className="cursor-pointer"
            >
              <FaHeart className="text-red-500 inline" />
            </motion.div>
            <span>para você</span>
          </motion.div>

          <div className="flex items-center gap-4 mt-3 md:mt-0">
            {onResetGame && (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleResetClick}
                  className="text-pink-400 hover:text-pink-600 flex items-center gap-1 text-sm"
                >
                  <FaRedo /> Reiniciar
                </motion.button>

                {showResetConfirm && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg p-3 border border-pink-200 w-64"
                  >
                    <p className="text-sm text-gray-600 mb-2">
                      Tem certeza? Isso vai resetar todo o seu progresso.
                    </p>
                    <div className="flex justify-end gap-2">
                      <button
                        className="px-3 py-1 bg-gray-100 rounded text-sm"
                        onClick={() => setShowResetConfirm(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                        onClick={handleConfirmReset}
                      >
                        Reiniciar
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-pink-400 hover:text-pink-600 flex items-center gap-1 text-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaQuestion /> Ajuda
            </motion.a>
          </div>
        </div>

        <motion.div
          className="mt-2 text-xs text-pink-300 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          © 2023 Caça ao Tesouro do Amor
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
