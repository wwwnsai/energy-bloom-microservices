import { useState } from "react";
import { Switch } from "@headlessui/react";
import DeviceTab from "./device-tab";
import AirConditionerTab from "./air-conditioner-tab";
import { IconTemperature, IconSnowflake, IconWind } from "@tabler/icons-react";
import AirConditionerControl from "../airconditioner/air-conditioner-control";

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
        }}
      />

      {/* Light Switch */}
      <div className="absolute top-5 right-5 z-20">
        <Switch
          checked={lightOn}
          onChange={setLightOn}
          className={`${
            lightOn ? "bg-green-500" : "bg-gray-700"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              lightOn ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

      {/* TITLE & DESCRIPTION */}
      <div className="relative z-10">
        <p className="text-lg font-semibold text-white">{title}</p>
        <p className="text-sm font-normal text-neutral-200">{description}</p>
      </div>

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
