import React from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Switch,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TaskForm = ({
  styles,
  taskName,
  setTaskName,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  daysOfWeek,
  selectedDays,
  toggleDay,
  isNotification,
  setIsNotification,
  handleSaveTask,
  navigation,
  labels,
  selectedLabels,
  toggleLabel,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTaskName}
        value={taskName}
        placeholder="Routine name"
      />
      <Text style={styles.text}>Start Time:</Text>
      <DateTimePicker
        testID="startTimePicker"
        value={startTime}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, selectedTime) =>
          setStartTime(selectedTime || startTime)
        }
      />
      <Text style={styles.text}>End Time:</Text>
      <DateTimePicker
        testID="endTimePicker"
        value={endTime}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, selectedTime) => setEndTime(selectedTime || endTime)}
      />
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day, index) => (
          <Text
            key={index}
            onPress={() => toggleDay(index)}
            style={[
              styles.dayButton,
              selectedDays[index] && styles.selectedDayButton,
            ]}
          >
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.daysContainer}>
        {labels.map((label, index) => (
          <Text
            key={index}
            onPress={() => toggleLabel(index)}
            style={[
              styles.dayButton,
              selectedLabels[index] && styles.selectedDayButton,
            ]}
          >
            {label}
          </Text>
        ))}
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Notification</Text>
        <Switch
          value={isNotification}
          style={styles.notification}
          onValueChange={setIsNotification}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title="OK"
            onPress={handleSaveTask}
            color="#007AFF"
            fontSize={20}
            fontWeight="bold"
            style={styles.button}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            color="#666"
            fontWeight="bold"
            fontSize={20}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "black", 
    borderRadius: 24,
    overflow: "hidden",

  },
});

export default TaskForm;