import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
//import Sound from 'react-native-sound';

export default function RootLayout() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const audioFile = 'your-audio-file.mp3';

  const playAudio = () => {
    const soundInstance = new Sound(audioFile, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Error loading audio:', error);
        return;
      }
      soundInstance.play(() => {
        soundInstance.release();
        setIsPlaying(false);
      });
    });
    setSound(soundInstance);
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    if (sound) {
      sound.pause(() => {
        setIsPlaying(false);
      });
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <SafeAreaView>
      <Text>Hello world</Text>
      <View>
        <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
      </View>
    </SafeAreaView>
  );
}

