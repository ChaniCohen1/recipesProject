"use client";
import CardList from "@/app/components/CardList";
import Header from "@/app/components/Header";
import { fetchProtectedData } from "@/app/services/auth";
import { getRecipes } from "@/app/services/getRecipes";
import Recipe from "@/app/types/recipes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  let status;
  console.log(typeof window);

  if (typeof window !== "undefined") {
    status = localStorage.getItem("cardsStatusFavorite");
  } else {
    status = false;
  }
  console.log("status", status);

  const [filtered, setFiltered] = useState<Recipe[]>([]);
  const [update, setUpdate] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
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

  //token
  useEffect(() => {
    const checkAccess = async () => {
      const validation = await fetchProtectedData();
      console.log("validation data", validation);
      if (validation) {
        setIsAuthenticated(true);
        console.log("יש לך גישה למידע המוגן:", validation);
      } else {
        router.push("/pages/login");
        console.log("אין לך גישה למידע המוגן");
      }
    };
    checkAccess();
  }, [router]);

  if (!isAuthenticated) {
    return <p>טוען...</p>;
  }

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
