import React from "react";
import DeviceTab from "./device-tab";
import { IconAirConditioning, IconBulb } from "@tabler/icons-react";

interface DeviceCardProps {
  airConditionersCount: number;
  lightsCount: number;
  selectedRoom: "Living Room" | "Bedroom" | "Home"; 
  devices: {
    "Living Room": string[];
    Bedroom: string[];
  };
  onDeleteDevice: (device: string, room: string) => void;
}

const DeviceCard = ({
  airConditionersCount,
  lightsCount,
  selectedRoom,
  devices,
  onDeleteDevice,
}: DeviceCardProps) => {
  
  // Combine devices if "Home" is selected, otherwise use the selected room's devices
  const roomDevices =
    selectedRoom === "Home"
      ? [...(devices["Living Room"] || []), ...(devices["Bedroom"] || [])]
      : devices[selectedRoom] || [];

  // Separate air conditioners and lights
  const airConditioners = roomDevices.filter((device) =>
    device.includes("Air Conditioner")
  );
  const lights = roomDevices.filter((device) => device.includes("Light"));

  return (
    <div className="h-full w-[28%] rounded-3xl bg-gray-100 p-5">
      <div className="space-y-3">
        {/* Air Conditioners Tab */}
        <DeviceTab
          title="Air Conditioners"
          count={airConditioners.length}
          devices={airConditioners}
          icon={<IconAirConditioning className="text-neutral-700 h-6 w-6" />}
          onDelete={(device) => onDeleteDevice(device, selectedRoom)}
        />

        {/* Lights & Bulbs Tab */}
        <DeviceTab
          title="Lights & Bulbs"
          count={lights.length}
          devices={lights}
          icon={<IconBulb className="text-neutral-700 h-6 w-6" />}
          onDelete={(device) => onDeleteDevice(device, selectedRoom)}
        />
      </div>
    </div>
  );
};

export default DeviceCard;
