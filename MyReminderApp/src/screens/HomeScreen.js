
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadTasks();
    });
  }, []);

  const loadTasks = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      const loadedTasks = tasksString ? JSON.parse(tasksString) : [];
      setTasks(loadedTasks);
    } catch (e) {
      Alert.alert("Error", "Failed to load tasks.");
    }
  };

  const deleteTask = async (id) => {
    try {
      const newTasks = tasks.filter(task => task.id !== id);
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (e) {
      Alert.alert("Error", "Failed to delete the task.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View>
              <Text style={styles.taskText}>{item.name}</Text>
              <Text>{`Time: ${item.startTime} - ${item.endTime}`}</Text>
              <Text>{`Repeat: ${item.repeat ? daysOfWeek.filter((day, index) => item.repeatDay && item.repeatDay[index]).map((day, index) => daysOfWeek[index]).join('・') : 'No Repeat'}`}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('TaskDetail')}
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
});

export default HomeScreen;
