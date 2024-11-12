import mongoose, { Model, Schema } from "mongoose";
import IRecipe from "@/app/types/recipes";

const recipeSchema: Schema<IRecipe> = new Schema({
  mealName: { type: String, required: true },
  category: { type: String, required: true },
  PreparationInstructions: { type: String, required: true },
  ingredients: { type:[String], required: true },
  isFavorite: { type: Boolean, required: true },
  image: { type: String, required: true },
});

const Recipe: Model<IRecipe> =
  mongoose.models.recipe || mongoose.model("recipe", recipeSchema);

export default Recipe;
