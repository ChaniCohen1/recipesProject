"use client";
import Card from "@/app/components/Card";
import React, { useEffect, useState } from "react";
import { RecipeData } from "@/app/types/recipes";

const CardList = () => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);

  useEffect(() => {
    const newRecipe: RecipeData = {
      mealName: "mealName",
      category: "category",
      PreparationInstructions: "PreparationInstructions",
      ingredients: ["ingredients1", "ingredients2"],
      isFavorite: true,
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/07/ratatouille.jpg",
    };
    setRecipes([...recipes, newRecipe]);
  }, []);

  return (
    <div>
      {recipes.map((recipe, index) => (
        <Card key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default CardList;
