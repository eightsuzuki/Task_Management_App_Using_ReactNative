import React, { useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Alert,
  Button,
  TouchableOpacity,
  ImageBackground,

} from "react-native";
import { useUser } from "../utils/UserContext";

import { ContributionGraph } from "react-native-chart-kit";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import { loadCommitData } from "../utils/CommitDataBase";

const chartConfig = {
  backgroundGradientFrom: "#D9D9D9",
  backgroundGradientTo: "#D9D9D9",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(11, 156, 49, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};
export default function AchievementScreen({ navigation }) {
  const { userId } = useUser();
  const [tasks, setTasks] = useState([]);



  const loadTasks = async () => {
    loadCompletedTasks(userId)
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };
  const [commits, setCommits] = useState([]);
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const now = new Date();
  const offsetMinutes = now.getTimezoneOffset();
  const nowInLocalTimezone = new Date(
    now.getTime() - offsetMinutes * 60 * 1000
  );
  const currentDate = nowInLocalTimezone.toISOString().slice(0, 10);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadCommits();
    });

    // ヘッダーにログアウトボタンを設定
    navigation.setOptions({
      headerTitle: "Routine Timer", // ヘッダーの真ん中のタイトルを"Routine Timer"に変更する
      headerTitleStyle: {
        fontSize: 24, // ヘッダータイトルのフォントサイズを大きくする
      },
      headerLeft: null, // 戻るボタンのタイトルを非表示にする
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

    return unsubscribe;
  }, [navigation]);

  const screenWidth = Dimensions.get("window").width;
  const tooltipDataAttrs = ({ value }) => {
    if (value >= 10) {
      return {
        fill: "green",
      };
    }
    return {};
  };

  const loadCommits = async () => {
    try {
      const commits = await loadCommitData(currentDate);
      setCommits(commits);
    } catch (error) {
      Alert.alert("Error loading Commits", error.message);
    }
  };
  return (
    <ImageBackground
    source={require("../../assets/timer.png")}
    style={styles.container}
    imageStyle={styles.backgroundImage}
  >
    <SafeAreaView style={styles.bushcontainer}>
      <ContributionGraph
        values={commits}
        endDate={nowInLocalTimezone}
        numDays={105}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        tooltipDataAttrs={tooltipDataAttrs}
      />
    </SafeAreaView>
    <TouchableOpacity
        style={styles.backspace}
        onPress={() => navigation.navigate("CompleteTaskList", { userId: userId })}
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

  container: {
    flex: 1,
    backgroundColor: "#B3B3B3",
  },
  bushcontainer: {
    marginTop: 80,
    backgroundColor: "#B3B3B3",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    resizeMode: "contain",
    width: "100%",
    height: "180%",
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
