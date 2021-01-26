import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert, ScrollView} from 'react-native';
import NumberContainer from './NumberContainer';
import Card from './Card';

// useRef allows you to create a variable that survives component rerenders
// useEffect allows you to run logic after every render cycle
const generateRandomBetween = (min, max, exclude) =>{
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max-min) + min);
  if(rndNum === exclude){
    return generateRandomBetween(min, max, exclude);
  }else{
    return rndNum;
  }
}

const renderListItem = (guess, numOfRound, index) =>{
  return(
    <View key={index} style={styles.listContainer}>
      <View style={styles.listBox}>
      <Text>#{numOfRound}</Text>
      <Text>{guess}</Text>
      </View>
    </View>
  )
}

const GameScreen = (props) =>{
  const initGuess = generateRandomBetween(1,100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initGuess);

  const [pastGuesses, setPassedGuesses] = useState([initGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver} = props;

  useEffect(()=>{
    if(currentGuess === userChoice){
      onGameOver(pastGuesses.length);
    }
  },[currentGuess, userChoice, onGameOver])

  const nextGuessHandler = (direction) => {
    if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
      console.log('Greater');
      Alert.alert('Dont Lie', 'This is wrong', [{text:'Sorry', style:'cancel'}]); 
      return;
    }
    if(direction === 'lower'){
      currentHigh.current = currentGuess;
    }else{
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds( curRounds => curRounds + 1);
    setPassedGuesses(curPastGuesses => [nextNumber , ...curPastGuesses])
  }

  return(
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer style={{flex: 1}}>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='LOWER' onPress={nextGuessHandler.bind(this,'lower')}/>
        <Button title='GREATER' onPress={nextGuessHandler.bind(this,'greater')}/>
      </Card>
      <View style={{height: '100%', width: '100%'}}>
      <ScrollView>
        {pastGuesses.map((guess,index) => renderListItem(guess,pastGuesses.length - index, index))}
      </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen:{
    padding:10,
    alignItems:'center',
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:20,
    width:300,
    maxWidth:'80%',
    padding:15,
  },
  listContainer:{
    backgroundColor:'white', 
    width:'80%',
    marginHorizontal:'10%',
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    elevation: 10,
    flex:1,
  },
  listBox:{
    borderColor:'black',
    marginVertical: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingHorizontal:10,
  }

})

export default GameScreen;