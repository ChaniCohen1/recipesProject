"use client";
import { Recipe } from "@/app/types/recipes";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecipes } from "@/app/services/getRecipes";
import { SearchIcon } from "@heroicons/react/outline";

const SelectArray = [
  "salads",
  "desserts",
  "pastries",
  "meats",
  "sidedishes",
  "other",
];

interface HeaderProps {
  setFiltered: (id: Recipe[]) => void;
}

const Header: React.FC<HeaderProps> = ({ setFiltered }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [isFavoriteChosen, setIsFavoriteChosen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getAllRecipes = async () => {
      const allRecipes: Recipe[] = await getRecipes();
      setRecipes(allRecipes);
    };
    getAllRecipes();
  }, []);

  useEffect(() => {
    const filteredRecipes = recipes
      .filter((recipe) => {
        const matchesCategory =
          selectedCategory === "" || recipe.category === selectedCategory;
        const matchesSearch = recipe.mealName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.mealName.localeCompare(b.mealName));

    setFiltered(filteredRecipes);
  }, [recipes, selectedCategory, searchQuery, setFiltered]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const allRecipesButtonClass = `px-4 w-[120px] z-1 py-2 p-5 ${
    isFavoriteChosen
      ? "border-b-2 border-purple-500"
      : "border-b-2 border-black"
  }`;

  const favoritesButtonClass = `px-4 w-[120px] z-1 py-2 p-5 ${
    !isFavoriteChosen
      ? "border-b-2 border-purple-500"
      : "border-b-2 border-purple-800"
  }`;

  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-200 pt-6 pr-6 pl-6 shadow-lg text-white flex flex-col h-[200px]">
      <div className="text-3xl font-semibold text-center mb-6">Recipes</div>

      <div className="flex justify-between items-center mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-lg w-1/4 bg-white text-black shadow-sm"
        >
          <option value="">Pick a category</option>
          {SelectArray.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search"
              className="border p-2 rounded-lg w-64 bg-white text-black shadow-sm"
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
          <button
            onClick={() => router.push("/pages/addCard")}
            className="bg-purple-400 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-500"
          >
            Add Recipe
          </button>
        </div>
      </div>

      <div className="flex w-[264px] mt-auto space-x-6 border-b-2 border-b-black">
        <button
          onClick={() => {
            setIsFavoriteChosen(!isFavoriteChosen );
            setFiltered(recipes);
          }}
          className={allRecipesButtonClass}
        >
          All Recipes
        </button>
        <button
          onClick={() => {
            setIsFavoriteChosen(!isFavoriteChosen);
            setFiltered(recipes.filter((rec) => rec.isFavorite === true));
          }}
          className={favoritesButtonClass}
        >
          Favorites
        </button>
      </div>
    </div>

  );
};

export default Header;
