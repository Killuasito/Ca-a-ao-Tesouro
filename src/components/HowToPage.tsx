import { motion } from "framer-motion";
import {
  FaLock,
  FaKey,
  FaInfoCircle,
  FaLightbulb,
  FaMagic,
  FaTrophy,
} from "react-icons/fa";

const HowToPage = () => {
  const steps = [
    {
      icon: <FaLock className="text-lg text-pink-400" />,
      title: "Pistas bloqueadas",
      description:
        "As pistas são desbloqueadas sequencialmente. Você começa com a primeira pista disponível.",
    },
    {
      icon: <FaKey className="text-lg text-yellow-500" />,
      title: "Códigos secretos",
      description:
        "Cada pista contém um enigma ou referência a um local especial. Quando você descobrir a resposta, insira o código correspondente para desbloquear a próxima pista.",
    },
    {
      icon: <FaLightbulb className="text-lg text-amber-400" />,
      title: "Dicas disponíveis",
      description:
        "Se você estiver tendo dificuldades, cada pista possui uma dica que pode ajudar a descobrir o código.",
    },
    {
      icon: <FaTrophy className="text-lg text-red-500" />,
      title: "Encontre o tesouro",
      description:
        "A última pista revelará uma mensagem especial quando todas as anteriores forem desbloqueadas. Este é o tesouro final - uma declaração de amor!",
    },
  ];

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border-2 border-pink-200 relative overflow-hidden"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-pink-100/50 to-red-100/50 rounded-full blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-pink-100/50 to-red-100/50 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <FaInfoCircle className="text-3xl text-pink-500" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-400 text-transparent bg-clip-text">
              Como funciona a caça ao tesouro
            </h2>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="mt-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center shadow-md">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-pink-500 mb-2 flex items-center gap-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="mt-10 p-6 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg border border-pink-100 shadow-inner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <FaMagic className="text-3xl text-pink-500" />
                </motion.div>
              </div>
              <p className="text-pink-600 font-medium text-center">
                Esta caça ao tesouro foi criada com amor para celebrar momentos
                especiais do nosso relacionamento. Cada pista representa um
                momento único que compartilhamos juntos. ❤️
              </p>
            </motion.div>

            <div className="bg-gradient-to-r from-pink-500 to-red-400 p-px rounded-lg mt-8">
              <div className="bg-white rounded-lg p-4">
                <p className="text-center text-gray-600 italic">
                  "O amor não se vê com os olhos, mas com o coração." ❤️
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HowToPage;
