import React from "react";
import { Card } from "@/components/ui/card";

interface GridCalculationProps {
  userName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  birthDate?: string;
}

const GridCalculation = ({
  userName = "LAURA JULIA COSTAS PEREZ",
  firstName = "LAURA",
  middleName = "JULIA",
  lastName = "COSTAS PEREZ",
  birthDate = "02/09/1991",
}: GridCalculationProps) => {
  // Split name into individual letters and assign numbers
  const letterValues: Record<string, number> = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };

  // Function to calculate numerology value for a name
  const calculateNameValue = (name: string) => {
    const letters = name.toUpperCase().split("");
    const numbers = letters.map((letter) => letterValues[letter] || 0);
    return {
      letters,
      numbers,
    };
  };

  // Calculate for each name part
  const firstNameCalc = calculateNameValue(firstName);
  const middleNameCalc = middleName ? calculateNameValue(middleName) : null;
  const lastNameCalc = calculateNameValue(lastName);

  // Parse birth date
  let month, day, year;
  try {
    // Try to parse the date string
    const dateParts = birthDate.split("/");
    if (dateParts.length >= 3) {
      month = parseInt(dateParts[0]);
      day = parseInt(dateParts[1]);
      year = parseInt(dateParts[2]);
    } else {
      // Fallback to current date if parsing fails
      const today = new Date();
      month = today.getMonth() + 1;
      day = today.getDate();
      year = today.getFullYear();
    }
  } catch (error) {
    // Fallback to current date if parsing fails
    const today = new Date();
    month = today.getMonth() + 1;
    day = today.getDate();
    year = today.getFullYear();
  }

  // Calculate life path number (simplified for demo)
  const calculateLifePath = () => {
    const monthSum = month;
    const daySum = day;
    const yearSum = year
      .toString()
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
    const total = monthSum + daySum + yearSum;
    return total > 9
      ? total
          .toString()
          .split("")
          .map(Number)
          .reduce((a, b) => a + b, 0)
      : total;
  };

  // Calculate expression number (simplified for demo)
  const calculateExpression = () => {
    const allNameNumbers = [
      ...firstNameCalc.numbers,
      ...(middleNameCalc?.numbers || []),
      ...lastNameCalc.numbers,
    ];
    const total = allNameNumbers.reduce((a, b) => a + b, 0);
    return total > 9
      ? total
          .toString()
          .split("")
          .map(Number)
          .reduce((a, b) => a + b, 0)
      : total;
  };

  // Calculate soul urge number (simplified for demo)
  const calculateSoulUrge = () => {
    const vowels = ["A", "E", "I", "O", "U"];
    const allLetters = [
      ...firstNameCalc.letters,
      ...(middleNameCalc?.letters || []),
      ...lastNameCalc.letters,
    ];
    const vowelNumbers = allLetters
      .filter((letter) => vowels.includes(letter))
      .map((letter) => letterValues[letter] || 0);
    const total = vowelNumbers.reduce((a, b) => a + b, 0);
    return total > 9
      ? total
          .toString()
          .split("")
          .map(Number)
          .reduce((a, b) => a + b, 0)
      : total;
  };

  // Calculate destiny number (simplified for demo)
  const calculateDestiny = () => {
    const consonants = [
      "B",
      "C",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const allLetters = [
      ...firstNameCalc.letters,
      ...(middleNameCalc?.letters || []),
      ...lastNameCalc.letters,
    ];
    const consonantNumbers = allLetters
      .filter((letter) => consonants.includes(letter))
      .map((letter) => letterValues[letter] || 0);
    const total = consonantNumbers.reduce((a, b) => a + b, 0);
    return total > 9
      ? total
          .toString()
          .split("")
          .map(Number)
          .reduce((a, b) => a + b, 0)
      : total;
  };

  // Calculate personal year (simplified for demo)
  const calculatePersonalYear = () => {
    const currentYear = new Date().getFullYear();
    const monthDay = month + day;
    const total = monthDay + currentYear;
    return total > 9
      ? total
          .toString()
          .split("")
          .map(Number)
          .reduce((a, b) => a + b, 0)
      : total;
  };

  const lifePathNumber = calculateLifePath();
  const expressionNumber = calculateExpression();
  const soulUrgeNumber = calculateSoulUrge();
  const destinyNumber = calculateDestiny();
  const personalYearNumber = calculatePersonalYear();

  return (
    <Card className="w-full p-6 bg-slate-800 border-slate-700 overflow-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="border border-slate-600 rounded-md p-4 bg-slate-700">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Numerology Grid Calculation
          </h3>

          {/* Name Grid */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-white">
              <tbody>
                <tr className="border-b border-slate-600">
                  <td className="p-2 border-r border-slate-600 font-bold">
                    Name
                  </td>
                  {firstName.split("").map((letter, i) => (
                    <td
                      key={`first-${i}`}
                      className="p-2 border-r border-slate-600 text-center"
                    >
                      {letter}
                    </td>
                  ))}
                  <td className="p-2 border-r border-slate-600 font-bold">|</td>
                  {middleName &&
                    middleName.split("").map((letter, i) => (
                      <td
                        key={`middle-${i}`}
                        className="p-2 border-r border-slate-600 text-center"
                      >
                        {letter}
                      </td>
                    ))}
                  <td className="p-2 border-r border-slate-600 font-bold">|</td>
                  {lastName.split("").map((letter, i) => (
                    <td
                      key={`last-${i}`}
                      className="p-2 border-r border-slate-600 text-center"
                    >
                      {letter}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-600 font-bold">
                    Value
                  </td>
                  {firstNameCalc.numbers.map((num, i) => (
                    <td
                      key={`first-num-${i}`}
                      className="p-2 border-r border-slate-600 text-center"
                    >
                      {num}
                    </td>
                  ))}
                  <td className="p-2 border-r border-slate-600 font-bold">|</td>
                  {middleNameCalc &&
                    middleNameCalc.numbers.map((num, i) => (
                      <td
                        key={`middle-num-${i}`}
                        className="p-2 border-r border-slate-600 text-center"
                      >
                        {num}
                      </td>
                    ))}
                  <td className="p-2 border-r border-slate-600 font-bold">|</td>
                  {lastNameCalc.numbers.map((num, i) => (
                    <td
                      key={`last-num-${i}`}
                      className="p-2 border-r border-slate-600 text-center"
                    >
                      {num}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Birth Date */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-2">
              Birth Date: {birthDate}
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-600 p-2 rounded-md">
                <p className="text-gray-300">Month</p>
                <p className="text-xl font-bold text-white">{month}</p>
              </div>
              <div className="bg-slate-600 p-2 rounded-md">
                <p className="text-gray-300">Day</p>
                <p className="text-xl font-bold text-white">{day}</p>
              </div>
              <div className="bg-slate-600 p-2 rounded-md">
                <p className="text-gray-300">Year</p>
                <p className="text-xl font-bold text-white">{year}</p>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-white">
              <thead>
                <tr className="bg-slate-600">
                  <th className="p-2 border border-slate-500 text-left">
                    Number Type
                  </th>
                  <th className="p-2 border border-slate-500 text-center">
                    Value
                  </th>
                  <th className="p-2 border border-slate-500 text-center">
                    Meaning
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-slate-500 font-medium">
                    Life Path
                  </td>
                  <td className="p-2 border border-slate-500 text-center font-bold">
                    {lifePathNumber}
                  </td>
                  <td className="p-2 border border-slate-500">
                    Your life's purpose and journey
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-500 font-medium">
                    Expression
                  </td>
                  <td className="p-2 border border-slate-500 text-center font-bold">
                    {expressionNumber}
                  </td>
                  <td className="p-2 border border-slate-500">
                    Your natural abilities and talents
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-500 font-medium">
                    Soul Urge
                  </td>
                  <td className="p-2 border border-slate-500 text-center font-bold">
                    {soulUrgeNumber}
                  </td>
                  <td className="p-2 border border-slate-500">
                    Your inner desires and motivations
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-500 font-medium">
                    Destiny
                  </td>
                  <td className="p-2 border border-slate-500 text-center font-bold">
                    {destinyNumber}
                  </td>
                  <td className="p-2 border border-slate-500">
                    Your life's direction and challenges
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-500 font-medium">
                    Personal Year
                  </td>
                  <td className="p-2 border border-slate-500 text-center font-bold">
                    {personalYearNumber}
                  </td>
                  <td className="p-2 border border-slate-500">
                    Influences for current year
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Karmic Debt Section */}
          <div className="mt-6 p-3 bg-slate-600 rounded-md">
            <h4 className="text-lg font-semibold text-white mb-2">
              Karmic Debts
            </h4>
            <p className="text-gray-300">
              {[13, 14, 16, 19].includes(lifePathNumber) ||
              [13, 14, 16, 19].includes(expressionNumber) ||
              [13, 14, 16, 19].includes(destinyNumber)
                ? "You have karmic debt numbers in your chart. These represent lessons from past lives that need to be addressed."
                : "No karmic debt numbers detected in your primary calculations."}
            </p>
          </div>

          {/* Year Forecast */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-600 rounded-md">
              <h4 className="text-md font-semibold text-white">Past Year</h4>
              <p className="text-2xl font-bold text-white">
                {personalYearNumber - 1 || 9}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-md">
              <h4 className="text-md font-semibold text-white">Current Year</h4>
              <p className="text-2xl font-bold text-white">
                {personalYearNumber}
              </p>
            </div>
            <div className="p-3 bg-slate-600 rounded-md">
              <h4 className="text-md font-semibold text-white">Next Year</h4>
              <p className="text-2xl font-bold text-white">
                {personalYearNumber === 9 ? 1 : personalYearNumber + 1}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GridCalculation;
