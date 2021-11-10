import { observer } from "mobx-react-lite";
import moment from "moment";
import { Center, Heading, Pressable, Text, View, Image} from "native-base";
import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { GradientBackground, HabitIcon, Header, Screen } from "../../components";
import useHabitImage from "../../hooks/useHabitImage";
import { translate } from "../../i18n/translate";
import { Habit, useStores } from "../../models";
import { color, spacing, typography } from "../../theme";

export const TodayScreen = observer(function TodayScreen() {
  const {habitStore, habitEntryStore} = useStores()
  const habitEntries = habitEntryStore.getForToday();
  const outstandingHabits = habitStore.getOutstandingForToday();
  const doneHabits = habitStore.getDoneForToday();
  const today = moment();

  const sections = [
    { title: translate("todayScreen.todoTitle"), data: habitStore.getOutstandingForToday() },
    { title: translate("todayScreen.doneTitle"), data: habitStore.getDoneForToday() },
  ]

  const createHabitEntry = (habit: Habit) => {
    const entry = habitEntryStore.createHabitEntry(habit, today);
  }
  const deleteHabitEntry = (habit: Habit) => {
    habitEntryStore.removeTodaysHabitEntry(habit);
  }

  return (
    <View testID="TodayScreen" style={FULL}>
      <GradientBackground />
      <Screen backgroundColor={color.transparent} style={CONTAINER} preset="scroll">
        <Header headerTx="todayScreen.header" style={HEADER} titleStyle={HEADER_TITLE} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <Heading mb="3" color={color.palette.offWhite}>
            Outstanding habits ({outstandingHabits.length})
          </Heading>
          {outstandingHabits.length === 0 ? (
            <Center style={{marginVertical: spacing[8], width: "100%" }}>
              <Image alt="Well done!" width={250} height={260} source={require("./empty_space.png")} />
              <Heading size="2xl" style={{ color: color.palette.offWhite }}>
                Good job!
              </Heading>
              <Heading size="lg" style={{ color: color.palette.offWhite }}>
                You are all done for today!
              </Heading>
            </Center>
          ) : (
            <>
              {outstandingHabits.map((habit) => (
                <Pressable  shadow={9}  style={BOX} key={habit.id} onPress={() => createHabitEntry(habit)}>
                  <HabitIcon source={useHabitImage(habit)} />
                  <Text bold color={color.palette.offWhite}>
                    {habit.name}
                  </Text>
                </Pressable>
              ))}
            </>
          )}
          <Heading mb="3" color={color.palette.offWhite}>
            Accomplished habits ({doneHabits.length})
          </Heading>
          {doneHabits.map((habit) => (
            <Pressable style={BOX} key={habit.id} onPress={() => deleteHabitEntry(habit)}>
              <HabitIcon source={useHabitImage(habit)} />
              <Text bold color={color.palette.offWhite}>
                {habit.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </Screen>
    </View>
  )
})

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const BOX: ViewStyle = {
  padding: spacing[4],
  width: "45%",
  margin: "2.5%",
  borderRadius: 8,
  backgroundColor: color.transparent,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: color.palette.lightGrey,
  marginBottom: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  flexWrap: "wrap"
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
} 
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
