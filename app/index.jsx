import { StyleSheet, TextInput, Button, View, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export default function HomeScreen() {
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
