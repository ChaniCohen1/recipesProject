"use client";
import Header from "@/app/components/Header";
import Recipe from "@/app/types/recipes";
import React, { useState } from "react";

const Page: React.FC = () => {
  const [filtered, setFiltered] = useState<Recipe[]>([]);

  return (
    <div>
      <Header setFiltered={setFiltered} />
    </div>
  );
};

export default Page;
