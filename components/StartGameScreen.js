import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Card from './Card'
import colors from '../constants/colors';
import Input from './Input';
import NumberContiner from './NumberContainer';

const StartGameScreen = (props) =>{

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');

  const numberInputHandler = (inputText) =>{
   setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  }

  const resetInputHandler = () =>{
    setEnteredValue('');
    setConfirmed(false);
  }

  const confirmInputHandler = () =>{
    console.log(enteredValue)
    const chosenNumber = parseInt(enteredValue);
    console.log(chosenNumber);
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >99){
      Alert.alert("Invalid number!", "Number has to be between 1 and 99",
       [{text:'Okay', style:'destructive', onPress: resetInputHandler}]);
      return;
    }else{
      setConfirmed(true);
      setSelectedNumber(chosenNumber);
      setEnteredValue('');
      Keyboard.dismiss();
    }
  }

  let confirmedOutput;

  if(confirmed){
    confirmedOutput = 
    <Card style={styles.summeryContainer}>
    <Text>You selected</Text>
    <NumberContiner>{selectedNumber}</NumberContiner>
    <Button title="START GAME" onPress={()=>props.onStartGame(selectedNumber)}/>
    </Card>
  }

return (
  <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
  <View style={styles.screen}>
    <Text style={styles.title}>Start a New Game!</Text>
    <Card style={styles.inputContainer}>
      <Text>Select a Number</Text>
      <Input 
      style={styles.input} 
      autoCapitalize='none' 
      autoCorrect={false} 
      keyboardType='numeric' 
      maxLength={2}
      onChangeText={numberInputHandler} 
      value={enteredValue}/>

      <View style={styles.buttonContainer}>
        <View style={styles.button}><Button title="Reset" color={colors.primary} onPress={resetInputHandler}/></View>
        <View style={styles.button}><Button title="Confirm" color={colors.accent} onPress={confirmInputHandler}/></View>
      </View>
    </Card>
    {confirmedOutput}
  </View>
  </TouchableWithoutFeedback>
)
}

const styles = StyleSheet.create({
  screen:{
    padding:10,
    alignItems:'center',
  },
  title:{
    fontSize:20,
    marginVertical:10,
    fontWeight:'bold',
  },
  inputContainer:{
    width:300,
    maxWidth:'80%',
    alignItems:'center',
    paddingVertical:10,
  },
  buttonContainer:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    paddingHorizontal:15,
  },
  button:{
    minWidth:100,
  },
  input:{
    width:50,
    textAlign:'center',
  },
  summeryContainer:{
    marginTop:20,
    padding:20,
    alignItems: 'center',
  }
})

export default StartGameScreen;