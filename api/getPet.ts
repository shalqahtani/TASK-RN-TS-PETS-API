import { useEffect } from "react";
import instance from ".";

export interface Pet {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
}
export const fetchPets = async () => {
  try {
    const response = await instance.get<Pet[]>("/pets");
    const allPets = response.data;
    return allPets;
    //setDisplayPets(allPets);
  } catch (error) {
    console.error("Error fetching pets:", error);
  } finally {
  }
};

useEffect(() => {
  fetchPets();
}, []);
