import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {Audio} from 'expo-av';
//import LinearGradient from 'react-native-linear-gradient';

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

  async function stopRecording(){
    setRecording(undefined);

  await recording.stopAndUnloadAsync();
  const { sound, status } = await recording.createNewLoadedSoundAsync();
  
  setRecords((prevRecords) => [
    ...prevRecords,
    {
      sound: sound,
      duration: getDuration(status.durationMillis),
      file: recording.getURI(),
    },
  ]);
    
    // setRecording(undefined);

    // await recording.stopAndUnloadAsync();
    // let allowsRecording = [];  //{...records};
    // const {sound, starus} = await recording.createNewLoadedSoundAsync();
    // allowsRecording.push({
    //   sound: sound,
    //   duration: getDuration(status.durationMillis),
    //   file: recording.getURI()
    // });
    //setRecords(allowsRecording);
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


// import { useEffect, useState } from 'react';
// import { Text, View, Button,StyleSheet } from 'react-native';
// import 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAudioRecorder,useAudioPlayer, RecordingOptions, AudioModule, RecordingPresets } from 'expo-audio';

// export default function RootLayout() {
//   const [audioSource, setAudioSource] = useState(null);
//   const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

//  // const record = () => audioRecorder.record();

//  const record = async () => {
//   try {
//     // Prepare the recorder before starting
//     await audioRecorder.prepareToRecordAsync();
//     audioRecorder.record();
//   } catch (error) {
//     console.error('Error preparing to record:', error);
//   }
// };

//   const player = useAudioPlayer(audioSource);

//   const stopRecording = async () => {
//     //await audioRecorder.stop();
//     try {
//       await audioRecorder.stop();
//       setAudioSource(audioRecorder.uri); // Set the recorded audio URI
//     } catch (error) {
//       console.error('Error stopping the recording:', error);
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       const status = await AudioModule.requestRecordingPermissionsAsync();
//       if (!status.granted) {
//         Alert.alert('Permission to access microphone was denied');
//       }
//     })();
//   }, []);

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//       <Button
//         title={audioRecorder.isRecording ? 'Stop Recording' : 'Start Recording'}
//         onPress={audioRecorder.isRecording ? stopRecording : record}
//       />
//       </View>
//       <View style={styles.container}>
//       <Button title="Play Sound" onPress={() => player.play()} />
//     </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 10,
//   },
// });

