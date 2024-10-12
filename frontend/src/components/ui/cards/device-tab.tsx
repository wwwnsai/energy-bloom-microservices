import { IconChevronRight } from "@tabler/icons-react";

interface DeviceTabProps {
  title: string;
  count: number;
  icon?: React.JSX.Element | React.ReactNode;
}

const DeviceTab = ({ title, count, icon }: DeviceTabProps) => {
  return (
    <div className="relative z-10 flex justify-between items-center gap-4 p-2 w-full rounded-full transition-all duration-500 group hover:bg-white">
      <div className="flex justify-center items-center bg-white rounded-full w-14 h-14 transition-colors duration-500 group-hover:bg-neutral-200">
        {icon && icon}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-black">{title}</p>
        <p className="text-sm font-normal text-neutral-500">
          {count} {count > 1 ? "devices" : "device"}
        </p>
      </div>
      <IconChevronRight className="text-neutral-700 h-4 w-4 ml-auto" />
    </div>
  );
};

export default DeviceTab;
