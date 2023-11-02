import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import background from "../assets/background.png";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts, Montserrat_800ExtraBold, Montserrat_700Bold, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import firestore from "../db/firestore";

export default function SignupScreen() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupPress = () => {
    // Create a new user in Firestore
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      // Check if the user's email address contains healthease.net
      if (email.includes('@healthease.net')) {
        // The user is staff
        firestore.collection('staff').doc(user.uid).set({
          firstName,
          lastName,
          email,
        }).then(() => {
          // Redirect the user to the StaffHomescreen
          navigation.navigate("StaffHomescreen");
        }).catch((error) => {
          alert(error.message);
        });
      } else {
        // The user is a patient
        firestore.collection('patients').doc(user.uid).set({
          firstName,
          lastName,
          email,
        }).then(() => {
          // Redirect the user to the PatientHomescreen
          navigation.navigate("PatientHomescreen");
        }).catch((error) => {
          alert(error.message);
        });
      }
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
          placeholder="Enter your first name"
          style={styles.textInput}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          placeholder="Enter your last name"
          style={styles.textInput}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          placeholder="Enter your email address"
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
      <TouchableOpacity style={styles.loginButton} onPress={handleSignupPress}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.colouredLoginText} onPress={() => navigation.navigate("Login")}> Login</Text>
        </TouchableOpacity>
      </View>

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
    marginTop: 400,
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
  loginTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  
  loginText: {
marginTop: -10,
    fontFamily: 'Montserrat_400Regular'
  },
  colouredLoginText: 
  {marginTop: -10,
    color: '#E05ACB',
  },
});
