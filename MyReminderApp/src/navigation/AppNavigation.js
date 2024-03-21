import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskUpdateScreen from '../screens/TaskUpdateScreen';
import { createTable } from '../utils/TaskDatabase';
import CompleteTaskList from '../screens/CompleteTaskList';

const Stack = createStackNavigator();

function AppNavigation() {
  createTable();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CompleteTaskList" component={CompleteTaskList} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        <Stack.Screen name="TaskUpdate" component={TaskUpdateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
