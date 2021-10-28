import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { HabitEntryModel } from "../habit-entry/habit-entry"

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
      return self.habitEntries.filter((entry) => entry.date === new Date())
    }
    return { getForToday }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type HabitEntryStoreType = Instance<typeof HabitEntryStoreModel>
export interface HabitEntryStore extends HabitEntryStoreType {}
type HabitEntryStoreSnapshotType = SnapshotOut<typeof HabitEntryStoreModel>
export interface HabitEntryStoreSnapshot extends HabitEntryStoreSnapshotType {}
export const createHabitEntryStoreDefaultModel = () => types.optional(HabitEntryStoreModel, {})
