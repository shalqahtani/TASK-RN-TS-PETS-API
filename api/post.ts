import instance from ".";
interface PetInfo {
  name: string;
  image: string;
  type: string;
  adopted: number;
}

const addPet = async (petInfo: PetInfo) => {
  const { data } = await instance.post("/pets", petInfo);
  //alert("data added : " + data);
  return data;
};

const deletePet = async (petId: any) => {
  const { data } = await instance.post(`/pets/${petId}`);
  alert("data deleted : " + data);
  return data;
};

export { addPet, deletePet };
