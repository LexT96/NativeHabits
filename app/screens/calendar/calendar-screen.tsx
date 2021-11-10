import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import moment from "moment"
import { Box, Select } from "native-base"
import React, { FC, useCallback, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Calendar } from 'react-native-calendars'
import { GradientBackground, HabitIcon, Header, Screen } from "../../components"
import useHabitImage from "../../hooks/useHabitImage"
import { translate } from "../../i18n"
import { useStores } from "../../models"
import { Habit } from "../../models/habit/habit"
import { NavigatorParamList } from "../../navigators"
import { color, spacing, typography } from "../../theme"


export const CalendarScreen: FC<StackScreenProps<NavigatorParamList, "calendar">> = observer(
  ({ navigation }) => {
    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null)
    const { habitStore, habitEntryStore } = useStores()
    const { habits } = habitStore

    const generateMarkedDates = useCallback(() => {
      if (!selectedHabit) return {};
      const entries = habitEntryStore.getForHabit(selectedHabit.id)
      let markedDates = {}
      for (let i = 0; i < entries.length; i++) {
        const dateColor = color.palette.angry;
        const date = entries[i].date;
        const dateMoment = moment(date);
        const momentOfNextDay = dateMoment.clone().add(1, "days")
        const momentOfLastDay = dateMoment.clone().subtract(1, "days")
        const endingDay =
          i === entries.length - 1 || momentOfNextDay.diff(moment(entries[i + 1].date), "days") !== 0
        const startingDay =
          i === 0 ||
          momentOfLastDay.diff(moment(entries[i - 1].date), "days") !== 0
        markedDates = {
          ...markedDates,
          [date]: {
            color: dateColor,
            endingDay,
            startingDay,
          },
        }
      }
      return markedDates
    }, [selectedHabit])

    if (!habits) return <div></div>


    return (
      <View testID="CalendarScreen" style={FULL}>
        <GradientBackground />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="calendarScreen.header" style={HEADER} titleStyle={HEADER_TITLE} />
            <Select
              style={{ ...TEXT }}
              placeholder={translate("calendarScreen.select.placeholder")}
              onValueChange={(value) =>
                setSelectedHabit(habits.find((h) => h.id.toString() === value))
              }
            >
              {habits.map((habit) => (
                <Select.Item
                  key={habit.id}
                  label={habit.name}
                  value={habit.id.toString()}
                  leftIcon={<HabitIcon source={useHabitImage(habit)} />}
                />
              ))}
            </Select>
            <Calendar
              style={{marginTop: spacing[8]}}
              markingType={"period"}
              enableSwipeMonths
              markedDates={generateMarkedDates()}
              theme={CALENDAR_THEME}
            />
        </Screen>
      </View>
    )
  },
)

const HEADER: TextStyle = {
  paddingHorizontal: 0,
} 
const FULL: ViewStyle = { flex: 1}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  flex: 1,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.text,
  fontFamily: typography.primary,
  fontSize: 20
}
const CALENDAR_THEME = {
  calendarBackground: "#20162D",
  dayTextColor: color.palette.offWhite,
  textDisabledColor: color.palette.lightGrey,
  monthTextColor: color.palette.offWhite,
  arrowColor: color.palette.angry,
  flex: 2,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
