import React from 'react';
import { useEffect } from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput} from 'react-native';
import {Audio} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filter from 'lodash.filter';

export  default function RecordingApp(){

    const [recording, setRecording] = React.useState();
  const [records, setRecords] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [fullData, setFullData] = React.useState();
  const [data, setData] = React.useState();

  const handleSearch = () =>{
    setSearchQuery();
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (record)=> {
      return contains (record, formattedQuery);
    });
    setData(filteredData);
  }

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
          <Button
  onPress={() => {
    if (recordingLine.sound && typeof recordingLine.sound.replayAsync === 'function') {
      recordingLine.sound.replayAsync();
    } else {
      console.error('Invalid sound object:', recordingLine.sound);
    }
  }}
  title="Play"
/>

          {/* <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button> */}
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
  
    return (
        <View style={styles.container}>
        <Text style={styles.heading}>Recording App</Text>
      <TextInput
           style={styles.input}
           onChangeText={(text) => setMessage(text)}
           //value={message}
           placeholder="Search recording"
           clearButtonMode='always'
           keyboardType="numeric"
         />
              <Button
    title="Search"
    color="orange"
    accessibilityLabel="Learn more about this purple button"
    onPress={() => handleSearch('button pressed')}
    
    />
       <Image
         source={require('@/assets/images/recording-icon.png')}
         style={{width:180, height:180, justifyContent: 'center', marginBottom:35}}
       />
       <Text>{getRecordingLines()}</Text>
       <Button style={styles.button} title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording}/>
       <Button title={records.length > 0? "Clear Recordings" : ''} onPress={clearRecordings} />
     </View>
      )
  }



const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: 'pink'
    },
    input:{
      borderRadius:5,
      borderColor:"black",
      color:"white",
      padding:8,
      marginBottom:45,
      backgroundColor: 'grey',
    },
    heading:{
      fontWeight:'700',
      textAlign:"center",
      fontStyle:'italic',
      lineHeight:30,
      fontSize:35,
      color:"1200FF",
      marginBottom:55
    },
    button:{
      borderRadius:29,
      marginTop:29
    },
    row:{
      flexDirection:"row",
      alignItems:'center',
      justifyContent:'center'
    },
    fill:{
      flex:1,
      margin:16
    }
  });
  