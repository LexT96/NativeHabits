import * as React from "react"
import { ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { color } from "../../theme/color"

const BG_GRADIENT: ViewStyle = { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }

export function GradientBackground() {
  return <LinearGradient colors={[color.gradientStart, color.gradientEnd]} style={BG_GRADIENT} />
}
