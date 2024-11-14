"use client";
import Card from "@/app/components/Card";
import React, { useState, useEffect } from "react";
import Recipe from "@/app/types/recipes";

interface CardListProps {
  filtered: Recipe[];
  setFiltered: (id: Recipe[]) => void;
  setUpdate: (b: boolean) => void;
}

const CardList: React.FC<CardListProps> = ({ filtered, setFiltered, setUpdate }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;
  const totalPages = Math.ceil(filtered.length / recipesPerPage);
  // חישוב המתכונים שצריכים להופיע בעמוד הנוכחי
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filtered.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
  
  useEffect(() => {
    setCurrentPage(1);
  }, [filtered]);


  const onChangeData = (updatedRecipe: Recipe) => {
    setFiltered(
      filtered.map((recipe) =>
        recipe._id === updatedRecipe._id ? updatedRecipe : recipe
      )
    );
  };

  // פונקציה למעבר לעמוד הבא
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // פונקציה למעבר לעמוד הקודם
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {currentRecipes.map((recipe, index) => (
          <Card
            key={index}
            recipe={recipe}
            isSelected={false}
            onClick={onChangeData}
            setUpdate={setUpdate}
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-4 mb-6">
        <span className="text-sm text-gray-500">
          Page {currentPage}-{totalPages} of {totalPages}
        </span>

        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="text-2xl px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          {"<"}
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-2xl px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default CardList;
