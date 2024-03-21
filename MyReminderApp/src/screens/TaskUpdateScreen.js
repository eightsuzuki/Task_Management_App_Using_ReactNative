import React, { useState, useEffect } from 'react';
import { Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { loadTask, updateCurrentTask } from '../utils/TaskDatabase';
import { convertFromSQLiteDateTime, convertToSQLiteDateTime, daysOfWeekToSQLiteInteger, SQLiteIntegerToDaysOfWeek } from '../utils/SupportDataBaseIO';
import useTaskState, { daysOfWeek }from '../utils/useTaskState';
import TaskForm from '../styles/TaskForm';
import { taskDetailStyles } from '../styles/taskDetailStyle';
import { SaveTaskNotification } from '../utils/notification';


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
    setSelectedDays,
    isNotification,
    setIsNotification
  } = useTaskState();
  
useEffect(() => {
  const fetchData = async () => {
    const loadedTask = await loadTask(updateTaskId);
    if (loadedTask && loadedTask.length > 0) {
      const task = loadedTask[0];
      setUpdateTask(task);
      setTaskName(task.name);
      setStartTime(convertFromSQLiteDateTime(task.starttime));
      setEndTime(convertFromSQLiteDateTime(task.endtime));
      setSelectedDays(SQLiteIntegerToDaysOfWeek(task.repeatday));
      setIsNotification(task.isnotification === 1);
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
      isNotification & 1,
      updateTaskId
    ];
    try {
      await updateCurrentTask(values);
      Alert.alert('Success', 'Task updated successfully!');

      const task = await loadTask(updateTaskId);

      if (task[0].isnotification) {
        await SaveTaskNotification(task[0]);
      }

      navigation.goBack();
    } catch(error) {
      Alert.alert('Error', 'Failed to update the task.' +error);
    }
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

export default TaskUpdateScreen;