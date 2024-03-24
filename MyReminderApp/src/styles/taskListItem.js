import React from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // getMonth()は0から始まるため、+1する
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${month}/${day} ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};

const TaskListItem = ({
  styles,
  item,
  daysOfWeek,
  navigation,
  statusUpdate,
  deleteTask,
}) => {
  return (
    <View style={styles.taskItem}>
      <View>
        <View>
          <Text style={{ fontSize: 33 }}>
            {"  "}
            {item.name || "未設定"}
          </Text>
          <View style={styles.line}></View>
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 18, marginRight: 5 }}>Start Time </Text>
            <Text style={{ fontSize: 28 }}>{formatDate(item.starttime)}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 18, marginRight: 5 }}>End Time   </Text>
            <Text style={{ fontSize: 28 }}>{formatDate(item.endtime)}</Text>
          </View>
          <Text style={{ fontSize: 20 }}>
            Repeat:{" "}
            {item.repeatday ? (
              <>
                {daysOfWeek
                  .filter((day, index) => item.repeatday & (1 << index))
                  .slice(0, 3)
                  .join(", ")}
                {"\n"}
                {daysOfWeek
                  .filter((day, index) => item.repeatday & (1 << index))
                  .slice(3)
                  .join(", ")}
              </>
            ) : (
              "No Repeat"
            )}
          </Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <View>
          {item.label === 1 ? (
            <Text style={{ fontSize: 25 }}>routine</Text>
          ) : null}
          {item.label === 2 ? (
            <Text style={{ fontSize: 25 }}>emergency</Text>
          ) : null}
          {item.label === 0 ? <Text style={{ fontSize: 25 }}> </Text> : null}
        </View>

        <View style={styles.complete}>
          <Switch
            value={item.status ? true : false}
            onValueChange={(newValue) => statusUpdate(newValue, item.id)}
          />
          <Text>{item.status ? "Completed" : "Incomplete"}</Text>
        </View>
        <View style={styles.actionItem}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() =>
              navigation.navigate("TaskUpdate", { updateTaskId: item.id })
            }
          >
            <AntDesign name="edit" size={30} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => deleteTask(item.id)}
          >
            <AntDesign name="delete" size={30} color="red" />
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
  },  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 10, // 左右の余白を設定します
    paddingVertical: 10, // 上下の余白を設定します
    marginVertical: 0,
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
  flatListContainer: {
    flexGrow: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  actionsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  actionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
  },
});

export default TaskListItem;
