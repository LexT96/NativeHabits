import { HabitEntryModel } from "./habit-entry"

test("can be created", () => {
  const instance = HabitEntryModel.create({})

  expect(instance).toBeTruthy()
})
