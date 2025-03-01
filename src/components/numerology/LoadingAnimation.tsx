import React from "react";
import { motion } from "framer-motion";

interface LoadingAnimationProps {
  size?: number;
  color?: string;
  text?: string;
  isVisible?: boolean;
}

const LoadingAnimation = ({
  size = 200,
  color = "bg-gradient-to-r from-purple-500 to-indigo-600",
  text = "Calculating your numerology profile...",
  isVisible = true,
}: LoadingAnimationProps) => {
  if (!isVisible) return null;

  // Animation variants for the circles
  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    }),
  };

  // Animation for the numbers that will appear and fade
  const numberVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      y: [10, 0, -10],
      transition: {
        delay: i * 0.3,
        duration: 2,
        repeat: Infinity,
        times: [0, 0.5, 1],
      },
    }),
  };

  // Numerology numbers to display
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Pulsing circles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`circle-${i}`}
            className={`absolute inset-0 rounded-full ${color}`}
            initial="initial"
            animate="animate"
            custom={i}
            variants={circleVariants}
            style={{ opacity: 0.2 + i * 0.2 }}
          />
        ))}

        {/* Center circle with spinning effect */}
        <motion.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${color} flex items-center justify-center`}
          style={{ width: size * 0.4, height: size * 0.4 }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="text-white text-2xl font-bold">∞</span>
        </motion.div>

        {/* Floating numbers */}
        {numbers.map((num, i) => {
          const angle = (i * 40) % 360;
          const radius = size * 0.3;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={`number-${num}`}
              className="absolute flex items-center justify-center bg-white rounded-full shadow-md w-10 h-10"
              style={{
                top: `calc(50% - 20px + ${y}px)`,
                left: `calc(50% - 20px + ${x}px)`,
              }}
              initial="initial"
              animate="animate"
              custom={i}
              variants={numberVariants}
            >
              <span className="text-gray-800 font-bold">{num}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Loading text */}
      <motion.p
        className="mt-6 text-gray-600 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {text}
      </motion.p>

      {/* Loading dots */}
      <div className="flex mt-2 space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`dot-${i}`}
            className="w-2 h-2 rounded-full bg-gray-400"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;
