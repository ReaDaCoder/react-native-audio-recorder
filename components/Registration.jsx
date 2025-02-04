import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export default function Registration() {
  const [data, setData] = useState({ email: '', password: '' });
  // const auth = getAuth();

  const handleInput = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleSubmit = async () => {
    if (!data.email || !data.password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        Alert.alert('Success', `Welcome ${response.user.email}`);
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'This email is already in use.');
        } else if (err.code === 'auth/invalid-email') {
          Alert.alert('Error', 'Invalid email address.');
        } else {
          Alert.alert('Error', 'Something went wrong. Please try again.');
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={data.email}
        onChangeText={(value) => handleInput('email', value)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={data.password}
        onChangeText={(value) => handleInput('password', value)}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

// import React, {useState, useEffect} from 'react';
// import {app, database} from '../firebaseConfig';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
// //import { response } from 'express';

// export default function Registration(){
//   //const navigate = useNavigate();

//   let auth = getAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [data, setData] = useState("");

//   const handleInput = (event) => {
//     let newInput = {[event.target.name]: event.target.value};

//     setData({...data, ...newInput});
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
   
//     createUserWithEmailAndPassword(auth, data.email, data.password)
//     .then((response) =>{
//       console.log(response.user);
//     })
//     .catch((err) => {
//       alert(err.message);
//     })
   
//   };

//   return(
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           //value={user.email}
//           onChange={(event) => handleInput(event)}
//           required
//         /><br/>
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           //value={user.password}
//           onChange={(event) => handleInput(event)}
//           required
//         /><br/>
//         <button type="submit" onClick={handleSubmit}>Sign Up</button>
        
//       </form>
//     </>
//   )
// }
