import { useState } from "react";
import { motion } from "framer-motion";
import { FaKey, FaClipboard, FaCheck } from "react-icons/fa";
import { clues } from "../data/clues";

interface DevPageProps {
  onBack: () => void;
  isAuthenticated: boolean;
  onAuthenticate: (authenticated: boolean) => void;
}

const DevPage = ({ onBack, isAuthenticated, onAuthenticate }: DevPageProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  // The password is "admin123" - change this to your preferred password
  const DEV_PASSWORD = "admin123";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DEV_PASSWORD) {
      onAuthenticate(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  const copyToClipboard = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        className="container mx-auto px-4 py-8 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border-2 border-gray-200 relative"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Acesso do Desenvolvedor
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-600 font-medium">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`w-full p-3 rounded-md border ${
                  error ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Digite a senha de desenvolvedor"
              />
              {error && <p className="text-red-500 text-sm">Senha incorreta</p>}
            </div>

            <div className="flex gap-3">
              <motion.button
                type="button"
                onClick={onBack}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-md font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Voltar
              </motion.button>
              <motion.button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-4 rounded-md font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaKey size={16} />
                <span>Acessar</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-gray-200"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            Códigos da Caça ao Tesouro
          </h2>
          <motion.button
            onClick={onBack}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voltar ao Jogo
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clues
            .filter((clue) => clue.code !== null)
            .map((clue) => (
              <motion.div
                key={clue.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                whileHover={{
                  y: -2,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <span className="font-bold text-blue-700">{clue.id}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Pista:</p>
                    <p className="text-gray-700">{clue.text}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Código:</p>
                        <p className="font-mono bg-gray-100 text-blue-700 px-2 py-1 rounded font-bold">
                          {clue.code}
                        </p>
                      </div>
                      <motion.button
                        onClick={() => copyToClipboard(clue.code!, clue.id)}
                        className={`p-2 rounded ${
                          copied === clue.id
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        {copied === clue.id ? <FaCheck /> : <FaClipboard />}
                      </motion.button>
                    </div>
                    {clue.hint && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Dica:</p>
                        <p className="text-gray-600 italic text-sm">
                          {clue.hint}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DevPage;
