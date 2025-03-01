import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

interface SymbolData {
  id: number;
  number: number;
  name: string;
  symbol: string;
  meaning: string;
  color: string;
}

interface SymbolicImageryProps {
  lifePathNumber?: number;
  expressionNumber?: number;
  soulUrgeNumber?: number;
  personalityNumber?: number;
}

const SymbolicImagery = ({
  lifePathNumber = 1,
  expressionNumber = 5,
  soulUrgeNumber = 9,
  personalityNumber = 3,
}: SymbolicImageryProps) => {
  const [activeSymbol, setActiveSymbol] = useState<number | null>(null);

  // Mock data for numerology symbols
  const symbols: SymbolData[] = [
    {
      id: 1,
      number: 1,
      name: "The Individual",
      symbol: "☉",
      meaning: "Leadership, independence, originality",
      color: "bg-gradient-to-br from-red-400 to-orange-500",
    },
    {
      id: 2,
      number: 2,
      name: "The Diplomat",
      symbol: "☽",
      meaning: "Harmony, cooperation, sensitivity",
      color: "bg-gradient-to-br from-orange-300 to-amber-500",
    },
    {
      id: 3,
      number: 3,
      name: "The Communicator",
      symbol: "☿",
      meaning: "Expression, creativity, joy",
      color: "bg-gradient-to-br from-yellow-300 to-yellow-500",
    },
    {
      id: 4,
      number: 4,
      name: "The Builder",
      symbol: "♄",
      meaning: "Stability, practicality, organization",
      color: "bg-gradient-to-br from-green-400 to-emerald-500",
    },
    {
      id: 5,
      number: 5,
      name: "The Freedom Seeker",
      symbol: "♃",
      meaning: "Change, adventure, versatility",
      color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    },
    {
      id: 6,
      number: 6,
      name: "The Nurturer",
      symbol: "♀",
      meaning: "Responsibility, love, harmony",
      color: "bg-gradient-to-br from-indigo-400 to-violet-500",
    },
    {
      id: 7,
      number: 7,
      name: "The Seeker",
      symbol: "☾",
      meaning: "Analysis, wisdom, spirituality",
      color: "bg-gradient-to-br from-purple-400 to-fuchsia-500",
    },
    {
      id: 8,
      number: 8,
      name: "The Achiever",
      symbol: "♅",
      meaning: "Power, abundance, authority",
      color: "bg-gradient-to-br from-pink-400 to-rose-500",
    },
    {
      id: 9,
      number: 9,
      name: "The Humanitarian",
      symbol: "♆",
      meaning: "Compassion, completion, selflessness",
      color: "bg-gradient-to-br from-violet-400 to-purple-600",
    },
  ];

  // Find the symbols that match the user's numbers
  const userSymbols = [
    symbols.find((s) => s.number === lifePathNumber),
    symbols.find((s) => s.number === expressionNumber),
    symbols.find((s) => s.number === soulUrgeNumber),
    symbols.find((s) => s.number === personalityNumber),
  ].filter(Boolean) as SymbolData[];

  return (
    <Card className="w-full max-w-[600px] h-[300px] bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Your Numerology Symbols
        </h3>

        <div className="flex flex-wrap justify-center gap-6">
          <TooltipProvider>
            {userSymbols.map((symbol) => (
              <motion.div
                key={symbol.id}
                className={`relative flex items-center justify-center w-20 h-20 rounded-full cursor-pointer ${symbol.color}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setActiveSymbol(activeSymbol === symbol.id ? null : symbol.id)
                }
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-4xl text-white">{symbol.symbol}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      <strong>
                        {symbol.number}: {symbol.name}
                      </strong>
                    </p>
                    <p>{symbol.meaning}</p>
                  </TooltipContent>
                </Tooltip>

                {activeSymbol === symbol.id && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 text-xs px-2 py-1 rounded-full shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {symbol.number}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </TooltipProvider>
        </div>

        {activeSymbol && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-medium">
              {symbols.find((s) => s.id === activeSymbol)?.name}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {symbols.find((s) => s.id === activeSymbol)?.meaning}
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default SymbolicImagery;
