import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

import ResultsOverview from "./ResultsOverview";
import NumberCard from "./NumberCard";
import RadialChart from "./RadialChart";
import SymbolicImagery from "./SymbolicImagery";
import ActionButtons from "./ActionButtons";
import GridCalculation from "./GridCalculation";

interface NumerologyNumber {
  name: string;
  value: number;
  description: string;
  color: string;
  detailedDescription?: string;
}

interface ResultsDisplayProps {
  isLoading?: boolean;
  userName?: string;
  birthDate?: string;
  formattedDate?: string;
  numbers?: NumerologyNumber[];
  onSaveResults?: () => void;
  onShareResults?: () => void;
  onNewCalculation?: () => void;
}

const ResultsDisplay = ({
  isLoading = false,
  userName = "Jane Doe",
  birthDate = "January 15, 1985",
  formattedDate,
  numbers = [
    {
      name: "Life Path",
      value: 7,
      description:
        "The seeker and analyzer, focused on spiritual growth and understanding.",
      color: "from-indigo-500 to-indigo-600",
      detailedDescription:
        "As a Life Path 7, you are a natural seeker of truth and wisdom. You have a deeply analytical mind and are drawn to spiritual and philosophical pursuits. Your path involves developing your intuition, learning to trust your inner voice, and finding meaning beyond the material world. You thrive in environments that allow for contemplation and deep study.",
    },
    {
      name: "Expression",
      value: 3,
      description:
        "The creative communicator, expressing ideas with enthusiasm and joy.",
      color: "from-pink-500 to-pink-600",
      detailedDescription:
        "With an Expression number 3, you have a natural gift for communication and creative expression. You're likely artistic, optimistic, and socially engaging. Your purpose involves sharing your creative vision with the world, uplifting others through your enthusiasm, and finding joy in self-expression. You excel when you can use your imagination and communicate your ideas.",
    },
    {
      name: "Soul Urge",
      value: 9,
      description:
        "The humanitarian, driven by compassion and desire to make a difference.",
      color: "from-purple-500 to-purple-600",
      detailedDescription:
        "Your Soul Urge number 9 reveals a deep inner desire to serve humanity and make a meaningful difference in the world. You're motivated by compassion, idealism, and a sense of universal love. At your core, you seek to contribute to the greater good and may feel drawn to humanitarian causes, artistic expression with depth, or spiritual teachings that emphasize unity.",
    },
    {
      name: "Personality",
      value: 5,
      description:
        "The freedom-seeker, adaptable and drawn to variety and adventure.",
      color: "from-blue-500 to-blue-600",
      detailedDescription:
        "With a Personality number 5, you present yourself to the world as adaptable, progressive, and freedom-loving. Others see you as adventurous, versatile, and quick-thinking. You have a natural charm and curiosity that draws people to you. Your outer personality embraces change and resists restriction, making you appear dynamic and sometimes unpredictable to others.",
    },
  ],
  onSaveResults = () => console.log("Saving results"),
  onShareResults = () => console.log("Sharing results"),
  onNewCalculation = () => console.log("Starting new calculation"),
}: ResultsDisplayProps) => {
  const [selectedNumber, setSelectedNumber] = useState<NumerologyNumber | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[700px] flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 p-8 rounded-lg">
        <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-white">
          Calculating Your Numerology Profile
        </h3>
        <p className="text-gray-300 mt-2 text-center max-w-md">
          We're analyzing your name and birth date to reveal your unique
          numerological blueprint...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[700px] bg-white rounded-lg shadow-sm overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 md:p-8"
      >
        <div className="mb-8 text-center">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-slate-800 mb-2"
          >
            Numerology Results for {userName}
          </motion.h2>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-600"
          >
            Birth Date: {birthDate}
          </motion.p>
          <div className="mt-2">
            <span className="inline-block px-4 py-1 bg-lavender-100 text-purple-800 rounded-full text-sm font-medium">
              Personal Numerology Profile
            </span>
          </div>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-slate-100">
            <TabsTrigger
              value="overview"
              className="text-slate-800 data-[state=active]:bg-white"
            >
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="visualization"
              className="text-slate-800 data-[state=active]:bg-white"
            >
              Visualization
            </TabsTrigger>
            <TabsTrigger
              value="grid"
              className="text-slate-800 data-[state=active]:bg-white"
            >
              Grid Calculation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ResultsOverview
              numbers={numbers}
              userName={userName}
              birthDate={birthDate}
            />
          </TabsContent>

          <TabsContent value="visualization" className="space-y-8">
            <div className="bg-white rounded-lg">
              <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
                <div className="w-full lg:w-1/2 p-6 border rounded-lg">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    Numerology Chart
                  </h3>
                  <div className="flex justify-center">
                    <RadialChart
                      segments={numbers.map((n) => ({
                        id: n.name.toLowerCase().replace(" ", "-"),
                        value: n.value,
                        label: n.name,
                        color:
                          n.name === "Life Path"
                            ? "#6366F1"
                            : n.name === "Expression"
                              ? "#EC4899"
                              : n.name === "Soul Urge"
                                ? "#A855F7"
                                : "#3B82F6",
                        description: n.description,
                      }))}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2 p-6 border rounded-lg">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    Symbolic Representation
                  </h3>
                  <div className="flex justify-center">
                    <SymbolicImagery
                      lifePathNumber={
                        numbers.find((n) => n.name === "Life Path")?.value || 7
                      }
                      expressionNumber={
                        numbers.find((n) => n.name === "Expression")?.value || 3
                      }
                      soulUrgeNumber={
                        numbers.find((n) => n.name === "Soul Urge")?.value || 9
                      }
                      personalityNumber={
                        numbers.find((n) => n.name === "Personality")?.value ||
                        5
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 border rounded-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Numerological Harmony
                </h3>
                <p className="text-slate-700">
                  The visualization above shows how your core numbers interact
                  and influence each other. The size of each segment represents
                  the relative influence of that number in your overall profile.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grid" className="space-y-6">
            <GridCalculation
              firstName={userName.split(" ")[0]}
              middleName={
                userName.split(" ").length > 2 ? userName.split(" ")[1] : ""
              }
              lastName={userName
                .split(" ")
                .slice(userName.split(" ").length > 2 ? 2 : 1)
                .join(" ")}
              birthDate={
                formattedDate ||
                birthDate
                  .replace(/[a-zA-Z]/g, "")
                  .trim()
                  .replace(/\s+/g, "/")
                  .replace(/,/g, "")
              }
            />
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex justify-center">
          <ActionButtons
            onSave={onSaveResults}
            onShare={onShareResults}
            onNewCalculation={onNewCalculation}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsDisplay;
