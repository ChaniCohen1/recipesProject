import React, { useState } from "react";
import { RecipeData } from "@/app/types/recipes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface CardProps {
  recipe: RecipeData;
}

interface StarProps {
  selected: boolean;
  onClick: () => void;
}

const Star: React.FC<StarProps> = ({ selected, onClick }) => (
  <div className="relative inline-block">
    <FontAwesomeIcon
      icon={faStar}
      color={selected ? "gold" : "slate"}
      className="w-6 h-6"
      onClick={onClick}
    />
  </div>
);

const Card: React.FC<CardProps> = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleStarClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-80">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img
          className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
          src={recipe.image}
          alt="card-image"
        />
      </div>
      <div className="p-4">
        <div className="flex h-26 justify-between items-center">
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">
            {recipe.mealName}
          </h6>
          <Star selected={isFavorite} onClick={handleStarClick} />
        </div>
        <h1 className="mb-2 text-slate-800 text-xl font-semibold">
          {recipe.category}
        </h1>
        <p className="text-slate-600 leading-normal font-light">
          {recipe.PreparationInstructions}
        </p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-2">
        <button
          className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default Card;
