import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addUser } from '../utils/UserDatabase';

function SignInScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!username.trim() || !password) {
      Alert.alert('Invalid Input', 'Please enter both a username and a password.');
      return;
    }
    
    try {
      await addUser([username, password]);
      Alert.alert('Success', 'Account created successfully. Please log in.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Could not create account. The username may already exist.');
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={handleSignIn} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#D9D9D9",
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
  },
  buttonContainer: {
    backgroundColor: "#2D3F45", // ボタンの背景色を変更
    borderRadius: 24,
    overflow: "hidden",
  },
});

export default SignInScreen;
