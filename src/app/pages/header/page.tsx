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

const Page: React.FC<HeaderProps> = ({ setFiltered }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
//   const [filtered, setFiltered] = useState("");
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
    // סינון על פי שם המתכון והקטגוריה
    const filteredRecipes = recipes
      .filter((recipe) => {
        const matchesCategory =
          selectedCategory === "" || recipe.category === selectedCategory;
        const matchesSearch = recipe.mealName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.mealName.localeCompare(b.mealName)); // מיון לפי שם המתכון

    setFiltered(filteredRecipes); // מעדכן את התוצאות הממוינות
  }, [recipes, selectedCategory, searchQuery, setFiltered]); // כל התלויות כולל setRecipes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="">Recipes</div>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">בחר קטגוריה</option>
        {SelectArray.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="חפש מתכון לפי שם"
          className="border p-2 rounded w-full"
        />
      </div>

      <button onClick={() => router.push("/pages/addCard")}>Add Recipe</button>
    </div>
  );
};

export default Page;
