import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { HabitEntryStoreModel } from "../habit-entry-store/habit-entry-store"
import { HabitStoreModel } from "../habit-store/habit-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
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
