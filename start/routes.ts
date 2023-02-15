/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/register_pet", "AnimalsController.createAnimal");
  
  Route.get("/list_all", "AnimalsController.getAllAnimals");
  Route.get("/under_eight", "AnimalsController.getAnimalByAge");
  Route.get("/filter_by_species/:animID", "AnimalsController.getAnimalBySpecies");
  
  Route.put("/update_pet/:animID", "AnimalsController.updateAnimal");
  
  Route.delete("/delete_pet/:animID", "AnimalsController.deleteAnimal");
}).prefix("/pets");
