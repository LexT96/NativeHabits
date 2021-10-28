import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { Habit, HabitModel } from "../habit/habit"

/**
 * Model description here for TypeScript hints.
 */
export const HabitStoreModel = types
  .model("HabitStore")
  .props({
    habits: types.optional(types.array(HabitModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => {
    const getHabits = () => {
      return "da"
    }
    const addHabit = (habit: Habit) => {
      self.habits.push(habit);
    }
    
    return { getHabits, addHabit }
  })

type HabitStoreType = Instance<typeof HabitStoreModel>
export interface HabitStore extends HabitStoreType {}
type HabitStoreSnapshotType = SnapshotOut<typeof HabitStoreModel>
export interface HabitStoreSnapshot extends HabitStoreSnapshotType {}
export const createHabitStoreDefaultModel = () => types.optional(HabitStoreModel, {})
