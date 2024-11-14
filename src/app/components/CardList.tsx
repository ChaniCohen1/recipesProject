"use client";
import Card from "@/app/components/Card";
import React, { useEffect, useState } from "react";
import Recipe from "@/app/types/recipes";

interface CardListProps {
  filtered: Recipe[];
  setFiltered: (id: Recipe[]) => void;
  setUpdate: (b: boolean) => void;
}

const CardList: React.FC<CardListProps> = ({ filtered, setFiltered,setUpdate }) => {
  const onChangeData = (updatedRecipe: Recipe) => {
    setFiltered(
      filtered.map((recipe) =>
        recipe._id === updatedRecipe._id ? updatedRecipe : recipe
      )
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {filtered.map((recipe, index) => (
        <Card
          key={index}
          recipe={recipe}
          isSelected={false}
          onClick={onChangeData}
          setUpdate={setUpdate}
        />
      ))}
    </div>
  );
};

export default CardList;
