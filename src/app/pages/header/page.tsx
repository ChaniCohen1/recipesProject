// "use client";
// import React, { useEffect, useState } from "react";

// const SelectArray = [
//   "salads",
//   "desserts",
//   "pastries",
//   "meats",
//   "sidedishes",
//   "other",
// ];
// // { recipes, onSearch }
// const Page = () => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

// //   useEffect(() => {
// //     const filteredRecipes = recipes
// //       .filter((recipe) =>
// //         recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
// //       )
// //       .sort((a, b) => a.name.localeCompare(b.name)); // מיון לפי שם המתכון
// //     onSearch(filteredRecipes); // מעדכן את התוצאות הממוינות
// //   }, [searchQuery, recipes, onSearch]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <div>
//       <div className="">Recipes</div>

//       <select
//         value={selectedCategory}
//         onChange={(e) => setSelectedCategory(e.target.value)}
//         className="border p-2 rounded"
//       >
//         <option value="">בחר קטגוריה</option>
//         {SelectArray.map((category) => (
//           <option key={category} value={category}>
//             {category}
//           </option>
//         ))}
//       </select>

//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleInputChange}
//           placeholder="חפש מתכון לפי שם"
//           className="border p-2 rounded w-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default Page;




"use client";
import Recipe from "@/app/types/recipes";
import React, { useEffect, useState } from "react";

const SelectArray = [
  "salads",
  "desserts",
  "pastries",
  "meats",
  "sidedishes",
  "other",
];

interface HeaderProps {
  recipes: Recipe[];
  setRecipes: (id: Recipe[]) => void;
}

const Page: React.FC<HeaderProps> = ({ recipes, setRecipes }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // הוספת תלויות נכונות ב- useEffect
  useEffect(() => {
    // סינון על פי שם המתכון והקטגוריה
    const filteredRecipes = recipes
      .filter((recipe) => {
        const matchesCategory =
          selectedCategory === "" || recipe.category === selectedCategory;
        const matchesSearch =
          recipe.mealName.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.mealName.localeCompare(b.mealName)); // מיון לפי שם המתכון

    setRecipes(filteredRecipes); // מעדכן את התוצאות הממוינות
  }, [recipes, selectedCategory, searchQuery, setRecipes]); // כל התלויות כולל setRecipes

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
