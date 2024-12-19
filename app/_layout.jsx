import React from 'react';
import { useEffect } from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput} from 'react-native';
import {Audio} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filter from 'lodash.filter';
import RecordingApp from '../components/RecordingApp';
import Registration from '../components/Registration';

export default function RootLayout(){
  return(
    <> 
    <Registration/>
    <RecordingApp/>
    </>
  )
}


