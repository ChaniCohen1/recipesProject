"use client";
import React, { useEffect, useState } from "react";

const SelectArray = [
  "salads",
  "desserts",
  "pastries",
  "meats",
  "sidedishes",
  "other",
];
// { recipes, onSearch }
const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const filteredRecipes = recipes
//       .filter((recipe) =>
//         recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       .sort((a, b) => a.name.localeCompare(b.name)); // מיון לפי שם המתכון
//     onSearch(filteredRecipes); // מעדכן את התוצאות הממוינות
//   }, [searchQuery, recipes, onSearch]);

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
    </div>
  );
};

export default Page;
