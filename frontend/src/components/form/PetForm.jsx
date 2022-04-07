import { useState } from "react";

import formStyles from "./Form.module.css";
import Input from "./Input";
import Select from "./Select";

const PetForm = ({ petData, btnText, handleSubmit }) => {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo"];

  const onFileChange = (e) => {};

  const handleChange = (e) => {};

  const handleColor = (e) => {};

  return (
    <form className={formStyles.form_container}>
      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnchange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnchange={handleChange}
        value={pet.name || ""}
      />
      <Input
        text="Idade do Pet"
        type="text"
        name="age"
        placeholder="Digite a idade"
        handleOnchange={handleChange}
        value={pet.age || ""}
      />

      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso"
        handleOnchange={handleChange}
        value={pet.weight || ""}
      />
      <Select
        name="color"
        text="Selecione a cor"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
};

export default PetForm;
