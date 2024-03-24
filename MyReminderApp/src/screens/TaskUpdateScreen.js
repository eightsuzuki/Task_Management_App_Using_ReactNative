import React, { useState, useEffect } from 'react';
import { Text, Alert, StyleSheet,  ImageBackground,
  TouchableOpacity,} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { loadTask, updateCurrentTask } from '../utils/TaskDatabase';
import { convertFromSQLiteDateTime, convertFromSQLiteLabels, convertToSQLiteDateTime, convertToSQLiteLabels, daysOfWeekToSQLiteInteger, SQLiteIntegerToDaysOfWeek } from '../utils/SupportDataBaseIO';
import useTaskState, { daysOfWeek, labels }from '../utils/useTaskState';
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
    setIsNotification,
    selectedLabels,
    setSelectedLabels
  } = useTaskState();
  
  navigation.setOptions({
    headerTitle: 'Task Update', 
    headerTitleStyle: {
      fontSize: 24,
    },
    headerLeft: null, 
  });
  
useEffect(() => {
  const fetchData = async () => {
    const loadedTask = await loadTask(updateTaskId);
    if (loadedTask && loadedTask.length > 0) {
      const task = loadedTask[0];
      console.log(task);
      setUpdateTask(task);
      setTaskName(task.name);
      setStartTime(convertFromSQLiteDateTime(task.starttime));
      setEndTime(convertFromSQLiteDateTime(task.endtime));
      setSelectedDays(SQLiteIntegerToDaysOfWeek(task.repeatday));
      setSelectedLabels(convertFromSQLiteLabels(task.label));
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

  const toggleLabel = (index) => {
    const updatedLabels = [...selectedLabels];
    updatedLabels[index] = !updatedLabels[index];
    setSelectedLabels(updatedLabels);
    console.log(updatedLabels);
  };

  const handleSaveTask = async () => {
    if (!taskName) {
      Alert.alert('Task name must be filled');
      return
    }
    const values = [
      taskName,
      convertToSQLiteDateTime(startTime),
      convertToSQLiteDateTime(endTime),
      daysOfWeekToSQLiteInteger(selectedDays),
      0,
      isNotification & 1,
      convertToSQLiteLabels(selectedLabels),
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
    <ImageBackground
    source={require("../../assets/timer.png")}
    style={styles.container}
    imageStyle={styles.backgroundImage}
  >
    <TaskForm
      styles={styles.taskDetailStyles}
      taskName={taskName}
      setTaskName={setTaskName}
      startTime={startTime}
      setStartTime={setStartTime}
      endTime={endTime}
      setEndTime={setEndTime}
      daysOfWeek={daysOfWeek}
      selectedDays={selectedDays}
      toggleDay={toggleDay}
      labels={labels}
      selectedLabels={selectedLabels}
      toggleLabel={toggleLabel}
      isNotification={isNotification}
      setIsNotification={setIsNotification}
      handleSaveTask={handleSaveTask}
      navigation={navigation}
    />
    <TouchableOpacity
    style={styles.taskList}
    onPress={() => navigation.navigate("Home")}
  >
    <MaterialCommunityIcons
      name="keyboard-backspace"
      size={60}
      color="white"
    />
  </TouchableOpacity>
  </ImageBackground>

  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    opacity: 1,
  },
  backgroundImage: {
    resizeMode: "contain",
    width: "100%",
    height: "180%",
  },
  taskList: {
    position: 'absolute',
    left: 30,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 75,
    borderRadius: 30,
    backgroundColor: '#2D3F45',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 0,
  },
  taskDetailStyles: {
    container: {
      flex: 1,
      padding: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 20,
      borderRadius: 5,
    },
    text: {
      color: '#000',
      fontSize: 18,
    },
    daysContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 0, 
      padding: 20, 
    },
    dayButton: {
      padding: 7,
      color: 'black',
      borderWidth: 3,
      borderColor: '#5D5D5D',
      borderRadius: 20,
    },
    selectedDayButton: {
      color: 'white',
      backgroundColor: '#5D5D5D',
      borderRadius: 20, 
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      justifyContent: 'space-between',
    },
    notification: {
      color: '#fff',

    },
}});

export default TaskUpdateScreen;