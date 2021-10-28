import { HabitStoreModel } from "./habit-store"

test("can be created", () => {
  const instance = HabitStoreModel.create({})

  expect(instance).toBeTruthy()
})
