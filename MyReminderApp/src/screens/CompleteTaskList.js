import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import { deleteSelectedTask, changeTaskStatus, loadCompletedTasks } from '../utils/TaskDatabase';
import { useUser } from '../utils/UserContext';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CompleteTaskList({ navigation, route }) {
  const [tasks, setTasks] = useState([]);
  const { userId } = useUser();

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadTasks();
      requestPermissionsAsync();
    });
  }, []);

  const loadTasks = async () => {
    loadCompletedTasks(userId)
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
      loadTasks();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const statusUpdate = async (newStatus, id) => {
    values = [newStatus ? 1: 0, id];
    try {
      await changeTaskStatus(values);
      await loadTasks();
    } catch (error) {
      await loadTasks();
      Alert.alert("Error", error.message);
    }
    
  }

  const requestPermissionsAsync = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) { return }
  
    await Notifications.requestPermissionsAsync();
  }

  return (
    <View style={styles.container}>
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
              <Text>Status</Text>
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
        onPress={() => navigation.navigate('Home', { userId: userId })}
      >
        <AntDesign name="home" size={60} color="black" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('TaskDetail', { usreId: userId })}
      >
        <AntDesign name="pluscircle" size={60} color="blue" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskList: {
    position: 'absolute',
    left: 30,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CompleteTaskList;