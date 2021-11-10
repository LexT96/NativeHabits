import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { HabitEntryStoreModel } from "../habit-entry-store/habit-entry-store"
import { HabitStoreModel } from "../habit-store/habit-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  habitStore: types.optional(HabitStoreModel, {} as any),
  habitEntryStore: types.optional(HabitEntryStoreModel, {} as any),

})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {

}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
