
import React from "react";
import { View, Button, StyleSheet, ImageBackground, Text } from "react-native";

function TitleScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/timer.png")}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.innerOverlay}>
          <Text style={styles.title}>Routine Timer</Text>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <Button
                title="Sign In"
                onPress={() => navigation.navigate("SignIn")}
                                color="#000000"
                fontWeight="bold"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
                color="#000000"
                fontWeight="bold"
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.5,
  },
  backgroundImage: {
    resizeMode: "contain",
    width: "100%",
    height: "180%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerOverlay: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#D9D9D9",
    textAlign: "center",
  },
  buttonsContainer: {
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "#D9D9D9", 
    borderRadius: 24,
    overflow: "hidden",

  },
});

export default TitleScreen;
