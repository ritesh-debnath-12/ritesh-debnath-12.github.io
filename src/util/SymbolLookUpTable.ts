import {
  FaJava,
  FaBookOpen,
  FaLanguage,
  FaRocket,
  FaSkull,
  FaGlobeAmericas,
} from "react-icons/fa";

import {
  GiSwordsPower,
  GiJapan,
  GiEarthAfricaEurope,
  GiStiletto,
} from "react-icons/gi";

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiDocker,
  SiArchlinux,
  SiExcalidraw,
  SiMysql,
  SiSpringboot,
  SiSteam,
} from "react-icons/si";

import { IoGameController } from "react-icons/io5";
/**
 * A lookup table for icon components.
 * Append new icon components here.
 */
const symbolLookUpTable: { [key: string]: React.ComponentType } = {
  FaBookOpen: FaBookOpen,
  FaLanguage: FaLanguage,
  FaRocket: FaRocket,
  FaSkull: FaSkull,
  FaGlobeAmericas: FaGlobeAmericas,
  GiSwordsPower: GiSwordsPower,
  GiJapan: GiJapan,
  GiEarthAfricaEurope: GiEarthAfricaEurope,
  SiSteam: SiSteam,
  IoGameController: IoGameController,
  GiStiletto: GiStiletto,
  FaJava: FaJava,
  SiJavascript: SiJavascript,
  SiTypescript: SiTypescript,
  SiReact: SiReact,
  SiNodedotjs: SiNodedotjs,
  SiPython: SiPython,
  SiGit: SiGit,
  SiDocker: SiDocker,
  SiArchlinux: SiArchlinux,
  SiExcalidraw: SiExcalidraw,
  SiMysql: SiMysql,
  SiSpringboot: SiSpringboot,
};

export default symbolLookUpTable;