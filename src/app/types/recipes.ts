import Document from "mongoose";

export default interface Recipe extends Document {
  Recipe:any;
  _id:string;
  mealName: string;
  category: string;
  PreparationInstructions: string;
  ingredients: string[];
  isFavorite: boolean;
  image: string;
}

interface RecipeData {
  mealName: string;
  category: string;
  PreparationInstructions: string;
  ingredients: string[];
  isFavorite: boolean;
  image: string;
}

export type { Recipe, RecipeData };
