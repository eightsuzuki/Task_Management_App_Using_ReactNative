import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    line: {
      borderBottomColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 10, // 線とテキストの間に余白を設定します
    },
    container: {
      flex: 1,
      backgroundColor: "#B3B3B3",
      opacity: 1,
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
      padding: 20,
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
      fontSize: 25,
      fontboldWeight: "bold",
    },
    addButton: {
      position: "absolute",
      right: 30,
      bottom: 30,
      alignItems: "center",
      justifyContent: "center",
      height: 85, 
      width: 85, 
      borderRadius: 60, 
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
  
    taskList: {
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
      height: 60,
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
      marginLeft: 5, // テキストとアイコンの間隔を設定
    },
    flatListContainer: {
      flexGrow: 1, // フラットリストが親コンテナいっぱいに広がるようにする
      marginTop: 10, // 上部に10のマージンを追加
      marginBottom: 10, // 下部に10のマージンを追加
    },
    taskItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      padding: 20,
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
  });