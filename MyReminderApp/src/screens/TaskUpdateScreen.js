import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';

import { loadTask, updateCurrentTask } from '../utils/TaskDatabase';
import { convertFromSQLiteDateTime, convertToSQLiteDateTime, daysOfWeekToSQLiteInteger, SQLiteIntegerToDaysOfWeek } from '../utils/SupportDataBaseIO';
import useTaskState from '../utils/useTaskState';
import { taskDetailStyles } from '../styles/taskDetailStyle';

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
const styles = taskDetailStyles

const TaskUpdateScreen = ({ navigation }) => {
  const route = useRoute();
  const { updateTaskId } = route.params;
  const [updateTask, setUpdateTask] = useState(null);
  const {
    taskName,
    setTaskName,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    selectedDays,
    setSelectedDays
  } = useTaskState();
  
useEffect(() => {
  const fetchData = async () => {
    const loadedTask = await loadTask(updateTaskId);
    if (loadedTask && loadedTask.length > 0) {
      const task = loadedTask[0];
      setUpdateTask(task);
      setTaskName(task.name);
      setStartTime(convertFromSQLiteDateTime(task.startTime));
      setEndTime(convertFromSQLiteDateTime(task.endTime));
      setSelectedDays(SQLiteIntegerToDaysOfWeek(task.repeatDay));
    }
  };

  fetchData();
}, [updateTaskId]);

if (!updateTask) {
  return <Text>loading ...</Text>;
}

  const toggleDay = (index) => {
    const updatedDays = [...selectedDays];
    updatedDays[index] = !updatedDays[index];
    setSelectedDays(updatedDays);
  };

  const handleSaveTask = async () => {
    const values = [
      taskName,
      convertToSQLiteDateTime(startTime),
      convertToSQLiteDateTime(endTime),
      daysOfWeekToSQLiteInteger(selectedDays),
      0,
      updateTaskId
    ];
    updateCurrentTask(values)
    .then(() => {
      Alert.alert('Success', 'Task updated successfully!');
      navigation.goBack();
    })
    .catch(() => {
      Alert.alert('Error', 'Failed to update the task.');
    });
  };

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
      <Button title="OK" onPress={handleSaveTask} color="#007AFF" />
      <Button title="Cancel" onPress={() => navigation.goBack()} color="#666" />
    </View>
  );
};

export default TaskUpdateScreen;