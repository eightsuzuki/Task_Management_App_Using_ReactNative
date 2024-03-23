import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Octicons } from '@expo/vector-icons';

const TaskListItem = ({ styles, item, daysOfWeek, navigation, statusUpdate, deleteTask }) => {
  return (
    <View style={styles.taskItem}>
    <View>
      <View>
        <Text style={styles.taskText}>{item.name}</Text>
        <Text>Start Time</Text>
                <Text style={{ fontSize: 23 }}>{`${item.starttime}`}</Text>
                <Text>End Time</Text>
                <Text style={{ fontSize: 23 }}>{`${item.endtime}`}</Text>
        <Text>
          Repeat: {item.repeatday ? (
            <>
              {daysOfWeek
                .filter((day, index) => item.repeatday & (1 << index))
                .slice(0, 3)
                .join(', ')}
              {'\n'}
              {daysOfWeek
                .filter((day, index) => item.repeatday & (1 << index))
                .slice(3)
                .join(', ')}
            </>
          ) : (
            'No Repeat'
          )}
        </Text>
        <View style={styles.line}></View>
      </View>
      <View>
        <Text>Start Time</Text>
        <Text style={{ fontSize: 23 }}>{`${item.starttime}`}</Text>
        <Text>End Time</Text>
        <Text style={{ fontSize: 23 }}>{`${item.endtime}`}</Text>
        <Text>{`Repeat: ${
          item.repeat
            ? daysOfWeek
                .filter(
                  (day, index) =>
                    item.repeatDay && item.repeatDay[index]
                )
                .map((day, index) => daysOfWeek[index])
                .join("・")
            : "No Repeat"
        }`}</Text>
      </View>
    </View>
    <View style={styles.actionsContainer}>
      <View style={styles.complete}>
        <Switch
          value={item.status ? true : false}
          onValueChange={(newValue) => statusUpdate(newValue, item.id)}
        />
        <Text>Uncomplete</Text>
      </View>
      <View style={styles.actionItem}>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() =>
            navigation.navigate("TaskUpdate", { updateTaskId: item.id })
          }
        >
          <AntDesign name="edit" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => deleteTask(item.id)}
        >
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );
};


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

export default TaskListItem;
