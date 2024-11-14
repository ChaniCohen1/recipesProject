"use client"; 
import Recipe from "@/app/types/recipes";
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
  update: boolean;
  setUpdate: (b: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setFiltered, update, setUpdate }) => {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isFavoriteChosen, setIsFavoriteChosen] = useState<boolean | null>(null); // Set initial state as null
  const router = useRouter();

  // Load favorite status from localStorage, but only on the client side
  useEffect(() => {
    const status = localStorage.getItem("cardsStatusFavorite");
    if (status) {
      setIsFavoriteChosen(status === "favorite");
    } else {
      setIsFavoriteChosen(false); // Default to 'all' recipes if no value is found
    }
  }, []); // This useEffect will run only once when the component is mounted on the client side.

  useEffect(() => {
    const getAllRecipes = async () => {
      const allRecipes: Recipe[] = await getRecipes();
      setRecipes(allRecipes);
      setUpdate(false);
    };
    getAllRecipes();
  }, [setUpdate, update]);

  useEffect(() => {
    setSearchQuery("");
    setSelectedCategory("");
  }, [isFavoriteChosen]);

  useEffect(() => {
    if (isFavoriteChosen !== null) { // Only filter if we have a value for isFavoriteChosen
      const recipesToFilter = isFavoriteChosen
        ? recipes.filter((rec) => rec.isFavorite === true)
        : recipes;

      const filteredRecipes = recipesToFilter
        .filter((recipe) => {
          const matchesCategory =
            selectedCategory === "" || recipe.category === selectedCategory;
          const matchesSearch =
            searchQuery === "" ||
            recipe.mealName.toLowerCase().includes(searchQuery.toLowerCase());

          return matchesCategory && matchesSearch;
        })
        .sort((a, b) => a.mealName.localeCompare(b.mealName));

      setFiltered(filteredRecipes);
    }
  }, [recipes, selectedCategory, searchQuery, setFiltered, isFavoriteChosen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const allRecipesButtonClass = `px-4 w-[120px] z-1 py-2 p-5 ${
    isFavoriteChosen === false ? "border-b-4 border-purple-800" : ""
  }`;

  const favoritesButtonClass = `px-4 w-[120px] z-1 py-2 p-5 ${
    isFavoriteChosen === true ? "border-b-4 border-purple-800" : ""
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

      <div className="flex w-[264px] mt-auto space-x-6">
        <button
          onClick={() => {
            localStorage.setItem("cardsStatusFavorite", "all");
            setIsFavoriteChosen(false);
            setFiltered(recipes);
          }}
          className={allRecipesButtonClass}
        >
          All Recipes
        </button>
        <button
          onClick={() => {
            localStorage.setItem("cardsStatusFavorite", "favorite");
            setIsFavoriteChosen(true);
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
