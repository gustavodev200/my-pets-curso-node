import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./AddPet.module.css";

import PetForm from "../../form/PetForm";

//hooks
import useFlashMessage from "../../../hooks/useFlashMessage";

const EditPet = () => {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        Authorization: `Bearer ${JSON.parse(token)}`,
      })
      .then((res) => {
        setPet(res.data.pet);
      });
  }, [token, id]);

  async function updatePet(pet) {
    let msgType = "success";

    const formData = new FormData();

    await Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append("images", pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    const data = await api
      .patch(`pets/${pet._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(response => {
          return response.data
      })
      .catch((error) => {
        msgType = "error";
        return error.response.data;
      });

      setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o Pet: {pet.name}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {pet.name && (
        <PetForm handleSubmit={updatePet} btnText="Atualizar" petData={pet} />
      )}
    </section>
  );
};

export default EditPet;
