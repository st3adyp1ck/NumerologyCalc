import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Download, Share2, RefreshCw } from "lucide-react";

interface ActionButtonsProps {
  onSave?: () => void;
  onShare?: () => void;
  onNewCalculation?: () => void;
  isLoading?: boolean;
}

const ActionButtons = ({
  onSave = () => console.log("Save results"),
  onShare = () => console.log("Share results"),
  onNewCalculation = () => console.log("Start new calculation"),
  isLoading = false,
}: ActionButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 rounded-lg w-full max-w-[300px]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onSave}
              disabled={isLoading}
              className="bg-white hover:bg-gray-100 border-gray-200"
            >
              <Download className="h-5 w-5 text-gray-700" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save your results</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onShare}
              disabled={isLoading}
              className="bg-white hover:bg-gray-100 border-gray-200"
            >
              <Share2 className="h-5 w-5 text-gray-700" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share your results</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button
        onClick={onNewCalculation}
        disabled={isLoading}
        className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        New Calculation
      </Button>
    </div>
  );
};

export default ActionButtons;
