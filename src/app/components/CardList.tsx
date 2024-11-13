"use client";
import Card from "@/app/components/Card";
import React, { useEffect, useState } from "react";
import Recipe from "@/app/types/recipes";

interface CardListProps {
  filtered: Recipe[];
}

const CardList: React.FC<CardListProps> = ({ filtered }) => {
console.log("card",filtered);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {filtered.map((recipe, index) => (
        <Card key={index} recipe={recipe} isSelected={false} />
      ))}
    </div>
  );
};

export default CardList;
