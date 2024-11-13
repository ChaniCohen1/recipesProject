import axios from "axios";
import Recipe from "../types/recipes";


export const addRecipe = async (newRecipe: Recipe) => {
    try{
        const response = await axios.post('https://recipes-project-omega.vercel.app/api/recipes', newRecipe);
        return response.data;
    }catch(error){
        console.error('Error adding recipe:', error);
        throw error;
    }
};

export const getRecipes = async () => {    
    try{
        const response = await axios.get('https://recipes-project-omega.vercel.app/api/recipes');
        
        return response.data;
    }catch(error){
        console.error('Error get recipes:', error);
        throw error;
    }
};

export const getRecipeById = async (id: string) => {
    try{
        const response = await axios.get(`https://recipes-project-omega.vercel.app/api/recipes/${id}`);
        return response.data;
    }catch(error){
        console.error('error get recipes', error);
        throw error;
    };
};

export const editRecipe = async (id: string, editRecipe: Recipe) => {
    try{
        const response = await axios.put(`https://recipes-project-omega.vercel.app/api/recipes/${id}`, editRecipe);
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