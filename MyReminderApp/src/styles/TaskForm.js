import React from 'react';
import { View, TextInput, Button, Text, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskForm = ({ styles, taskName, setTaskName, startTime, setStartTime, endTime, setEndTime, daysOfWeek, selectedDays, toggleDay, isNotification, setIsNotification, repeat, setRepeat, handleSaveTask, navigation }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTaskName}
        value={taskName}
        placeholder="Routine name"
      />
      <Text>Start Time:</Text>
      <DateTimePicker
        testID="startTimePicker"
        value={startTime}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, selectedTime) => setStartTime(selectedTime || startTime)}
      />
      <Text>End Time:</Text>
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
          <Text key={index} onPress={() => toggleDay(index)} style={[styles.dayButton, selectedDays[index] && styles.selectedDayButton]}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.switchContainer}>
        <Text>Notification</Text>
        <Switch value={isNotification} onValueChange={setIsNotification} />
      </View>
      <Button title="OK" onPress={handleSaveTask} color="#007AFF" />
      <Button title="Cancel" onPress={() => navigation.goBack()} color="#666" />
    </View>
  );
};

export default TaskForm;
