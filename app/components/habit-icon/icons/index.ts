import { color } from "../../../theme/color"

export const icons = [
    { name: "clock", img: require("./clock.png"), color: color.palette.orange },
    { name: "toothbrush", img: require("./toothbrush.png"), color: color.palette.orange },
    { name: "shower", img: require("./shower.png"), color: color.palette.orange },
    { name: "meditation", img: require("./meditation.png"), color: color.palette.orange },
    { name: "pill",img: require("./pill.png"), color: color.palette.orange },
    { name: "moon", img: require("./moon.png"), color: color.palette.orange },
  ]

export type HabitIconType = typeof icons[0];
  