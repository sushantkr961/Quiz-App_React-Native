import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import Home from './screens/Home';
// import Quiz from './screens/Quiz';
// import Result from './screens/Result';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './navigation';

function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({});

export default App;
