const Pet = require("../models/Pet");

//helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObejectId = require("mongoose").Types.ObjectId;

module.exports = class PetController {
  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    const images = req.files;
    const available = true;

    //images upload

    //validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!age) {
      res.status(422).json({ message: "A idade é obrigatório!" });
      return;
    }

    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" });
      return;
    }

    if (!color) {
      res.status(422).json({ message: "A cor é obrigatório!" });
      return;
    }

    if (images.length === 0) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    }

    //get pet owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    //crete a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({
        message: "Pet criado com sucesso!",
        newPet,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt");

    res.status(200).json({ pets: pets });
  }

  static async getAllUserPets(req, res) {
    //get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

    res.status(200).json({ pets });
  }

  static async getAllUserAdoptions(req, res) {
    //get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");

    res.status(200).json({ pets });
  }

  static async getPetById(req, res) {
    const id = req.params.id;

    //check if id is valid
    if (!ObejectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    //check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
    }

    res.status(200).json({ pet: pet });
  }

  static async removePetById(req, res) {
    const id = req.params.id;

    //check if id is valid
    if (!ObejectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    //check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
    }

    //check if logged in user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({
          message:
            "Houve um problema em processar a sua solicitação, tente novamente mais tarde!",
        });
    }

    await Pet.findByIdAndRemove(id)

    res.status(200).json({message: "Pet removido com sucesso!"})
  }
};
