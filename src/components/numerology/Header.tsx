import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Menu } from "lucide-react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
  onHomeClick?: () => void;
}

const Header = ({
  title = "Numerology Calculator",
  subtitle = "Discover your personal numbers",
  onMenuClick = () => console.log("Menu clicked"),
  onHomeClick = () => console.log("Home clicked"),
}: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md flex items-center justify-between px-4 md:px-8"
    >
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onHomeClick}
          className="mr-2 text-white hover:bg-white/10"
        >
          <Home className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
          <p className="text-xs md:text-sm text-indigo-100">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-white hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
