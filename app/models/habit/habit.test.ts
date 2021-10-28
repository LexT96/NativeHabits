import { HabitModel } from "./habit"

test("can be created", () => {
  const instance = HabitModel.create({})

  expect(instance).toBeTruthy()
})
