import React from 'react';
import { Alert } from 'react-native';

import { addTasks } from '../utils/TaskDatabase';
import { convertToSQLiteDateTime, daysOfWeekToSQLiteInteger } from '../utils/SupportDataBaseIO';
import useTaskState, { daysOfWeek } from '../utils/useTaskState';
import TaskForm from '../styles/TaskForm';
import { taskDetailStyles } from '../styles/taskDetailStyle';


const TaskDetailScreen = ({ navigation }) => {
  const {
    taskName,
    setTaskName,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    selectedDays,
    setSelectedDays,
    isNotification,
    setIsNotification
  } = useTaskState();

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
      isNotification & 1
    ];
    addTasks(values)
    .then(() => {
      Alert.alert('Success', 'Task added successfully!');
      navigation.goBack();
    })
    .catch(error => {
      Alert.alert('Error', 'Failed to save the task.\n'+ error);
    });
  };

  return (
    <TaskForm
      styles={taskDetailStyles}
      taskName={taskName}
      setTaskName={setTaskName}
      startTime={startTime}
      setStartTime={setStartTime}
      endTime={endTime}
      setEndTime={setEndTime}
      daysOfWeek={daysOfWeek}
      selectedDays={selectedDays}
      toggleDay={toggleDay}
      isNotification={isNotification}
      setIsNotification={setIsNotification}
      handleSaveTask={handleSaveTask}
      navigation={navigation}
    />
  );
};

export default TaskDetailScreen;