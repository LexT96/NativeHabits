import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { HabitIcon } from "./habit-icon"

storiesOf("HabitIcon", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <HabitIcon style={{ backgroundColor: color.error }} onPress={() => console.log("pressed")}iconNumber={1} />
      </UseCase>
    </Story>
  ))
