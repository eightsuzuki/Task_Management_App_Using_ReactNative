import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';

import { loadTask, updateCurrentTask } from '../utils/TaskDatabase';
import { convertFromSQLiteDateTime, convertToSQLiteDateTime, deserializeDays, serializeDays } from '../utils/SupportDataBaseIO';

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

const TaskUpdateScreen = ({ navigation }) => {
  const route = useRoute();
  const { updateTaskId } = route.params;
  const [updateTask, setUpdateTask] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));
  
useEffect(() => {
  const fetchData = async () => {
    const loadedTask = await loadTask(updateTaskId);
    if (loadedTask && loadedTask.length > 0) {
      const task = loadedTask[0];
      setUpdateTask(task);
      setTaskName(task.name);
      setStartTime(convertFromSQLiteDateTime(task.startTime));
      setEndTime(convertFromSQLiteDateTime(task.endTime));
      setRepeat(task.repeat === 1);
      setSelectedDays(deserializeDays(task.repeatDay));
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
      serializeDays(selectedDays),
      0,
      updateTaskId
    ];
    const updateSQL = `
      UPDATE tasks \
      SET name = ?, startTime = ?, endTime = ?, repeatDay = ?, status = ? \
      WHERE id = ?
    `;
    updateCurrentTask(updateSQL, values)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dayButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
  },
  selectedDayButton: {
    backgroundColor: '#ddd',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
});

export default TaskUpdateScreen;