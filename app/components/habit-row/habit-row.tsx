import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import moment, { Moment } from "moment"
import { Box, Button, Center, Column, FlatList, Image, Modal, Row, Text } from "native-base"
import * as React from "react"
import { useState } from "react"
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import useHabitImage from "../../hooks/useHabitImage"
import { useStores } from "../../models"
import { Habit } from "../../models/habit/habit"
import { color, spacing, typography } from "../../theme"
import { HabitIcon } from "../habit-icon/habit-icon"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
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

export interface HabitRowProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  habit: Habit
}


const generateDates = () => {
  const dates = [moment()]
  for (let i = 1; i < 5; i++) {
    dates.push(moment().subtract(i, "days"))
  }
  return dates
}

/**
 * Describe your component here
 */
export const HabitRow = observer(function HabitRow(props: HabitRowProps) {
  const { style, habit } = props
  const navigation = useNavigation()
  const {habitEntryStore, habitStore} = useStores()
  const habitEntries = habitEntryStore.getForHabit(habit.id)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigateToShowHabitScreen = (habit) => navigation.navigate("showHabit", { habit })
  const handleHabitEntryCirclePress =  (habit: Habit, date: Moment) => {
    const matchingEntry = habitEntries
      .find((entry) => entry.date === date.format("YYYY-MM-DD"))
    if (matchingEntry) {
      habitEntryStore.removeHabitEntry(matchingEntry)
      return
    }
    habitEntryStore.createHabitEntry(habit, date)
  }
  const showModal = () => {setShowDeleteModal(true)};
  const hideModal = () => {setShowDeleteModal(false)};
  const onDeletePress = () => {
    habitStore.removeHabit(habit.id);
    hideModal();
  }


  return (
    <Box key={habit.id} style={{ marginBottom: spacing[2], paddingHorizontal: spacing[1]}}>
      <Row alignItems="center" width="100%">
        <Box width="50%">
          <Text color={color.palette.offWhite} bold>
            {habit.name}
          </Text>
        </Box>
        <Row width="50%" justifyContent="flex-end" alignItems="center" pr="2">
          <Image mr="2" source={require("../../screens/home/flame.png")} width={2} height={4} />
          <Text color={color.palette.offWhite} bold>
            {habitEntryStore.getCurrentStreak(habit.id)}
          </Text>
        </Row>
      </Row>
      <Modal isOpen={showDeleteModal} onClose={hideModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Delete Habit</Modal.Header>
          <Modal.Body>
            <Text>Are you sure you want to delete {habit.name}?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={hideModal}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={onDeletePress}>
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Row>
        <HabitIcon
          onPress={() => navigateToShowHabitScreen(habit)}
          onLongPress={showModal}
          source={useHabitImage(habit)}
        />
        <FlatList
          horizontal
          style={{ paddingLeft: spacing[3] }}
          scrollEnabled={false}
          data={generateDates()}
          renderItem={({ item: date }) => (
            <Column key={date} style={ENTRY_CIRCLE_COL}>
              <Center>
                <TouchableOpacity
                  style={HABIT_ENTRY_CIRCLE}
                  onPress={() => handleHabitEntryCirclePress(habit, date)}
                >
                  {habitEntries.find((entry) => entry.date === date.format("YYYY-MM-DD")) && (
                    <Center height={46} width={46}>
                      <Image
                        alt="Checkmark"
                        source={require("./checkmark.png")}
                        width={39}
                        height={39}
                      />
                    </Center>
                  )}
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: spacing[3],
                    paddingTop: spacing[1],
                    color: color.palette.offWhite,
                  }}
                >
                  {date.format("DD.MM")}
                </Text>
              </Center>
            </Column>
          )}
        />
      </Row>
    </Box>
  )
})
