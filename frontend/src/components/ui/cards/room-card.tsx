import { useState } from "react";
import { Switch } from "@headlessui/react";
import DeviceTab from "./device-tab";
import AirConditionerTab from "./air-conditioner-tab";
import { IconTemperature, IconSnowflake, IconWind } from "@tabler/icons-react";
import AirConditionerControl from "../airconditioner/air-conditioner-control";
import { motion } from "framer-motion";

interface RoomCardProps {
  title: string;
  description: string;
  backgroundImage: string;
  isLightOn: boolean; // ON, OFF
  currentTemperature: number; // Current room temperature
  currentMode: string; // Cool, Heat, Fan, Dry
  currentFanSpeed: string; // Low, Medium, High
}

const RoomCard = ({
  title,
  description,
  backgroundImage,
  isLightOn,
  currentTemperature,
  currentMode,
  currentFanSpeed,
}: RoomCardProps) => {
  const [lightOn, setLightOn] = useState(isLightOn);

  return (
    <div className="relative h-full w-full rounded-3xl bg-gray-100 p-5 flex flex-col justify-between">
      {/* Background Image */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: lightOn ? "brightness(1)" : "brightness(0.5)",
          transition: "filter 0.5s ease-in-out",
        }}
      />

      {/* Light Switch */}
      <motion.div
        className="absolute top-5 right-5 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Switch
          checked={lightOn}
          onChange={setLightOn}
          className={`${
            lightOn ? "bg-green-500" : "bg-gray-700"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
          <motion.span
            className={`${
              lightOn ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            layout
          />
        </Switch>
      </motion.div>

      {/* TITLE & DESCRIPTION */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.p className="text-lg font-semibold text-white" layout>
          {title}
        </motion.p>
        <motion.p className="text-sm font-normal text-neutral-200" layout>
          {description}
        </motion.p>
      </motion.div>

      {/* AIR CONDITIONER CONTROLS */}
      <AirConditionerControl
        currentRoom={title}
        currentTemperature={currentTemperature}
        currentMode={currentMode}
        currentFanSpeed={currentFanSpeed}
      />
    </div>
  );
};

export default RoomCard;
