import React from 'react';
import {View,Text, StyleSheet, Button, Image} from 'react-native';

const GameOverScreen = (props) =>{
  return(
  <View style = {styles.screen}>
    <Text>The Game is Over!</Text>
    <View style={styles.imageContainer}>
    <Image 
    style={styles.image} 
    resizeMode="cover"
    source={require('../assets/images/success.png')} 
    // source={{uri:"https://www.macmillandictionary.com/external/slideshow/thumb/142242_thumb.jpg"}} 
    />
    </View>
    <Text>Number of Rounds: {props.roundsNumber} </Text>
    <Text style={{marginVertical:5}}>Number Was: {props.userNumber}</Text>
    <Button title="NEW GAME" onPress={props.onRestart}/>
  </View>
  )
}

const styles = StyleSheet.create({
screen:{
  justifyContent:'center',
  alignItems:'center',
  height:'80%',
},
imageContainer:{
  width: 300,
  height:300,
  borderRadius: 140,
  borderWidth:3,
  borderColor:'black',
  overflow:'hidden',
  marginVertical: 20,
}
,
image:{
 width: '100%',
 height: '100%',
}
})

export default GameOverScreen;