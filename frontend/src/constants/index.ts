export const sidebarLinks = [
  {
    imgURL: "/assets/icons/sidebar/home-icon.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/sidebar/smart-meter-icon.svg",
    route: "/house/my-smart-meter",
    label: "My Smart Meter",
  },
  {
    imgURL: "/assets/icons/sidebar/billing-icon.svg",
    route: "/house/billing",
    label: "Billing",
  },
];

// NOTE: BILLING
export const UNIT_PRICE = 2.9;
export const TAX = 0.07;
export const MAX_MONTHY_USAGE = 1000;

// NOTE: CRYPTOGRAPHY PROCESS FOR HASHING WITH BCRYPT PEPPER
export const SALT_ROUNDS = 10;
