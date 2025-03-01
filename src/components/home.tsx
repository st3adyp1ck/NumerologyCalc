import React, { useState } from "react";
import { motion } from "framer-motion";

import Header from "./numerology/Header";
import InputForm from "./numerology/InputForm";
import ResultsDisplay from "./numerology/ResultsDisplay";
import LoadingAnimation from "./numerology/LoadingAnimation";

interface FormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: string;
}

const Home = () => {
  const [calculationState, setCalculationState] = useState<
    "input" | "calculating" | "results"
  >("input");
  const [userData, setUserData] = useState<{
    name: string;
    birthDate: string;
    formattedDate?: string;
  } | null>(null);

  // Mock function to simulate calculation process
  const calculateNumerology = (data: FormData) => {
    // Create a date object from the input string and adjust for timezone issues
    const dateObj = new Date(data.birthDate);
    // Use UTC methods to prevent timezone issues
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth();
    const day = dateObj.getUTCDate();

    // Create a new date object with the correct values
    const correctedDate = new Date(year, month, day);

    // Format date as MM/DD/YYYY for grid calculation
    const formattedDate = `${month + 1}/${day}/${year}`;

    setUserData({
      name: `${data.firstName} ${data.middleName ? data.middleName + " " : ""}${data.lastName}`,
      birthDate: correctedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      formattedDate: formattedDate,
    });

    setCalculationState("calculating");

    // Simulate calculation time
    setTimeout(() => {
      setCalculationState("results");
    }, 3000);
  };

  const handleNewCalculation = () => {
    setCalculationState("input");
    setUserData(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Discover Your Numerology Profile
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Enter your name and birth date to reveal the hidden numerical
            patterns that influence your life path, personality, and potential.
          </p>
        </motion.div>

        <div className="flex justify-center mb-16">
          {calculationState === "input" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InputForm onSubmit={calculateNumerology} />
            </motion.div>
          )}

          {calculationState === "calculating" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md"
            >
              <LoadingAnimation />
            </motion.div>
          )}
        </div>

        {calculationState === "results" && userData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <ResultsDisplay
              userName={userData.name}
              birthDate={userData.birthDate}
              formattedDate={userData.formattedDate}
              onNewCalculation={handleNewCalculation}
            />
          </motion.div>
        )}
      </main>

      <footer className="py-8 text-center text-gray-300 text-sm">
        <p>
          © {new Date().getFullYear()} Numerology Calculator | All rights
          reserved
        </p>
      </footer>
    </div>
  );
};

export default Home;
