"use client";
import CardList from "@/app/components/CardList";
import Header from "@/app/components/Header";
import { getRecipes } from "@/app/services/getRecipes";
import Recipe from "@/app/types/recipes";
import React, { useEffect, useState } from "react";

const Page = () => {
  // let status;
  // if (typeof window !== "undefined") {
  //   status = localStorage.getItem("cardsStatusFavorite");
  // } else {
  //   status = false;
  // }
  const [filtered, setFiltered] = useState<Recipe[]>([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const status = localStorage.getItem("cardsStatusFavorite");
        const data: Recipe[] = await getRecipes();
        status === "all"
          ? setFiltered(data)
          : setFiltered(data.filter((rec) => rec.isFavorite === true));
        setUpdate(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchRecipes();
  }, [update, status]);

  return (
    <>
      <Header setFiltered={setFiltered} update={update} setUpdate={setUpdate} />
      <CardList
        filtered={filtered}
        setFiltered={setFiltered}
        setUpdate={setUpdate}
      />
    </>
  );
};

export default Page;
