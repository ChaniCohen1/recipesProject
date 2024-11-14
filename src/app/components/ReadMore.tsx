"use client";
import React from "react";
import Recipe from "@/app/types/recipes";
import Star from "./Star";

interface CardProps {
  recipe: Recipe;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  isFavorite: boolean;
  handleStarClick: () => void;
}

const ReadMore: React.FC<CardProps> = ({
  recipe,
  isExpanded,
  setIsExpanded,
  isFavorite,
  handleStarClick,
}) => {
  const handleCloseClick = () => {
    setIsExpanded(false);
  };

  return (
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ease-out ${
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={handleCloseClick}
        ></div>

        <div
          className={`absolute top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transition-transform duration-500 ease-out transform overflow-y-auto ${
            isExpanded ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 space-y-4">
            <button
              onClick={handleCloseClick}
              className="text-slate-800 text-lg font-bold mb-4 p-2 hover:text-slate-500 transition-colors"
            >
              ✕
            </button>

            <div className="flex">
              <img
                className="w-1/2 h-32 rounded-md object-cover mr-4 shadow-sm"
                src={recipe.image}
                alt="card-image"
              />
              <div>
                <h6 className="text-slate-800 text-xl font-semibold">
                  {recipe.mealName}
                </h6>
                <div className="flex items-center mt-2 justify-between">
                  <span className="text-slate-700 text-sm font-medium mr-2">
                    {recipe.category}
                  </span>
                  <Star selected={isFavorite} onClick={handleStarClick} />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-slate-800 text-lg font-semibold">
                Ingredients:
              </h3>
              <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-slate-600 text-sm font-light">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-slate-800 text-lg font-semibold">
                Preparation:
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm font-light mt-2">
                {recipe.PreparationInstructions}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ReadMore;
