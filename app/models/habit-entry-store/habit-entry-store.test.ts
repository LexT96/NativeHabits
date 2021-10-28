import { HabitEntryStoreModel } from "./habit-entry-store"

test("can be created", () => {
  const instance = HabitEntryStoreModel.create({})

  expect(instance).toBeTruthy()
})
