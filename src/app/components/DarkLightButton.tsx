"use client";
import { LuMoonStar } from "react-icons/lu";
import { CiLight } from "react-icons/ci";
import { useTheme } from "next-themes";

type Props = {};

const DarkLightButton = ({}: Props) => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (resolvedTheme === 'light') setTheme("dark");
    if (resolvedTheme === 'dark') setTheme("light");
  };

  return (
    <div className="flex gap-2">
      <p className="text-sm mt-1"> {resolvedTheme === 'light' ? "DARK" : "LIGHT"}</p>
      <button className="text-2xl" onClick={toggleTheme}>
        {resolvedTheme === "light" ? <LuMoonStar /> : <CiLight />}
      </button>
    </div>
  );
};

export default DarkLightButton;
