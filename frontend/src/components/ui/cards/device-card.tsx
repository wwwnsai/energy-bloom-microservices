import React from "react";
import { BackgroundGradientAnimation } from "../backgrounds/background-gradient-animation";
import DeviceTab from "./device-tab";
import { IconAirConditioning, IconBulb } from "@tabler/icons-react";
import AddDeviceSheet from "../add-device/add-device-sheet";


interface DeviceCardProps {
  AirConditionersCount: number;
  LightsCount: number;
}

const DeviceCard = ({ AirConditionersCount, LightsCount }: DeviceCardProps) => {
  return (
    <div className="h-full w-[28%] rounded-3xl bg-gray-100">
      <BackgroundGradientAnimation className="p-5 flex flex-col justify-between h-full">
        <div className="flex flex-col w-full">
          {/* TITLE */}
          <p className="text-lg font-semibold text-black mb-7">Devices</p>
          {/* DEVICES */}
          <div className="space-y-3">
            <DeviceTab
              title="Air Conditioners"
              count={AirConditionersCount}
              icon={
                <IconAirConditioning className="text-neutral-700 h-6 w-6" />
              }
            />
            <DeviceTab
              title="Lights & Bulbs"
              count={LightsCount}
              icon={<IconBulb className="text-neutral-700 h-6 w-6" />}
            />
          </div>
        </div>

        {/* DEVICE SHEET TRIGGER */}
        <AddDeviceSheet />
      </BackgroundGradientAnimation>
    </div>
  );
};

export default DeviceCard;
