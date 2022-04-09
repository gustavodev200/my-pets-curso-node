import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../../utils/api";

import RoundedImage from "../../layout/RoundedImage";

//hooks
import useFlashMessage from "../../../hooks/useFlashMessage";

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((res) => {
        setPets(res.data.pets);
      });
  }, [token]);

  return (
    <section>
      <div>
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      <div>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet.id}>
              <RoundedImage
                src={URL.createObjectURL(image)}
                alt={pet.name}
                width="75px"
              />
            </div>
          ))}
        {pets.length === 0 && <p>Não há Pets cadastrados</p>}
      </div>
    </section>
  );
};

export default MyPets;
