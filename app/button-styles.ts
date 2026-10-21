const base =
  "inline-flex cursor-pointer items-center rounded-md font-medium " +
  "transition-all duration-150 active:scale-[0.97]";

const regular = " gap-2 px-4 py-2 text-sm";
const large = " gap-2.5 px-6 py-3 text-base";

const darkSkin =
  " text-white bg-gradient-to-b from-[#4a4a48] via-[#262624] to-[#161614] " +
  "shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25),inset_0_-2px_6px_rgba(0,0,0,0.5),0_0_18px_rgba(0,0,0,0.18),0_10px_22px_-8px_rgba(0,0,0,0.55)] " +
  "hover:brightness-110 active:brightness-95";

const lightSkin =
  " text-[#21201c] bg-gradient-to-b from-white via-[#f6f4f0] to-[#eae7e1] " +
  "shadow-[inset_0_1.5px_0_rgba(255,255,255,0.9),inset_0_-2px_5px_rgba(0,0,0,0.08),0_0_16px_rgba(0,0,0,0.08),0_10px_22px_-10px_rgba(0,0,0,0.3)] " +
  "hover:brightness-[1.02] active:brightness-95";

export const buttonDark = base + regular + darkSkin;
export const buttonDarkLarge = base + large + darkSkin;
export const buttonLight = base + regular + lightSkin;
export const buttonLightLarge = base + large + lightSkin;

// theme-aware pair for /agency: the main action contrasts with the page in
// both schemes (black on cream, white on near-black) and the secondary action
// is its opposite. written out in full so Tailwind can see every class
const primarySkin =
  darkSkin +
  " dark:text-[#21201c] dark:from-white dark:via-[#f6f4f0] dark:to-[#eae7e1] " +
  "dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.9),inset_0_-2px_5px_rgba(0,0,0,0.08),0_0_16px_rgba(0,0,0,0.25),0_10px_22px_-10px_rgba(0,0,0,0.6)] " +
  "dark:hover:brightness-[1.02]";

const secondarySkin =
  lightSkin +
  " dark:text-white dark:from-[#4a4a48] dark:via-[#262624] dark:to-[#161614] " +
  "dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25),inset_0_-2px_6px_rgba(0,0,0,0.5),0_0_18px_rgba(0,0,0,0.18),0_10px_22px_-8px_rgba(0,0,0,0.55)] " +
  "dark:hover:brightness-110";

export const buttonPrimary = base + regular + primarySkin;
export const buttonPrimaryLarge = base + large + primarySkin;
export const buttonSecondary = base + regular + secondarySkin;
export const buttonSecondaryLarge = base + large + secondarySkin;
