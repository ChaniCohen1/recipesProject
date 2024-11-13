"use client";
import CardList from "@/app/components/CardList";
import Header from "@/app/components/Header";
import { getRecipes } from "@/app/services/getRecipes";
import Recipe from "@/app/types/recipes";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [filtered, setFiltered] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchRecipes();
    console.log("filtered",filtered);
    
  }, []);
  return (
    <div className="">
      <Header setFiltered={setFiltered}/>
      <CardList filtered={filtered} />
    </div>
  );
};

export default Page;
