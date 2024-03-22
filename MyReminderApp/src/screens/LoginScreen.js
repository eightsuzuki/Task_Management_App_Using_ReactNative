import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useUser } from '../utils/UserContext';
import { loadUserByUsername, loadUserById } from '../utils/UserDatabase';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId } = useUser();

  const handleLogin = async () => {
    try {
      const users = await loadUserByUsername(username);
      if (users.length > 0 && users[0].password === password) {
        const userDetails = await loadUserById(users[0].id);
        setUserId(userDetails[0].id);
        navigation.navigate('Home');
      } else {
        Alert.alert('Invalid Login', 'The username or password you entered is incorrect.');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'An error occurred during login. Please try again.');
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
        <Button title="Login" onPress={handleLogin} color="white" />
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
    backgroundColor: "#2D3F45", // ボタンの背景色を白に設定
    borderRadius: 24,
    overflow: "hidden",
  },
});

export default LoginScreen;
