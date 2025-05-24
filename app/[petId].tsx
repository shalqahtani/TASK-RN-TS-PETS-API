import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import pets from "@/data/pets";
import { fetchPets } from "@/api/getPet";
import instance from "@/api";
import { deletePet } from "@/api/post";
interface Pet {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
}
const PetDetails = () => {
  const { petId } = useLocalSearchParams();

  // const pet = pets[0];

  const [pet, setPets] = useState<Pet>(pets[0]);

  const fetchPets = async () => {
    try {
      const response = await instance.get<Pet[]>("/pets");
      //alert("petId" + petId);
      // alert("response.data" + response.data);
      const mypet = response.data.filter((pet: any) =>
        pet.id.toString().includes(petId.toString())
      );
      //response.data.map((pet: any) => console.log("pet.id : ", pet.id));
      //alert("mypet" + mypet);
      setPets(mypet[0]);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <Text style={styles.description}> {pet.description}</Text>
      <Text style={styles.type}>Type: {pet.type}</Text>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => deletePet(pet.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
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
