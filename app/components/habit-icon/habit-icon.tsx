import { observer } from "mobx-react-lite"
import { Image } from "native-base"
import { flatten } from "ramda"
import * as React from "react"
import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { color } from "../../theme/color"
import { spacing } from "../../theme/spacing"
import { icons } from "./icons"

const CONTAINER: ViewStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 35,
  width: 70,
  height: 70,
  margin: spacing[2],
  backgroundColor: color.palette.orange,
}

export interface HabitIconProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  source: ImageSourcePropType;
  isActive?: boolean;
  onPress?: () => void;
}

const ACTIVE_OPACITY = 0.6;

/**
 * A small image with a round border.
 */
export const HabitIcon = observer(function HabitIcon(props: HabitIconProps) {
  const { style, source, onPress, isActive } = props;
  const styles = flatten([CONTAINER, style, { opacity: isActive ? ACTIVE_OPACITY : 1 }])
  return (
    <TouchableWithoutFeedback
      style={styles}
      onPress={onPress}
    >
      <Image size="xs" alt={"HabitIcon"} source={source} />
    </TouchableWithoutFeedback>
  )
})
