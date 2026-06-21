import { motion } from "framer-motion";

export default function ScoreCard({ score }) {
  return (
    <motion.div
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      className="
        mt-8
        bg-white/5
        border
        border-white/10
        backdrop-blur-xl
        rounded-3xl
        p-8
      "
    >

      <h2 className="text-center text-2xl">
        ApeScore
      </h2>

      <div className="text-center mt-4">

        <span className="text-7xl font-black text-green-400">
          {score}
        </span>

        <span className="text-4xl">
          /100
        </span>

      </div>

    </motion.div>
  );
}