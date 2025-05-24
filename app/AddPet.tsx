import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { addPet } from "@/api/post";

const AddPet = () => {
  interface PetInfo {
    name: string;
    image: string;
    type: string;
    adopted: number;
  }
  const [petname, setPetName] = useState("");
  const [petimage, setPetImage] = useState("");
  const [pettype, setPetType] = useState("");
  const getPetObj = () => {
    return {
      name: petname,
      image: petimage,
      type: pettype,
      adopted: 0,
    };
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Pet! </Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={petname}
        onChangeText={setPetName}
      />
      <TextInput placeholder="Description" style={styles.input} id="desc" />
      <TextInput
        placeholder="Type"
        style={styles.input}
        value={pettype}
        onChangeText={setPetType}
      />
      <TextInput
        placeholder="Image"
        style={styles.input}
        value={petimage}
        onChangeText={setPetImage}
      />
      <TextInput placeholder="Adopted" style={styles.input} id="adopted" />

      <TouchableOpacity
        style={styles.button}
        onPress={() => addPet(getPetObj())}
      >
        <Text style={styles.buttonText}>Add Pet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
