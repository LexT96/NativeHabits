import { observer } from "mobx-react-lite"
import { Center, Column, FormControl, Input, ScrollView, View, WarningOutlineIcon } from "native-base"
import React, { useState } from "react"
import { SafeAreaView, TextStyle, ViewStyle } from "react-native"
import { Button, GradientBackground, HabitIcon, Header, Screen } from "../../components"
import { HabitIconType, icons } from "../../components/habit-icon/icons"
import { translate } from "../../i18n"
import { Habit, HabitModel } from "../../models/habit/habit"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

const FULL: ViewStyle = { flex: 1 }
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
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
const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
  backgroundColor: color.transparent,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const ICONS: ViewStyle = {
  marginVertical: spacing[7],
}

export const NewHabitScreen = observer(function NewHabitScreen() {
  const {habitStore} = useStores();
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const handleNameChange = (text: string) => setName(text);
  console.log(icon)
  const createHabit = async () => {
    const habit = HabitModel.create({ id: Date.now(), name, icon })
    console.log(habit);
    habitStore.addHabit(habit);
  }

  const validateForm = () => {
    return name.length > 0;
  }
  return (
    <View testID="NewHabitScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="newHabitScreen.title"
          style={HEADER}
          titleStyle={HEADER_TITLE}
          leftIcon="back"
          onLeftPress={goBack}
        />
        <Center style={ICONS}>
          <ScrollView horizontal>
            {icons.map((habitIcon: HabitIconType, index: number) => (
              <Column key={index}>
                <HabitIcon
                  isActive={icon === habitIcon.name}
                  onPress={() => setIcon(habitIcon.name)}
                  key={index}
                  iconNumber={index}
                />
                {/* <HabitIcon onPress={() => setIcon(icon.img)} key={index} iconNumber={index} /> */}
              </Column>
            ))}
          </ScrollView>
        </Center>
        <FormControl isInvalid={false}>
          <Input
            size="2xl"
            value={name}
            onChangeText={handleNameChange}
            style={{ color: color.palette.white }}
            placeholder={translate("newHabitScreen.placeholders.name")}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Try different from previous passwords.
          </FormControl.ErrorMessage>
        </FormControl>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            testID="NewHabitButton"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="newHabitScreen.create"
            onPress={createHabit}
          />
        </View>
      </SafeAreaView>
    </View>
  )
})
