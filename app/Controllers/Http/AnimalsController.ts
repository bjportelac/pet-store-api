import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Animal from "App/Models/Animal";

export default class AnimalsController {
  public async createAnimal({ request, response }: HttpContextContract) {
    try {
      const dataAnimals = request.all();
      const existance = await Animal.query()
        .where({ codigo_animal: dataAnimals.codigo_animal })
        .count("*")
        .from("animals");
      const result = parseInt(existance[0]["count(*)"]);

      if (result === 0) {
        await Animal.create(dataAnimals);
        response.status(200).json({
          message: "Entity registered succesfully",
          code: `Code assigned ${dataAnimals.codigo_animal}`,
        });
      } else {
        console.log(response);
        response.status(400).json({
          message: "An inconvenience has ocurred, please check the code",
          code: `[Error]: ${response}`,
        });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({
        message: "Internal error in the server",
        code: `[Error]: ${error}`,
      });
    }
  }

  public async getAllAnimals({ response }: HttpContextContract) {
    try {
      const animals = await Animal.all();
      response
        .status(200)
        .json({ message: "Results have been found", entries: animals });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        message: "Internal error in the server",
        code: `[Error]: ${error}`,
      });
    }
  }

  public async getAnimalByAge({ response }: HttpContextContract) {
    try {
      const age = 8;
      const animals = await Animal.query().where("edad", "<=", `${age}`);
      response
        .status(200)
        .json({ message: "Results have been found", entries: animals });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        message: "Internal error in the server",
        code: `[Error]: ${error}`,
      });
    }
  }

  public async getAnimalBySpecies({ request, response }: HttpContextContract) {
    try {
      const species = request.param("animID")
      const animals = await Animal.query().where("especie", "=", `${species}%`);
      response
        .status(200)
        .json({ message: "Results have been found", entries: animals });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        message: "Internal error in the server",
        code: `[Error]: ${error}`,
      });
    }
  }

  public async updateAnimal({ request, response }: HttpContextContract) {
    try {
      const animID = request.param("animID");
      const animal = await Animal.findOrFail(animID);
      const dataAnimal = request.all();

      animal.nombre_animal = dataAnimal.nombre_animal;
      animal.especie = dataAnimal.especie;
      animal.raza = dataAnimal.raza;
      animal.genero = dataAnimal.genero;
      animal.edad = dataAnimal.edad;

      animal.save();
      response.status(200).json({
        message: "Entity updated succesfully",
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        message: "Internal error in the server",
        code: `[Error]: ${error}`,
      });
    }
  }

  public async deleteAnimal({ request, response }: HttpContextContract) {
    try {
      const animID = request.param("animID");
      await Animal.query().where("codigo_animal", animID).delete();
      response.status(204);
    } catch (error) {
      console.log(error);
      response.status(500).json({
        message: "Internal error in the server",
        code: `[Error]: ${error}`,
      });
    }
  }
}
