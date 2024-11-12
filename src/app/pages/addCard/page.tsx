"use client"
import React, { useState } from 'react'

const NewCardForm = () => {
    const [mealName, setMealName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [instructions, setInstructions] = useState('');

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

    const handleSubmit = (event: React.FormEvent) => {
        //varify with the zod schema, send to the POST func
        event.preventDefault();
    };

    const inpStyle = "m-2 border-gray-300 border-2 rounded";
    const buttonStyle = "m-2 py-1 px-3 bg-purple-600 text-white rounded";

    return (
        <div>
            <button>Back</button>
            <h1>Add Recipe</h1>
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
                        placeholder="Image URL"
                        onChange={(e) => setImage(e.target.value)}
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
                    <button type="submit" className={`${buttonStyle} w-1/5`}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default NewCardForm