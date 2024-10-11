import { MAX_MONTHY_USAGE } from "@/constants";

interface ColorIndicatorProps {
  totalUsage: number; // Specify that totalUsage is a number
}

const ColorIndicator: React.FC<ColorIndicatorProps> = ({ totalUsage }) => {
  let colorClass = "text-white";
  let displayText = "No Usage";

  if (totalUsage >= MAX_MONTHY_USAGE) {
    colorClass = "text-red-500";
    displayText = "Exceeded Maximum Usage";
  } else if (totalUsage > 0) {
    colorClass = "text-green-500";
    displayText = "Usage Within Limits";
  }

  return (
    <div className={`flex items-center gap-2`}>
      <div className={`w-4 h-4 rounded-full ${colorClass} bg-current`} />
      <span className={`font-medium ${colorClass}`}>{displayText}</span>
    </div>
  );
};

export default ColorIndicator;
