import React from "react";
import DeviceTab from "./device-tab";
import { IconAirConditioning, IconBulb } from "@tabler/icons-react";
import AddDeviceSheet from "../add-device/add-device-sheet";
import { BackgroundGradientAnimation } from "../backgrounds/background-gradient-animation";

interface DeviceCardProps {
  airConditionersCount: number;
  lightsCount: number;
  selectedRoom: "Living Room" | "Bedroom" | "Home";
  aircons: {
    "Living Room": string[];
    Bedroom: string[];
  };
  lights: {
    "Living Room": string[];
    Bedroom: string[];
  };
  onDeleteDevice: (device: string, room: string) => void;
  disabledClick?: boolean;
}

const DeviceCard = ({
  airConditionersCount,
  lightsCount,
  selectedRoom,
  aircons,
  lights,
  onDeleteDevice,
  disabledClick,
}: DeviceCardProps) => {
  // Combine aircons if "Home" is selected, otherwise use the selected room's aircons
  const roomAircons =
    selectedRoom === "Home"
      ? [...(aircons["Living Room"] || []), ...(aircons["Bedroom"] || [])]
      : aircons[selectedRoom] || [];

  const roomLights =
    selectedRoom === "Home"
      ? [...(lights["Living Room"] || []), ...(lights["Bedroom"] || [])]
      : lights[selectedRoom] || [];

  return (
    <div className="h-full w-[28%] rounded-3xl bg-gray-100  ">
      <BackgroundGradientAnimation className="p-5 flex flex-col justify-between w-full h-full">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-black mb-6">Devices</h2>
          {/* Air Conditioners Tab */}
          <DeviceTab
            title="Air Conditioners"
            count={roomAircons.length}
            devices={roomAircons}
            icon={<IconAirConditioning className="text-neutral-700 h-6 w-6" />}
            onDelete={(device) => onDeleteDevice(device, selectedRoom)}
            disabledClick={disabledClick}
          />

          {/* Lights & Bulbs Tab */}
          <DeviceTab
            title="Lights & Bulbs"
            count={roomLights.length}
            devices={roomLights}
            icon={<IconBulb className="text-neutral-700 h-6 w-6" />}
            onDelete={(device) => onDeleteDevice(device, selectedRoom)}
            disabledClick={disabledClick}
          />
        </div>

        {/* Add Device Button */}
        {!disabledClick && <AddDeviceSheet />}
      </BackgroundGradientAnimation>
    </div>
  );
};

export default DeviceCard;
