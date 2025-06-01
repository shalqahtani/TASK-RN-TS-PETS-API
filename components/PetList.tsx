import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import pets from "@/data/pets";
import PetItem from "./PetItem";
import instance from "@/api";
import { useQuery } from "@tanstack/react-query";

const PetList = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const [displayPets, setDisplayPets] = useState<Pet[]>([]);
  interface Pet {
    id: number;
    name: string;
    description: string;
    type: string;
    image: string;
  }

  const fetchPets = async () => {
    try {
      const response = await instance.get<Pet[]>("/pets");
      const allPets = response.data;
      setDisplayPets(allPets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["getPets"],
    queryFn: fetchPets,
  });

  const petList = displayPets
    .filter((pet: any) => pet.name.toLowerCase().includes(search.toLowerCase()))
    .filter((pet: any) => pet.type.toLowerCase().includes(type.toLowerCase()))
    .map((pet: any) => (
      <PetItem
        pet={pet}
        setDisplayPets={setDisplayPets}
        displayPets={displayPets}
      />
    ));

  if (isFetching) return <Text>Loading...</Text>;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={(value) => setSearch(value)}
      />
      {/* Filter by type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("")}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Cat")}
        >
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Dog")}
        >
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Rabbit")}
        >
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Pet List */}
      {petList}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
