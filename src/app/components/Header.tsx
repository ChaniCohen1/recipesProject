"use client";
import Recipe from "@/app/types/recipes";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecipes } from "@/app/services/getRecipes";

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
  const router = useRouter(); // הגדרת ה-router

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

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-lg shadow-lg text-white">
      <div className="text-3xl font-semibold text-center mb-6">חיפוש מתכונים</div>

      <div className="flex justify-between items-center mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-lg w-1/4 bg-white text-black shadow-sm"
        >
          <option value="">בחר קטגוריה</option>
          {SelectArray.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="חפש מתכון לפי שם"
            className="border p-2 rounded-lg w-64 bg-white text-black shadow-sm"
          />
          <button
            onClick={() => router.push("/pages/addCard")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700"
          >
            הוסף מתכון
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
