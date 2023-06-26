import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Title from '../components/Title';

export default function Result({navigation, route}) {
  const {score} = route.params;
  // console.log(score);

  return (
    <View style={styles.container}>
      <Title titleText="RESULTS" />
      <View style={styles.bannerContainer}>
        <Text style={{fontSize: 20}}>Score</Text>
        <Text style={styles.score}>{score}</Text>
        {/* <Image
          source={require('../images/Thesis-rafiki.png')}
          style={styles.banner}
          resizeMode="contain"
        /> */}
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text style={{color: '#ffffff', fontWeight: '600', fontSize: 18}}>
            Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  banner: {
    height: 300,
    width: 300,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
  },
  button: {
    backgroundColor: '#0077b6',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  score: {
    fontSize: 100,
    fontWeight: '600',
  },
});
