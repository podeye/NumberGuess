import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './components/StartGameScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen'

export default function App() {
  
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  const configNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) =>{
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = (numberOfRounds) =>{
    setGuessRounds(numberOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if(userNumber && guessRounds <= 0 ){
    content = <GameScreen userChoice = {userNumber} onGameOver={gameOverHandler}/>;
  }else if(guessRounds>0){
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configNewGameHandler}/>
  }

  return (
    <View style={styles.container}>
        <Header title="Guess A Number"/>
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
 screen:{
  flex:1,
 }
});
