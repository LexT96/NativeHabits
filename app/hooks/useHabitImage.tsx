import { HabitIconType, icons } from "../components/habit-icon/icons";
import { Habit } from "../models";

const useHabitImage = (habit: Habit) => {
        if (!habit) return;
        const icon = icons.find((icon: HabitIconType) => icon.name === habit.icon);
        if (!icon) return;
        return icon.img;
}

export default useHabitImage;