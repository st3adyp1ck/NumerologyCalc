import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface NumerologyNumber {
  name: string;
  value: number;
  description: string;
  color: string;
}

interface ResultsOverviewProps {
  numbers?: NumerologyNumber[];
  userName?: string;
  birthDate?: string;
  isLoading?: boolean;
}

const ResultsOverview = ({
  numbers = [
    {
      name: "Life Path",
      value: 7,
      description:
        "The seeker and analyzer, focused on spiritual growth and understanding.",
      color: "bg-indigo-500",
    },
    {
      name: "Expression",
      value: 3,
      description:
        "The creative communicator, expressing ideas with enthusiasm and joy.",
      color: "bg-pink-500",
    },
    {
      name: "Soul Urge",
      value: 9,
      description:
        "The humanitarian, driven by compassion and desire to make a difference.",
      color: "bg-purple-500",
    },
    {
      name: "Personality",
      value: 5,
      description:
        "The freedom-seeker, adaptable and drawn to variety and adventure.",
      color: "bg-blue-500",
    },
  ],
  userName = "Jane Doe",
  birthDate = "January 15, 1985",
  isLoading = false,
}: ResultsOverviewProps) => {
  // Mock components to replace the imported ones
  const NumberCard = ({
    name,
    value,
    description,
    color,
  }: {
    name: string;
    value: number;
    description: string;
    color: string;
  }) => (
    <div className={`rounded-lg p-4 ${color} text-white h-full`}>
      <div className="flex justify-between items-start mb-2 text-[#000000]">
        <h3 className="text-lg font-bold">{name}</h3>
        <span className="text-3xl font-bold text-[#000000]">{value}</span>
      </div>
      <p className="text-sm opacity-90 border-[#3873c1] text-[#000000]">
        {description}
      </p>
    </div>
  );

  const RadialChart = ({ numbers }: { numbers: NumerologyNumber[] }) => (
    <div className="w-64 h-64 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800">Numerology</div>
        <div className="text-sm text-gray-600">Interactive Chart</div>
      </div>
    </div>
  );

  const SymbolicImagery = ({ numbers }: { numbers: NumerologyNumber[] }) => (
    <div className="w-64 h-64 flex flex-wrap gap-2 justify-center items-center">
      {numbers.map((number, index) => (
        <div
          key={index}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${number.color}`}
        >
          <span className="font-bold text-[#000000]">{number.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-gray-50 p-6 rounded-lg shadow-sm"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Numerology Results for {userName}
        </h2>
        <p className="text-gray-600">Birth Date: {birthDate}</p>
        <Badge
          variant="outline"
          className="mt-2 bg-gradient-to-r from-violet-200 to-pink-200"
        >
          Personal Numerology Profile
        </Badge>
      </div>
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6 text-[#000000]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {numbers.map((number, index) => (
              <motion.div
                key={number.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <NumberCard
                  name={number.name}
                  value={number.value}
                  description={number.description}
                  color={number.color}
                />
              </motion.div>
            ))}
          </div>

          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4">
              Your Numerology Profile
            </h3>
            <p className="text-gray-700 mb-4">
              Your numerology profile reveals a unique combination of energies
              that influence your life path and personal characteristics. The
              numbers above represent core aspects of your personality and life
              journey.
            </p>
            <p className="text-gray-700">
              Explore each number card for more detailed information about how
              these energies manifest in your life.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            <Card className="p-6 bg-white w-full lg:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Numerology Chart</h3>
              <div className="flex justify-center">
                <RadialChart numbers={numbers} />
              </div>
            </Card>

            <Card className="p-6 bg-white w-full lg:w-1/2">
              <h3 className="text-xl font-semibold mb-4">
                Symbolic Representation
              </h3>
              <div className="flex justify-center">
                <SymbolicImagery numbers={numbers} />
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4">
              Numerological Harmony
            </h3>
            <p className="text-gray-700">
              The visualization above shows how your core numbers interact and
              influence each other. The size of each segment represents the
              relative influence of that number in your overall profile.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ResultsOverview;
