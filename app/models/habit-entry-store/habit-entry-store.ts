import { Instance, SnapshotOut, types } from "mobx-state-tree"
import moment from "moment"
import { HabitEntry, HabitEntryModel } from "../habit-entry/habit-entry"

/**
 * Model description here for TypeScript hints.
 */
export const HabitEntryStoreModel = types
  .model("HabitEntryStore")
  .props({
    habitEntries: types.optional(types.array(HabitEntryModel), [])
  })
  .views((self) => {
    const getForToday = () => {
      return self.habitEntries.filter((entry) => entry.date === moment().format("DD-MM-YYYY"))
    }
    const getForHabit = (id: number) => {
      return self.habitEntries.filter((entry) => entry.habit.id === id)
    }
    return { getForToday, getForHabit }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => {
    const addHabitEntry = (habitEntry: HabitEntry) => {
      self.habitEntries.push(habitEntry);
    }
    
    return { addHabitEntry }
  })
type HabitEntryStoreType = Instance<typeof HabitEntryStoreModel>
export interface HabitEntryStore extends HabitEntryStoreType {}
type HabitEntryStoreSnapshotType = SnapshotOut<typeof HabitEntryStoreModel>
export interface HabitEntryStoreSnapshot extends HabitEntryStoreSnapshotType {}
export const createHabitEntryStoreDefaultModel = () => types.optional(HabitEntryStoreModel, {})
