import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTask = async (task) => {
  try {
    const jsonValue = JSON.stringify(task);
    await AsyncStorage.setItem('task', jsonValue);
  } catch (e) {
    // エラー処理
  }
};

export const loadTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('task');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // エラー処理
  }
};
