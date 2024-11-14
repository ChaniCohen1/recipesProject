import axios from "axios";
import Recipe from "../types/recipes";

const url = "http://localhost:3000";
// https://recipes-project-omega.vercel.app
// http://localhost:3000
export const addRecipe = async (newRecipe: Recipe) => {
    try{
        const response = await axios.post(`${url}/api/recipes`, newRecipe);
        return response.data;
    }catch(error){
        console.error('Error adding recipe:', error);
        throw error;
    }
};

export const getRecipes = async () => {    
    try{
        const response = await axios.get(`${url}/api/recipes`);
        
        return response.data;
    }catch(error){
        console.error('Error get recipes:', error);
        throw error;
    }
};

export const getRecipeById = async (id: string) => {
    try{
        const response = await axios.get(`${url}/api/recipes/${id}`);
        return response.data;
    }catch(error){
        console.error('error get recipes', error);
        throw error;
    };
};

export const editRecipe = async (id: string, editRecipe: Recipe) => {
    console.log("editRecipe", editRecipe);
    
    try{
        const response = await axios.put(`${url}/api/recipes/${id}`, editRecipe);
        return response.data;
    }catch(error){
        console.error('error edit recipe', error);
        throw error;
    }
};

export const deleteRecipe = async (id: string) => {
    try{
        const response = await axios.delete(`https://recipes-project-omega.vercel.app/api/recipes/${id}`);
        return response.data;
    }catch(error){
        console.error('error edit recipe', error);
        throw error;
    }
};