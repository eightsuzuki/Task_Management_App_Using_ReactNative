import React from 'react';
import { Alert } from 'react-native';

import { addTasks, getMaxId, loadTask } from '../utils/TaskDatabase';
import { convertToSQLiteDateTime, daysOfWeekToSQLiteInteger } from '../utils/SupportDataBaseIO';
import useTaskState, { daysOfWeek } from '../utils/useTaskState';
import TaskForm from '../styles/TaskForm';
import { taskDetailStyles } from '../styles/taskDetailStyle';
import { SaveTaskNotification } from '../utils/notification';


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
    try {
      const values = [
        taskName,
        convertToSQLiteDateTime(startTime),
        convertToSQLiteDateTime(endTime),
        daysOfWeekToSQLiteInteger(selectedDays),
        0,
        isNotification & 1
      ];
      await addTasks(values);
  
      Alert.alert('Success', 'Task added successfully!');

      const maxId = await getMaxId();
      const task = await loadTask(maxId);

      if (task[0].isnotification) {
        await SaveTaskNotification(task[0]);
      }
      
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
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

export default TaskDetailScreen;