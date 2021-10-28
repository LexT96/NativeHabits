import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { HabitModel } from "../habit/habit"

/**
 * Model description here for TypeScript hints.
 */
export const HabitEntryModel = types
  .model("HabitEntry")
  .props({
    date: types.Date,
    habit: types.reference(HabitModel),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type HabitEntryType = Instance<typeof HabitEntryModel>
export interface HabitEntry extends HabitEntryType {}
type HabitEntrySnapshotType = SnapshotOut<typeof HabitEntryModel>
export interface HabitEntrySnapshot extends HabitEntrySnapshotType {}
export const createHabitEntryDefaultModel = () => types.optional(HabitEntryModel, {})
