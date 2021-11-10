import AsyncStorage from "@react-native-async-storage/async-storage"
import { destroy, Instance, SnapshotOut, types } from "mobx-state-tree"
import moment, { Moment } from "moment"
import { Habit } from ".."
import { HabitEntry, HabitEntryModel } from "../habit-entry/habit-entry"

/**
 * Stores all habit entries
 */
export const HabitEntryStoreModel = types
  .model("HabitEntryStore")
  .props({
    habitEntries: types.optional(types.array(HabitEntryModel), []),
  })
  .views((self) => {

    const getForToday = () => {
      return self.habitEntries.filter((entry) => entry.date === moment().format("YYYY-MM-DD"))
    }

    const getForHabit = (habitId: number) => {
      return self.habitEntries.filter((entry) => entry.habit.id === habitId)
    }

    const getCurrentStreak = (habitId: number) => {
      let count = 0;
      const allEntriesForHabit = getForHabit(habitId).reverse();
      allEntriesForHabit.forEach((entry) => {
        const date = moment(entry.date);
        const calculatedDate = moment().subtract(count,'days')
        if (date.diff(calculatedDate, 'days') !== 0) return count;
        count++
      })
      return count;
    }
    const getNumberOfEntriesForHabit = (habitId: number) => {
      return getForHabit(habitId).length;
    }
    return { getForToday, getForHabit, getCurrentStreak, getNumberOfEntriesForHabit }
  })
  .actions((self) => {
    const createHabitEntry = async (habit: Habit, date: Moment) => {
      const habitEntry = HabitEntryModel.create({
        id: Date.now(),
        habit: habit.id,
        date: date.format("YYYY-MM-DD"),
      })
      self.habitEntries.push(habitEntry)
      self.habitEntries = self.habitEntries.sort((h1, h2) =>
        moment(h1.date).isAfter(h2.date) ? 1 : -1,
      )
      try {
        await AsyncStorage.setItem('habitEntries', JSON.stringify(self.habitEntries));
      }
      catch (err) {
        console.log(err);
      }
    }
    const removeHabitEntry = async (habitEntry: HabitEntry) => {
      destroy(habitEntry)
      try {
        await AsyncStorage.setItem('habitEntries', JSON.stringify(self.habitEntries));
      }
      catch (err) {
        console.log(err);
      }
    }

    const removeTodaysHabitEntry = async (habit: Habit) => {
      const todaysHabitEntry = self.getForToday().find((entry) => entry.habit.id === habit.id)
      if (todaysHabitEntry) {
        removeHabitEntry(todaysHabitEntry)
      }
      try {
        await AsyncStorage.setItem('habitEntries', JSON.stringify(self.habitEntries));
      }
      catch (err) {
        console.log(err);
      }
    }

    const setHabitEntries = async () => {
      try {
        const entries = await AsyncStorage.getItem('habitEntries');
        if (entries) self.habitEntries = JSON.parse(entries);
      }
      catch (err) {
        console.log(err);
      }
    }

    return { removeHabitEntry, createHabitEntry, removeTodaysHabitEntry, setHabitEntries }
  })
type HabitEntryStoreType = Instance<typeof HabitEntryStoreModel>
export interface HabitEntryStore extends HabitEntryStoreType {}
type HabitEntryStoreSnapshotType = SnapshotOut<typeof HabitEntryStoreModel>
export interface HabitEntryStoreSnapshot extends HabitEntryStoreSnapshotType {}
export const createHabitEntryStoreDefaultModel = () => types.optional(HabitEntryStoreModel, {})
