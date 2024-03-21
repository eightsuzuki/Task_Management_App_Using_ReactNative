import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignInScreen from '../screens/SigninScreen';
import TitleScreen from '../screens/TitleScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskUpdateScreen from '../screens/TaskUpdateScreen';
import CompleteTaskList from '../screens/CompleteTaskList';

import { createTable } from '../utils/TaskDatabase';
import { createUsersTable } from '../utils/UserDatabase';
import taskStatusUpdate from '../utils/TaskStatusUpdate';


const Stack = createStackNavigator();

function AppNavigation() {
  useEffect(() => {
    createTable();
    taskStatusUpdate();
    createUsersTable();

    return () => {
      clearInterval(taskStatusUpdate);
    };

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6A6A6A", // ヘッダーの背景色を設定
          },
          headerTintColor: "#FFF", // ヘッダーのテキスト色を設定
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        initialRouteName="Title"
      >
        <Stack.Screen
          name="Title"
          component={TitleScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        <Stack.Screen name="TaskUpdate" component={TaskUpdateScreen} />
        <Stack.Screen name="CompleteTaskList" component={CompleteTaskList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
