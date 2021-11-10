import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { AddIcon, Column, Divider, Fab, FlatList } from "native-base"
import React, { FC, useEffect, useRef } from "react"
import { useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import {
  GradientBackground, HabitRow, Header,
  Screen
} from "../../components"
import { Habit, useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { color, spacing, typography } from "../../theme"



export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {
    const {habitStore, habitEntryStore} = useStores();
    const {habits} = habitStore;
    const navigateToNewHabitScreen = () => navigation.navigate("newHabit")

    useEffect(() => {
      habitStore.setHabits();
      habitEntryStore.setHabitEntries();
    }, [])

    return (
      <View testID="HomeScreen" style={FULL}>
        <GradientBackground />
        <Fab
          position="absolute"
          bottom={5}
          right={5}
          backgroundColor={color.primary}
          renderInPortal={false}
          size="sm"
          onPress={navigateToNewHabitScreen}
          icon={<AddIcon size="md" />}
        />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
          <FlatList
            data={habits.slice()}
            renderItem={({ item: habit }) => (
              <Column key={habit.id}>
                <HabitRow habit={habit} />
                {habit.id !== habits[habits.length - 1].id && (
                  <Divider
                    bg={color.palette.lightGrey}
                    thickness={2}
                    style={{ marginVertical: spacing[3] }}
                  />
                )}
              </Column>
            )}
          />
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
