import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const HabitModel = types
  .model("Habit")
  .props({
    id: types.identifierNumber,
    name: types.string,
    icon: types.string,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type HabitType = Instance<typeof HabitModel>
export interface Habit extends HabitType {}
type HabitSnapshotType = SnapshotOut<typeof HabitModel>
export interface HabitSnapshot extends HabitSnapshotType {}
export const createHabitDefaultModel = () => types.optional(HabitModel, {})
