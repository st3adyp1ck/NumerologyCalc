import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChartSegment {
  id: string;
  value: number;
  label: string;
  color: string;
  description: string;
}

interface RadialChartProps {
  segments?: ChartSegment[];
  size?: number;
  innerRadius?: number;
  animationDuration?: number;
  onSegmentClick?: (segment: ChartSegment) => void;
}

const defaultSegments: ChartSegment[] = [
  {
    id: "lifePath",
    value: 7,
    label: "Life Path",
    color: "#FF6B6B",
    description: "Represents your life purpose and the path you will take",
  },
  {
    id: "expression",
    value: 4,
    label: "Expression",
    color: "#4ECDC4",
    description: "Reveals your natural abilities and talents",
  },
  {
    id: "soulUrge",
    value: 9,
    label: "Soul Urge",
    color: "#FFD166",
    description: "Indicates your inner desires and motivations",
  },
  {
    id: "personality",
    value: 3,
    label: "Personality",
    color: "#6A0572",
    description: "Shows how others perceive you",
  },
];

const RadialChart = ({
  segments = defaultSegments,
  size = 500,
  innerRadius = 0.3,
  animationDuration = 0.8,
  onSegmentClick = () => {},
}: RadialChartProps) => {
  const [hoveredSegment, setHoveredSegment] = useState<ChartSegment | null>(
    null,
  );
  const [isAnimated, setIsAnimated] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2;
  const innerRadiusValue = radius * innerRadius;

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const calculateCoordinates = (
    startAngle: number,
    endAngle: number,
    radius: number,
  ) => {
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = centerX + innerRadiusValue * Math.cos(startRad);
    const y1 = centerY + innerRadiusValue * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(startRad);
    const y2 = centerY + radius * Math.sin(startRad);
    const x3 = centerX + radius * Math.cos(endRad);
    const y3 = centerY + radius * Math.sin(endRad);
    const x4 = centerX + innerRadiusValue * Math.cos(endRad);
    const y4 = centerY + innerRadiusValue * Math.sin(endRad);

    return {
      path: `M ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadiusValue} ${innerRadiusValue} 0 ${endAngle - startAngle > 180 ? 1 : 0} 0 ${x1} ${y1} Z`,
      midAngle: (startAngle + endAngle) / 2,
    };
  };

  const renderSegments = () => {
    let currentAngle = 0;

    return segments.map((segment, index) => {
      const segmentValue = segment.value / totalValue;
      const startAngle = currentAngle;
      const endAngle = currentAngle + segmentValue * 360;
      const { path, midAngle } = calculateCoordinates(
        startAngle,
        endAngle,
        radius,
      );

      // Calculate label position
      const labelRadius = (radius + innerRadiusValue) / 2;
      const labelRad = (midAngle - 90) * (Math.PI / 180);
      const labelX = centerX + labelRadius * Math.cos(labelRad);
      const labelY = centerY + labelRadius * Math.sin(labelRad);

      currentAngle = endAngle;

      return (
        <TooltipProvider key={segment.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <g>
                <motion.path
                  d={path}
                  fill={segment.color}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: hoveredSegment?.id === segment.id ? 1.05 : 1,
                    transition: {
                      duration: animationDuration,
                      delay: index * 0.1,
                    },
                  }}
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={() => setHoveredSegment(segment)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  onClick={() => onSegmentClick(segment)}
                  className="cursor-pointer"
                />
                <motion.text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: animationDuration,
                      delay: index * 0.1 + 0.3,
                    },
                  }}
                >
                  {segment.value}
                </motion.text>
              </g>
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2">
                <p className="font-bold">
                  {segment.label}: {segment.value}
                </p>
                <p className="text-sm">{segment.description}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    });
  };

  const renderLegend = () => {
    return (
      <div className="flex flex-wrap justify-center mt-4 gap-4">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            onMouseEnter={() => setHoveredSegment(segment)}
            onMouseLeave={() => setHoveredSegment(null)}
            onClick={() => onSegmentClick(segment)}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-sm font-medium">
              {segment.label}: {segment.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="flex flex-col items-center bg-gray-50 p-6 rounded-lg"
      ref={chartRef}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <h3 className="text-xl font-bold text-center">Numerology Profile</h3>
        <p className="text-sm text-gray-500 text-center">
          Interactive visualization of your numerology values
        </p>
      </motion.div>

      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Center circle */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={innerRadiusValue}
          fill="#f8f9fa"
          stroke="#e9ecef"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: animationDuration }}
        />

        {/* Segments */}
        {renderSegments()}

        {/* Center text */}
        <motion.text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#343a40"
          fontSize="16"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: animationDuration,
            delay: segments.length * 0.1 + 0.5,
          }}
        >
          {hoveredSegment ? hoveredSegment.label : "Your Numbers"}
        </motion.text>
      </svg>

      {renderLegend()}
    </div>
  );
};

export default RadialChart;
