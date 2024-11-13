import mongoose, { Model, Schema } from "mongoose";
import Recipe from "@/app/types/recipes";

const recipeSchema: Schema<Recipe> = new Schema({
  mealName: { type: String, required: true },
  category: { type: String, required: true },
  PreparationInstructions: { type: String, required: true },
  ingredients: { type: [String], required: true },
  isFavorite: { type: Boolean, required: true },
  image: { type: String, required: true },
});

const Recipe: Model<Recipe> =
  mongoose.models.recipe || mongoose.model("recipe", recipeSchema);

export default Recipe;
