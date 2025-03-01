import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface NumberCardProps {
  title?: string;
  number?: number;
  interpretation?: string;
  color?: string;
  onClick?: () => void;
}

const NumberCard = ({
  title = "Life Path",
  number = 7,
  interpretation = "The seeker and the thinker. You are introspective and value solitude for deep contemplation. Your analytical mind seeks knowledge and understanding beyond the surface.",
  color = "from-purple-500 to-indigo-600",
  onClick = () => {},
}: NumberCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-[280px] h-[320px] bg-background"
    >
      <Card
        className="h-full overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={onClick}
      >
        <div className={`h-2 w-full bg-gradient-to-r ${color}`}></div>

        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <Badge
              className={`bg-gradient-to-r ${color} hover:${color} text-white font-bold text-lg px-3 py-1`}
            >
              {number}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mt-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {interpretation}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <div className="text-xs text-muted-foreground italic">
            Click for detailed meaning
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default NumberCard;
