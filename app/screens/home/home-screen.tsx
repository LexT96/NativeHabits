import React, { FC } from "react"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Observer, observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground,
  AutoImage as Image,
  HabitIcon,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { AddIcon, Box, Center, Column, Fab, FlatList, Icon, Row } from "native-base"
import { AntDesign, MaterialIcons } from "@expo/vector-icons"
import { useIsFocused } from "@react-navigation/native"
import { Habit, HabitEntryModel, HabitSnapshot, useStores } from "../../models"
import { HabitIconType, icons } from "../../components/habit-icon/icons"
import moment, { Moment } from "moment";
import { useState } from "react"
import { getSnapshot } from "mobx-state-tree"

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
const HABIT_ENTRY_CIRCLE: ViewStyle = {
  height: 50,
  width: 50,
  borderRadius: 30,
  borderWidth: 2,
  borderColor: color.palette.angry,
}

const generateDates = () => {
  const dates = [moment()];
  for (let i = 1; i < 5; i++) {
    dates.push(moment().subtract(i, 'days'));
  }
  return dates;
}



export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {
    const {habitStore, habitEntryStore} = useStores();
    const {habits} = habitStore;
    const {habitEntries} = habitEntryStore;
    const navigateToNewHabitScreen = () => navigation.navigate("newHabit")
    const isFocused = useIsFocused()
    const findIcon = (iconName: string) => {
      const icon = icons.find((icon: HabitIconType) => icon.name === iconName);
      return icon.img;
    }

    const handleHabitEntryCirclePress =  (habit: Habit, date: Moment) => {
      const entry = HabitEntryModel.create({ id: Date.now(), habit: habit.id, date: date.format("YYYY-MM-DD") })
      habitEntryStore.addHabitEntry(entry);
    }

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />

          {isFocused && (
            <Fab
              position="absolute"
              size="sm"
              onPress={navigateToNewHabitScreen}
              icon={<AddIcon size="md" />}
            />
          )}

          <FlatList
            data={habits}
            extraData={habitEntries.slice()}
            renderItem={({ item: habit }) => (
              <Box style={{ marginBottom: spacing[2] }}>
                <Text>{habit.name}</Text>
                <Row>
                  <HabitIcon source={findIcon(habit.icon)} />
                  <FlatList
                    horizontal
                    data={generateDates()}
                    renderItem={({ item: date }) => (
                      <Column style={{ justifyContent: "flex-end" }}>
                        <Center>
                          <TouchableOpacity
                            style={HABIT_ENTRY_CIRCLE}
                            onPress={() => handleHabitEntryCirclePress(habit, date)}
                          >
                            <Text>
                              {habitEntryStore
                                .getForHabit(habit.id)
                                .find((entry) => entry.date === date.format("YYYY-MM-DD")) ? "Da" : "No"}
                            </Text>
                          </TouchableOpacity>
                          <Text style={{ marginHorizontal: spacing[3], paddingTop: spacing[2] }}>
                            {date.format("DD-MM")}
                          </Text>
                        </Center>
                      </Column>
                    )}
                  />
                  {/* <FlatList
                    horizontal
                    data={habitEntryStore.getForHabit(habit.id)}
                    keyExtractor={(entry) => entry.id}
                    renderItem={({ item: entry }) => (
                      <Column style={{ marginTop: spacing[4] }}>
                        <TouchableOpacity style={{paddingBottom: spacing[1]}}>
                          <Center>
                            <Box
                              style={{
                                width: 45,
                                height: 45,
                                borderRadius: 30,
                                borderWidth: 3,
                                borderColor: color.palette.angry,
                                backgroundColor: color.transparent,
                              }}
                            />
                          </Center>
                        </TouchableOpacity>
                        <Text style={{ marginHorizontal: spacing[3] }}>
                          {moment(entry.date, "YYYY-MM-DD").format("DD-MM")}
                        </Text>
                      </Column>
                    )}
                  /> */}
                </Row>
                {/* <Text>{JSON.stringify(habit)}</Text>   */}
              </Box>
            )}
          />
          {/* <Text style={TITLE_WRAPPER}>
            <Text style={TITLE} text="Your new app, " />
            <Text style={ALMOST} text="almost" />
            <Text style={TITLE} text="!" />
          </Text>
          <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch" />
          <Image source={bowserLogo} style={BOWSER} />
          <Text style={CONTENT}>
            This probably isn't what your app is going to look like. Unless your designer handed you
            this screen and, in that case, congrats! You're ready to ship.
          </Text>
          <Text style={CONTENT}>
            For everyone else, this is where you'll see a live preview of your fully functioning app
            using Ignite.
          </Text> */}
        </Screen>
        {/* <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="welcomeScreen.continue"
              onPress={nextScreen}
            />
          </View>
        </SafeAreaView> */}
      </View>
    )
  },
)
