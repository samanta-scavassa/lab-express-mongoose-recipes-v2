const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect(MONGODB_URI)
  .then((connection) =>
    console.log("Connected to Database: ", connection.connections[0].name)
  )
  .catch((error) => console.error("Error connecting to database: ", error));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
app.post("/recipes", (req, res) => {
  Recipe.create(req.body)
    .then((createdRecipe) => {
      console.log("Recipe created: ", createdRecipe);
      res.status(200).send(createdRecipe);
    })
    .catch((error) => {
      console.error("Failed to create recipe: ", error);
      res.status(500).send({ error: "Failed to create recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      console.log("Recipes: ", allRecipes);
      res.status(200).json(allRecipes);
    })
    .catch((error) => {
      console.error("Error retrieving recipes: ", error);
      res.status(500).send({ error: "Failed to retrieve recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;
  Recipe.findById(recipeId)
    .then((recipe) => {
      console.log("Recipes: ", recipe);
      res.status(200).send(recipe);
    })
    .catch((error) => {
      console.error("Error retrieving recipe: ", error);
      res.status(500).send({ error: "Failed to retrieve recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
  .then(updatedRecipe => {
    console.log("Recipe updated: ", updatedRecipe);
    res.status(200).send(updatedRecipe);
  }).catch(error => {
    console.error("Failed to update recipe: ", error);
    res.status(500).send({error: "Failed to update recipe"});
  });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    const recipeId = req.params.id;
  
    Recipe.findByIdAndDelete(recipeId)
    .then(result => {
      console.log("Recipe deleted!");
      res.status(204).send();
    }).catch(error => {
      console.error("Failed to delete recipe: ", error);
      res.status(500).send({error: "Failed to delete recipe"});
    });
  });

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
