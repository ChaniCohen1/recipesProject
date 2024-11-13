import Document from "mongoose";

export default interface Recipe extends Document {
  _id:string;
  mealName: string;
  category: string;
  PreparationInstructions: string;
  ingredients: string[];
  isFavorite: boolean;
  image: string;
}

