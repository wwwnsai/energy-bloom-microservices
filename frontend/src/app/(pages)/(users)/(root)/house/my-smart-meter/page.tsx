import RightSidebar from "@/components/navigations/right-sidebar";
import ColorIndicator from "@/components/shared/box/color-indicator";
import HeaderBox from "@/components/shared/box/header-box";
import DoughnutChart from "@/components/shared/charts/doughnut-chart";
import { MAX_MONTHY_USAGE } from "@/constants";
// import { getDevices } from "@/libs/actions/device.actions";
// import { calculateUsageAndPrice } from "@/libs/actions/electricity-usage.actions";
// import { getLoggedInUser, getUserInfo } from "@/libs/actions/user.actions";
// import { cn } from "@/src/utils/cn";
// import { formatNumber } from "@/src/utils/formats";
import dayjs from "dayjs";

const MySmartMeterPage = async () => {
  const currentDateTime = dayjs().format("MMMM D, YYYY h:mm A");
  
  const user = await getLoggedInUser();
  let loggedIn = null;
  let devices: Device[] = [];
  let totalPrice = 0;
  let totalUsage = 0;

  const remainingUsage = MAX_MONTHY_USAGE - totalUsage;

  if (user) {
    loggedIn = await getUserInfo({ user_id: user.id });
    devices = await getDevices({ user_id: user.id });
    const { usage, price } = await calculateUsageAndPrice({ user_id: user.id });
    totalPrice = price;
    totalUsage = usage;
    
    console.log("------------Total usage:", totalUsage);
  }

  const formattedCurrency = formatNumber(totalPrice, {
    style: "currency",
    currency: "THB",
  });

  const formattedKWh = formatNumber(totalUsage);

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll ">
      <div
        className="no-scrollbar flex w-full flex-1 flex-col px-5 py-7 bg-dark-background rounded-3xl m-4
        sm:px-8 
        lg:py-8
        xl:max-h-screen xl:overflow-y-scroll"
      >
        <header>
          <HeaderBox title={`${currentDateTime}`} />
        </header>
        <div className="mt-10 relative flex flex-row justify-center items-end h-72 ">
          <DoughnutChart
            totalUsage={totalUsage}
            remainingUsage={remainingUsage}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex justify-center items-center ">
            <p className="text-[38px] font-normal text-white">
              {formattedCurrency}
            </p>
          </div>
          <div className="text-center flex flex-col justify-center items-center glassmorphism px-10 py-6 rounded-[3rem]">
            <p
              className={cn("text-[18px] lg:text-[22px] font-norml", {
                "text-red-500": totalUsage >= MAX_MONTHY_USAGE,
                "text-green-500": totalUsage < MAX_MONTHY_USAGE,
                "text-white": totalUsage === 0.0,
              })}
            >
              Used so far this month: {formattedKWh} kWh
            </p>
            <ColorIndicator totalUsage={totalUsage} />
          </div>
        </div>
      </div>
      <RightSidebar user={loggedIn} devices={devices} />
    </section>
  );
};

export default MySmartMeterPage;
