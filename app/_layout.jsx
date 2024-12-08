import React from 'react';
import { useEffect } from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {Audio} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout(){
  const [recording, setRecording] = React.useState();
  const [records, setRecords] = React.useState([]);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecording: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      }
    } catch (error) {
      console.error("Error while recording:", error);
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('records')
      .then((storedRecords) => {
        if (storedRecords) {
          setRecords(JSON.parse(storedRecords)); 
        }
      })
      .catch((error) => console.error('Error loading records:', error));
  }, []);

  async function stopRecording(){
    setRecording(undefined);

  await recording.stopAndUnloadAsync();
  const { sound, status } = await recording.createNewLoadedSoundAsync();
  

  const newRecord = {
    sound: sound,
    duration: getDuration(status.durationMillis),
    file: recording.getURI(),
  };

  setRecords((prevRecords) => {
    const updatedRecords = [...prevRecords, newRecord];

    // Save to local storage
    AsyncStorage.setItem('records', JSON.stringify(updatedRecords))
      .then(() => console.log('Records saved successfully!'))
      .catch((error) => console.error('Error saving records:', error));

    return updatedRecords;
  });
    
  }

   function getDuration(miliseconds) {
    const minutes = miliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10? `${Math.floor(minutes)} :0${seconds}` : `${Math.floor(minutes)}`;
  }

  function getRecordingLines(){
    return records.map((recordingLine, index) => {
      return(
          <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording #{index + 1} | 
            {recordingLine.duration}
          </Text>
          <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        </View>
      )
    })
  }

  function clearRecordings(){
    setRecords([]);
    AsyncStorage.removeItem('records')
    .then(() => console.log('Records cleared successfully!'))
    .catch((error) => console.error('Error clearing records:', error));
  }


  return(
    <View style={styles.container}>
      <Text style={styles.heading}>Recording App</Text>
      <Image
        source={require('@/assets/images/recording-icon.png')}
        style={{width:200, height:200, justifyContent: 'center',}}
      />
      <Text>{getRecordingLines()}</Text>
      <Button style={styles.button} title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording}/>
      <Button title={records.length > 0? "Clear Recordings" : ''} onPress={clearRecordings} />
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'pink'
  },
  heading:{
    fontWeight:'700',
    textAlign:"center",
    fontStyle:'italic',
    lineHeight:30,
    fontSize:35,
    color:"1200FF",
    marginBottom:35
  },
  button:{
    borderRadius:29,
    marginTop:29
  }
});
