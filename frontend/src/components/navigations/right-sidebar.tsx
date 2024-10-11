import Image from "next/image";
import { HoverEffectEdit } from "../shared/cards/card-edit";
import AddDeviceDialog from "../shared/dialogs/add-device-dialog";
import { User } from "./../../types/user";
import { Device } from "./../../types/device";

interface RightSidebarProps {
  user: User;
  devices: Device[];
}

const RightSidebar = ({ user, devices }: RightSidebarProps) => {
  return (
    <aside className="no-scrollbar hidden max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll glassmorphism rounded-[3.25rem] m-4 shadow-lg">
      <section className="flex flex-col pb-8">
        {/* BACKGROUND IMAGE */}
        <div className="h-[160px] w-full bg-accent bg-cover bg-no-repeat">
          <Image
            src="/assets/images/auth/background-image.jpeg"
            alt="Auth image"
            width={300}
            height={300}
            className="object-cover w-full h-[160px]"
          />
        </div>
        {/* PROFILE */}
        <div className="relative flex px-6 max-xl:justify-center">
          <div className="flex-center absolute -top-12 size-24 rounded-full bg-white p-1.5 shadow-profile">
            <Image
              src={user?.avatar_url}
              className="rounded-full"
              width={100}
              height={100}
              alt="user avatar"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col pt-[4.5rem]">
            <h1 className="text-[24px] font-semibold text-gray-900">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-[16px] font-normal text-gray-600">
              {user.email}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-8 px-6 py-8">
        <div className="flex w-full justify-between">
          <h2 className="text-[18px] font-semibold text-gray-900 mt-1">
            My Devices
          </h2>
          <AddDeviceDialog userId={user.id} />
        </div>
        <HoverEffectEdit items={devices} useGrid={false} />
      </section>
    </aside>
  );
};

export default RightSidebar;
