import Image from "next/image";

interface HeaderBoxProps {
  type?: "greeting" | "title";
  title: string;
  user?: string;
  subtext?: string;
  iconUrl?: string;
}

const HeaderBox = ({ type, title, user, subtext, iconUrl }: HeaderBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[32px] lg:text-[30px] font-semibold text-accent">
        {title}
        {type === "greeting" && (
          <span className="text-black">,&nbsp;{user}</span>
        )}
      </h1>
      <div className="flex flex-row gap-2 items-center">
        {iconUrl && (
          <div className="bg-tertiary rounded-full w-8 h-8 flex items-center justify-center">
            <Image
              src={iconUrl}
              alt={`${iconUrl}`}
              width={50}
              height={2}
              className="size-5"
            />
          </div>
        )}
        {subtext && (
          <p className="text-[14px] lg:text-[16px] font-normal text-primary">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeaderBox;
