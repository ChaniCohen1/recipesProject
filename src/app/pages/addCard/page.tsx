"use client"
import React, { useState } from 'react'
import { z } from 'zod';
import { addRecipe } from '@/app/services/getRecipes'
import { useRouter } from "next/navigation";
import Recipe from "@/app/types/recipes";

const imagePathSchema = z.string().refine((path) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(path);  // Check if the path ends with a valid image extension
}, {
    message: "File must be an image (JPEG, PNG, etc.)",
});

const recipeSchema = z.object({
    _id: z.string(),
    mealName: z.string().min(1, { message: "Meal name is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    PreparationInstructions: z.string().min(1, { message: "Preparation instructions are required" }),
    ingredients: z.array(z.string()).min(1, { message: "At least one ingredient is required" }),
    isFavorite: z.boolean(),
    image: imagePathSchema,
});

type RecipeDataZod = z.infer<typeof recipeSchema>;

const validate = (recipeData: RecipeDataZod) => {
    try {
        const validRecipeData = recipeSchema.parse(recipeData);
        console.log("inputs are valid");
        return validRecipeData;
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            console.error("validation error: ", error.errors);
        }
        return null;
    }
};

const NewCardForm = () => {
    const router = useRouter();

    const [mealName, setMealName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [instructions, setInstructions] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    const goBack = () => {
        router.push("/pages/cards");
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    //when changing an existing indredient field
    const handleIngredientChange = (index: number, value: string) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };

    //adding an extra ingredient field, and setting it to empty
    const addIngredientInput = () => {
        setIngredients([...ingredients, '']);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFavorite(event.target.checked);  // Update state based on checkbox
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const filePath = `../data/${e.target.files[0].name}`; // Example path construction
            setImage(filePath);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        //varify with the zod schema, send to the POST func
        event.preventDefault();

        const dataToValidate: Recipe = {
            _id: "",
            mealName,
            category,
            PreparationInstructions: instructions,
            ingredients,
            isFavorite,
            image,
        };
        const validatedData = validate(dataToValidate);
        if (validatedData) {
            try {
                const response = await addRecipe(validatedData); // Call the POST function
                console.log("Recipe successfully submitted:", response);
            } catch (error) {
                console.error("Error submitting recipe:", error);
            }
        }
    };

    const inpStyle = "m-2 border-gray-300 border-2 rounded";
    const buttonStyle = "m-2 py-1 px-3 bg-purple-600 text-white rounded";

    return (
        <div>
            <button onClick={goBack}>Back</button>
            <h1 className="text-3xl">Add Recipe</h1>
            <form onSubmit={handleSubmit} className="flex flex-row">
                <div className="flex flex-col w-1/3">
                    <input
                        type="text"
                        name="meal_name"
                        placeholder="Meal name"
                        value={mealName}
                        onChange={(e) => setMealName(e.target.value)}
                        className={inpStyle}
                    />
                    <select name="category" value={category} onChange={handleCategoryChange} className={inpStyle}>
                        <option value="" disabled>Category</option>
                        <option value="salads">Salads</option>
                        <option value="pastries">Pastries</option>
                        <option value="meats">Meats</option>
                        <option value="sidedishes">Side dishes</option>
                        <option value="desserts">Desserts</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={inpStyle}
                    />

                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                name={`ingredient-${index}`}
                                placeholder="Ingredient"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                className={inpStyle}
                            />
                            {/* Add button positioned next to the last ingredient */}
                            {index === ingredients.length - 1 && (
                                <button
                                    type="button"
                                    onClick={addIngredientInput}
                                    className={`${buttonStyle} w-10`}>
                                    +
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col w-1/2">
                    <textarea
                        name="instructions"
                        placeholder="Instructions"
                        rows={12}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className={`${inpStyle} w-full`}
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="addToFavorite"
                            checked={isFavorite} // Bind checkbox to state
                            onChange={handleCheckboxChange} // Handle state change
                        />
                        add to favorites
                    </label>
                    <button type="submit" className={`${buttonStyle} w-1/5`}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default NewCardForm