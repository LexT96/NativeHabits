import { observer } from "mobx-react-lite"
import { Button, Center, Column, FlatList, FormControl, Input, ScrollView, View, WarningOutlineIcon } from "native-base"
import React, { useState } from "react"
import { SafeAreaView, TextStyle, ViewStyle } from "react-native"
import { GradientBackground, HabitIcon, Header, Screen } from "../../components"
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

interface FormError {
  name?: boolean;
  icon?: boolean;
}

export const NewHabitScreen = observer(function NewHabitScreen() {
  const { habitStore } = useStores()
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const [name, setName] = useState("")
  const [icon, setIcon] = useState("")
  const [error, setError] = useState<FormError>({})
  const handleNameChange = (text: string) => setName(text)
  const createHabit = async () => {
    const nameError = name.length === 0
    const iconError = !icon
    setError({ ...error, name: nameError, icon: iconError })
    if (nameError || iconError) return
    const habit = HabitModel.create({ id: Date.now(), name, icon })
    habitStore.addHabit(habit)
    navigation.goBack()
  }

  const generateHabitIcons = () => {
    const habitIcons = [];
    for (let i = 0; i < icons.length; i+=2) {
      const firstIcon = icons[i];
      const secondIcon= icons[i+1];
      habitIcons.push(
        <Column key={i}>
          <HabitIcon
            isActive={icon === firstIcon.name}
            onPress={() => setIcon(firstIcon.name)}
            source={icons[i].img}
          />
          {secondIcon && (
            <HabitIcon
              isActive={icon === secondIcon.name}
              onPress={() => setIcon(secondIcon.name)}
              source={icons[i + 1].img}
            />
          )}
        </Column>,
      )
    }
    return <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {habitIcons}
    </ScrollView>
  }

  return (
    <View testID="NewHabitScreen" style={FULL}>
      <GradientBackground />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="newHabitScreen.title"
          style={HEADER}
          titleStyle={HEADER_TITLE}
          leftIcon="back"
          onLeftPress={goBack}
        />
        <Center style={ICONS}>
          {generateHabitIcons()}
          <FormControl isInvalid={error.icon}>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {translate("newHabitScreen.error.icon")}
            </FormControl.ErrorMessage>
          </FormControl>
        </Center>
        <FormControl isInvalid={error.name}>
          <Input
            size="2xl"
            value={name}
            onChangeText={handleNameChange}
            style={{ color: color.palette.white }}
            placeholder={translate("newHabitScreen.placeholders.name")}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {translate("newHabitScreen.error.name")}
          </FormControl.ErrorMessage>
        </FormControl>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            testID="NewHabitButton"
            style={CONTINUE}
            onPress={createHabit}
          >
            {translate("newHabitScreen.create")}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  )
})
