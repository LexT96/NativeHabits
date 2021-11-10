/* eslint-disable react/display-name */
/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CalendarScreen, HomeScreen, NewHabitScreen, ShowHabitScreen, TodayScreen } from "../screens"
import { navigationRef } from "./navigation-utilities"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { translate } from "../i18n"
import { Feather } from "@expo/vector-icons"
import { Habit } from "../models/habit/habit"
import { color } from "../theme"
import { useStores } from "../models"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  calendar: undefined
  demo: undefined
  newHabit: undefined
  showHabit: {habit: Habit}
  today: undefined
  demoList: undefined
  home: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="newHabit" component={NewHabitScreen} />
      <Stack.Screen name="showHabit" component={ShowHabitScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

const Tab = createBottomTabNavigator();
const CalendarScreenIcon = (isActive: boolean) => (<></>)
const HomeScreenIcon = (isActive: boolean) => <Feather name="check-circle" size={24} color={color.palette.lighterGrey} />
const TodayScreenIcon = <Feather name="clipboard" size={24} color={color.palette.lighterGrey} />
 
export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: color.primary,
          tabBarInactiveTintColor: color.palette.offWhite,
          tabBarInactiveBackgroundColor: color.gradientStart,
          tabBarActiveBackgroundColor: color.gradientEnd,
        }}
      >
        <Tab.Screen
          name={translate("route.home")}
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="check-circle"
                size={24}
                color={focused ? color.primary : color.palette.lighterGrey}
              />
            ),
          }}
        />
        <Tab.Screen
          name={translate("route.today")}
          component={TodayScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="clipboard"
                size={24}
                color={focused ? color.primary : color.palette.lighterGrey}
              />
            ),
          }}
        />
        <Tab.Screen
          name={translate("route.calendar")}
          component={CalendarScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="calendar"
                size={24}
                color={focused ? color.primary : color.palette.lightGrey}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
