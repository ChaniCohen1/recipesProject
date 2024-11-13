"use client";
import Card from "@/app/components/Card";
import React, { useEffect, useState } from "react";
import Recipe from "@/app/types/recipes";
import { getRecipes } from "@/app/services/getRecipes";

const CardList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {recipes.map((recipe, index) => (
        <Card key={index} recipe={recipe} isSelected={false}/>
      ))}
    </div>
  );
};

export default CardList;
