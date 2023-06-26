import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';

const suffleOption = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

export default function Quiz({navigation}) {
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);

  const getQuiz = async () => {
    const url =
      'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const handleNextQuestion = () => {
    setQues(ques + 1);
    setOptions(generateOptionsAndShuffle(questions[ques + 1]));
  };

  const generateOptionsAndShuffle = sawal => {
    const optionsArr = [...sawal.incorrect_answers];
    optionsArr.push(sawal.correct_answer);
    // console.log(optionsArr);
    suffleOption(optionsArr);
    return optionsArr;
  };

  const handleSelectedOption = selected => {
    // console.log(selected === questions[ques].correct_answer);
    if (selected === questions[ques].correct_answer) {
      setScore(score + 10);
    }
    if (ques !== 9) {
      setQues(ques + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
    }
    if (ques === 9) {
      handleShowResult();
    }
  };

  const handleShowResult = () => {
    navigation.navigate('Result', {score});
  };

  return (
    <View style={styles.container}>
      {questions.length > 0 && (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            Q{ques + 1}. {decodeURIComponent(questions[ques].question)}
          </Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleSelectedOption(options[0])}>
              <Text style={styles.option}>
                {decodeURIComponent(options[0])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleSelectedOption(options[1])}>
              <Text style={styles.option}>
                {decodeURIComponent(options[1])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleSelectedOption(options[2])}>
              <Text style={styles.option}>
                {decodeURIComponent(options[2])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleSelectedOption(options[3])}>
              <Text style={styles.option}>
                {decodeURIComponent(options[3])}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Prev</Text>
            </TouchableOpacity> */}
            {ques !== questions.length - 1 && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleNextQuestion}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
            {ques === questions.length - 1 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleShowResult()}>
                <Text style={styles.buttonText}>Show Results</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 12,
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#0077b6',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#00b4d8',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  questionContainer: {
    height: '100%',
  },
});
