import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

const TaskDetailScreen = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [repeat, setRepeat] = useState(false);
  const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));

  const toggleDay = (index) => {
    const updatedDays = [...selectedDays];
    updatedDays[index] = !updatedDays[index];
    setSelectedDays(updatedDays);
  };

  const handleSaveTask = async () => {
    const task = {
      id: Date.now(),
      name: taskName,
      startTime: startTime.toLocaleTimeString(),
      endTime: endTime.toLocaleTimeString(),
      repeat,
      days: selectedDays
    };

    try {
      const existingTasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];
      await AsyncStorage.setItem('tasks', JSON.stringify([...existingTasks, task]));
      Alert.alert('Success', 'Task added successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save the task.');
    }
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
      <View style={styles.switchContainer}>
        <Text>Repeat</Text>
        <Switch value={repeat} onValueChange={setRepeat} />
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

export default TaskDetailScreen;