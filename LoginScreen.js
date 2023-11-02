import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import background from "../assets/background.png";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts, Montserrat_800ExtraBold, Montserrat_700Bold, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import firestore from "../db/firestore";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      // Get the user's data from Firestore
      firestore.collection('staff').doc(user.uid).get().then((doc) => {
        const userData = doc.data();

        // If the user has a profile in the staff collection, then they are staff
        if (userData) {
          navigation.navigate("StaffHomescreen");
        } else {
          // If the user does not have a profile in the staff collection, then they are a patient
          navigation.navigate("PatientHomescreen");
        }
      });
    }).catch((error) => {
      alert(error.message);
    });
  };

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_800ExtraBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={background}
        style={styles.backgroundImage}
      />
      <View style={styles.logo}>
        <FontAwesome5 name="heartbeat" size={200} color="#FFFFFF" />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Enter your email"
          style={styles.textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Enter your password"
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity><Text style={styles.forgottenPaswwordText}>Forgotten password?</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -400,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logo: {
    width: 220,
    height: 195,
    paddingLeft: 10,
    marginTop: 250,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.25,
  },
  logoText: {
    fontSize: 35,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Montserrat_800ExtraBold',
  },
  coloredLogoText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#E05ACB',
    paddingLeft: -15,
    fontFamily: 'Montserrat_700Bold',
    paddingBottom: 50,
  },
  headingLogo: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
  },
  textInput: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginBottom: 20, 
    fontSize: 18,
    fontFamily: 'Montserrat_400Regular',
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 380,
  },
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'center', 


  },

  loginButton: {
    marginTop: 50,
    marginBottom: 24,
    paddingVertical: 10,
    paddingHorizontal: 80,
    backgroundColor: '#E05ACB',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
  },
  forgottenPaswwordText: {
    fontFamily: 'Montserrat_400Regular'
  },
});


