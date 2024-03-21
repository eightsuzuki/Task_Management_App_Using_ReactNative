import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

function TitleScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TitleScreen;
