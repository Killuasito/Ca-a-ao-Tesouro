import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

interface FooterProps {
  onSecretTap: () => void;
}

const Footer = ({ onSecretTap }: FooterProps) => {
  return (
    <footer className="py-4 text-center bg-white/30 backdrop-blur-sm border-t border-pink-100">
      <motion.div
        className="text-pink-400 text-sm flex items-center justify-center gap-2"
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
    </footer>
  );
};

export default Footer;
