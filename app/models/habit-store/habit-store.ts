import AsyncStorage from "@react-native-async-storage/async-storage"
import { destroy, Instance, onAction, SnapshotOut, types } from "mobx-state-tree"
import moment from "moment"
import { withEnvironment } from "../extensions/with-environment"
import { Habit, HabitModel } from "../habit/habit"
import { useStores } from "../root-store/root-store-context"

/**
 * Model description here for TypeScript hints.
 */
export const HabitStoreModel = types
  .model("HabitStore")
  .props({
    habits: types.optional(types.array(HabitModel), []),
  })
  .extend(withEnvironment)
  .views((self) => {
    const getDoneForToday = () => {
      const { habitEntryStore } = useStores()
      const todaysEntries = habitEntryStore.getForToday()
      return self.habits.filter((habit) => {
        return todaysEntries.map((entry) => entry.habit.id).includes(habit.id)
      })
    }
    const getOutstandingForToday = () => {
      const { habitEntryStore } = useStores()
      const todaysEntries = habitEntryStore.getForToday()
      return self.habits.filter((habit) => {
        return !todaysEntries.map((entry) => entry.habit.id).includes(habit.id)
      })
    }
    return { getDoneForToday, getOutstandingForToday }
  })
  .actions((self) => {
    const addHabit = async (habit: Habit) => {
      self.habits.push(habit)
      try {
        await AsyncStorage.setItem('habits', JSON.stringify(self.habits));
      }
      catch (err) {
        console.log(err);
      }
    }
    const removeHabit = async (id: number) => {
      destroy(self.habits.find((h) => h.id === id))
      try {
        await AsyncStorage.setItem('habits', JSON.stringify(self.habits));
      }
      catch (err) {
        console.log(err);
      }
    } 
    const setHabits = async (id:number) => {
      try {
        const habits = await AsyncStorage.getItem("habits")
        if (habits) self.habits = JSON.parse(habits)
      } catch (err) {
        console.log(err)
      }
    }

    return { addHabit, removeHabit, setHabits }
  })

type HabitStoreType = Instance<typeof HabitStoreModel>
export interface HabitStore extends HabitStoreType {}
type HabitStoreSnapshotType = SnapshotOut<typeof HabitStoreModel>
export interface HabitStoreSnapshot extends HabitStoreSnapshotType {}
export const createHabitStoreDefaultModel = () => types.optional(HabitStoreModel, {})
