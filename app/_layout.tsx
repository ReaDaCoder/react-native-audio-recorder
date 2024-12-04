import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });



  return (
   <SafeAreaView>
    
   </SafeAreaView>
  );
}
