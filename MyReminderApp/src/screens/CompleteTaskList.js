import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Switch, ImageBackground } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import { deleteSelectedTask, changeTaskStatus, loadCompletedTasks } from '../utils/TaskDatabase';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CompleteTaskList({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadTasks();
      requestPermissionsAsync();
    });
  }, []);

  navigation.setOptions({
    headerTitle: 'Completed Tasks', 
    headerTitleStyle: {
      fontSize: 24,
    },
    headerLeft: null, 
  });

  const loadTasks = async () => {
    loadCompletedTasks()
    .then(tasks => {
      setTasks(tasks);
    })
    .catch(error => {
      Alert.alert("Error", error.message);
    });
  };

  const deleteTask = async (id) => {
    try {
      await deleteSelectedTask(id);
      newTasks = await loadTasks();
      setTasks(newTasks);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const statusUpdate = async (newStatus, id) => {
    values = [newStatus ? 1: 0, id];
    try {
      await changeTaskStatus(values);
      newTasks = await loadTasks();
      setTasks(newTasks);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
    
  }

  const requestPermissionsAsync = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) { return }
  
    await Notifications.requestPermissionsAsync();
  }

  return (
    <ImageBackground
      source={require("../../assets/timer.png")}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View>
              <Text style={styles.taskText}>{item.name}</Text>
              <Text>{`Time: ${item.starttime}`}</Text>
              <Text>{`Repeat: ${item.repeat ? daysOfWeek.filter((day, index) => item.repeatday && item.repeatday[index]).map((day, index) => daysOfWeek[index]).join('・') : 'No Repeat'}`}</Text>
            </View>
            <View style={styles.switchContainer}>
              <Text>Complete</Text>
              <Switch value={item.status ? true : false} onValueChange={(newValue) => statusUpdate(newValue, item.id)} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('TaskUpdate', { updateTaskId: item.id})}>
              <AntDesign name="edit" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity 
        style={styles.taskList} 
        onPress={() => navigation.navigate('Home')}
      >
        <MaterialCommunityIcons name="keyboard-backspace" size={60} color="white" />
      </TouchableOpacity>

      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3B3B3',
    opacity: 1,
  },
  backgroundImage: {
    resizeMode: "contain",
    width: "100%",
    height: "180%",
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskText: {
    fontSize: 25,
    fontboldWeight: "bold",
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
});

export default CompleteTaskList;
