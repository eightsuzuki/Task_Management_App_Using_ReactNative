import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Switch,
  ImageBackground,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

import {
  deleteSelectedTask,
  changeTaskStatus,
  loadCompletedTasks,
} from "../utils/TaskDatabase";
import { useUser } from "../utils/UserContext";
import TaskListItem from "../styles/taskListItem";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CompleteTaskList({ navigation, route }) {
  const [tasks, setTasks] = useState([]);
  const { userId } = useUser();

  useEffect(() => {
    navigation.addListener("focus", () => {
      loadTasks();
      requestPermissionsAsync();
    });
  }, []);

  navigation.setOptions({
    headerTitle: "Completed Tasks",
    headerTitleStyle: {
      fontSize: 24,
    },
    headerLeft: null,

    headerRight: () => (
      <Button
        onPress={() => {
          // ログアウト処理をここに書く
          Alert.alert("Logout", "You have been logged out.", [
            { text: "OK", onPress: () => navigation.navigate("Title") }, // 'LoginScreen'は適宜変更してください
          ]);
        }}
        title="Logout"
        color="#FFF" // ログアウトボタンの文字色を白に設定する
      />
    ),
  });

  const loadTasks = async () => {
    loadCompletedTasks(userId)
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((error) => {
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
    values = [newStatus ? 1 : 0, id];
    try {
      await changeTaskStatus(values);
      await loadTasks();
    } catch (error) {
      await loadTasks();
      Alert.alert("Error", error.message);
    }
  };

  const requestPermissionsAsync = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) {
      return;
    }

    await Notifications.requestPermissionsAsync();
  };

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
          <TaskListItem
            styles={styles}
            item={item}
            daysOfWeek={daysOfWeek}
            navigation={navigation}
            statusUpdate={statusUpdate}
            deleteTask={deleteTask}
          />
        )}
      />
      <TouchableOpacity
        style={styles.backspace}
        onPress={() => navigation.navigate("Home", { userId: userId })}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={60}
          color="white"
        />
      </TouchableOpacity>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: "#B3B3B3",
    borderBottomWidth: 3,
    marginBottom: 10, // 線とテキストの間に余白を設定します
  },
  container: {
    flex: 1,
    backgroundColor: "#B3B3B3",
  },
  backgroundImage: {
    resizeMode: "contain",
    width: "100%",
    height: "180%",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 0,
  },
  taskText: {
    fontSize: 30,
    fontboldWeight: "bold",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 85, // 大きさを変更
    width: 85, // 大きさを変更
    borderRadius: 60, // 丸みを帯びた四角にする
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 0,
  },

  completeTasksButtonBase: {
    position: "absolute",
    left: 30,
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 0,
    height: 50,
    width: 200,
    borderRadius: 30,
    backgroundColor: "#2D3F45", // 白色の背景
  },
  completeTasksButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  completeTasksText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5, // テキストとアイコンの間隔を設定
  },
  flatListContainer: {
    flexGrow: 1, // フラットリストが親コンテナいっぱいに広がるようにする
    marginTop: 5, // 上部に10のマージンを追加
    marginBottom: 5, // 下部に10のマージンを追加
  },
  actionsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  complete: {
    marginVertical: 10,
    alignItems: "center", // 中央揃えにする
  },
  actionItem: {
    flexDirection: "row",
    justifyContent: "space-between", // ボタン間のスペースを均等に配置する
    marginTop: 10, // 上部に余白を追加
    marginRight: 10,
    marginLeft: 10,
  },

  backspace: {
    position: "absolute",
    left: 30,
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 75,
    width: 75,
    borderRadius: 30,
    backgroundColor: "#2D3F45",
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
