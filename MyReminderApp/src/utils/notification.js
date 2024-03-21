import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


export const cancelScheduledNotification = async (taskId) => {
  try {
    for (let i = 0; i < 7; i++){
      const notificationId = String(taskId) + '_' + String(i);
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    }
    console.log('Notification canceled successfully.');
  } catch (error) {
    console.error('Failed to cancel notification:', error);
  }
};

export const SaveTaskNotification = async (task) => {
  console.log('save')
  for (let i = 0; i < 7; i++){
    if(task.repeatday & (1 << i)){
      const data = makeNotificationData(task.name, i, task.starttime);
      try {
        const notificationId = String(task.id) + '_' + String(i);
        await saveNotificationData(notificationId, data);
        await Notifications.scheduleNotificationAsync({
          identifier: notificationId,
          ...data
        });
      } catch(error) {
        Alert.alert("Error", error.message);
      }
    }
  }
}


const saveNotificationData = async (taskId, data) => {
  try {
    await AsyncStorage.setItem(taskId, JSON.stringify(data));
    console.log('Notification data saved successfully.');
  } catch (error) {
    console.error('Failed to save notification data:', error);
  }
};

const makeNotificationData = (taskname, weekDay, startTime) => {
  const [datePart, timePart] = startTime.split(' ');
  const [hour, min] = timePart.split(':').map(Number);
  const notificationData = {
    content: {
      body: taskname
    },
    trigger: {
      weekday: weekDay,
      hour: hour,
      minute: min,
      repeats: true,
    },
  }
  return notificationData
}