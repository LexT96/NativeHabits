import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { GradientBackground, HabitIcon, Header, Screen } from "../../components"
import { useNavigation} from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Text } from "native-base";
import useHabitImage from "../../hooks/useHabitImage"
const ROOT: ViewStyle = {
  flex: 1,
}

export const ShowHabitScreen: FC<StackScreenProps<NavigatorParamList, "showHabit">> = observer(
  ({ navigation, route }) => {
    const {habit} = route.params;
    const goBack = () => navigation.goBack()
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <View testID="ShowHabitScreen" style={FULL}>
        <GradientBackground />
        <Screen backgroundColor={color.transparent} style={CONTAINER} preset="scroll">
          <Header
            leftIcon="back"
            onLeftPress={goBack}
            headerText={habit.name}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          {<HabitIcon source={useHabitImage(habit)} />}
        </Screen>
      </View>
    )
  },
)

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
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
const HABIT_ENTRY_CIRCLE: ViewStyle = {
  height: 50,
  width: 50,
  borderRadius: 30,
  borderWidth: 2,
  borderColor: color.palette.angry,
}
const ENTRY_CIRCLE_COL: ViewStyle = {
  justifyContent: "flex-end",
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
} 