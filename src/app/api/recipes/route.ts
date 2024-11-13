import connect from "@/app/lib/DB/connectDB";
import Recipe from "@/app/lib/models/recipe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {

        await connect();
        const {mealName, category, PreparationInstructions, ingredients, isFavorite, image} = await request.json();

        const newRecipe = new Recipe({
            mealName: mealName,
            category: category,
            PreparationInstructions: PreparationInstructions,
            ingredients: ingredients,
            isFavorite: isFavorite,
            image: image
        });
        
        await newRecipe.save();
        
        return NextResponse.json({ recipe: newRecipe}, { status: 200 });
    } catch(error) {
        console.error(error);
        return NextResponse.json({ massage: 'Error: failed to crate todo' }, { status: 500 });
    }
};

// export async function GET(request: Request) {
//     try {
//         const url = new URL(request.url);
//         const id = url.searchParams.get('id');

//         await connect();

//         const todo = await Todo.findOne({ id });

//         if (id && todo)
//             return NextResponse.json({ todo: todo }, { status: 200 });
//         else
//             return NextResponse.json({ error: "not found" }, { status: 500 });

//     } catch {
//         return NextResponse.json({ error: "failed to get todo" }, { status: 500 });
//     }
// };

export async function GET(request: Request) {
    try {

        await connect();
        const recipes = await Recipe.find();
        console.log("recipes",recipes);
        
        if (recipes)
            return NextResponse.json(recipes, { status: 200 });
        else
            return NextResponse.json({ error: "not found" }, { status: 500 });

    } catch {
        return NextResponse.json({ error: "failed to get recipe" }, { status: 500 });
    }
};


// export async function PUT(request: Request) {
//     try {

//         const url = new URL(request.url);
//         const id = url.searchParams.get('id');

//         const {mealName, category, PreparationInstructions, ingredients, isFavorite, image} = await request.json();


//         await connect();

//         const updatedRecipe = await Recipe.findByIdAndUpdate(
//             id,
//             { $set: {mealName, category, PreparationInstructions, ingredients, isFavorite, image} },
//             { new: true }
//         );

//         return NextResponse.json({ updatedTodo: updatedRecipe }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: error }, { status: 500 });
//     }

// };

// export async function DELETE(request: Request) {
//     try {
//         const url = new URL(request.url);
//         const id = url.searchParams.get('id');

//         await connect();

//         await Recipe.findByIdAndDelete(id);
//         return NextResponse.json({ massage: `object deleted` }, { status: 200 });
//     }
//     catch (error) {
//         return NextResponse.json({ error: error }, { status: 500 });
//     }
// };