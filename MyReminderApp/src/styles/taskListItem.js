import React from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";

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
          <Text style={{ fontSize: 18 }}>Start Time</Text>
          <Text style={{ fontSize: 28 }}>{`${item.starttime}`}</Text>
          <Text style={{ fontSize: 18 }}>End Time</Text>
          <Text style={{ fontSize: 28 }}>{`${item.endtime}`}</Text>
          <Text style={{ fontSize: 18 }}>{`Repeat: ${
            item.repeat
              ? daysOfWeek
                  .filter(
                    (day, index) => item.repeatDay && item.repeatDay[index]
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
          <Text>{item.status ? "Completed" : "Incomplete"}</Text>
        </View>
        <View>
          <Text> </Text>
        </View>
        <View>
          <Text> </Text>
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
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default TaskListItem;
