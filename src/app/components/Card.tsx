"use client";
import React, { useState } from "react";
import Recipe from "@/app/types/recipes";
import ReadMore from "./ReadMore";
import Star from "./Star";
import { editRecipe } from "@/app/services/getRecipes";
import Image from "next/image";

interface CardProps {
  recipe: Recipe;
  isSelected: boolean;
  onClick: (recipe: Recipe) => void;
  setUpdate: (b: boolean) => void;
}

const Card: React.FC<CardProps> = ({
  recipe,
  isSelected,
  onClick,
  setUpdate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStarClick = async () => {
    console.log("aaa", recipe);
    try {
      const updatedRecipe: Recipe = {
        ...recipe,
        isFavorite: !recipe.isFavorite,
      };
      const data = await editRecipe(recipe._id, updatedRecipe);
      console.log("data", data);
      onClick(data.updatedTodo);
      setUpdate(true);
      console.log("Recipe updated successfully:", data);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="group flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-80">
      <div className="h-56 m-2.5 overflow-hidden text-white rounded-md">
        <Image
          width={320}
          height={224}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
          src={recipe.image}
          alt="card-image"
        />
      </div>

      <div className="p-4">
        <div className="flex h-26 justify-between items-center">
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">
            {recipe.mealName}
          </h6>

          <Star selected={recipe.isFavorite} onClick={handleStarClick} />
        </div>
        <h1 className="mb-2 text-slate-800 text-xl font-semibold">
          {recipe.category}
        </h1>
        <p className="text-slate-600 leading-normal font-light">
          {recipe.PreparationInstructions.slice(0, 100)}
        </p>
      </div>
      <div className="mt-auto px-4 pb-4 pt-0">
        {!isSelected && (
          <button
            onClick={() => setIsExpanded(true)}
            className="mt-auto rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Read more
          </button>
        )}
      </div>
      {isExpanded && (
        <ReadMore
          recipe={recipe}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          // setIsFavorite={setIsFavorite}
          isFavorite={recipe.isFavorite}
          handleStarClick={handleStarClick}
        />
      )}
    </div>
  );
};

export default Card;
