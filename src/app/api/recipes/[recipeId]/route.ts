import connect from "@/app/lib/DB/connectDB";
import Recipe from "@/app/lib/models/recipe";
import { NextResponse } from "next/server";

export async function GET( { params }: { params: { recipeId: string } }
) {
  try {
    const { recipeId } = await params;
    await connect();
    const recipe = await Recipe.findById(recipeId);
    return NextResponse.json({ recipe: recipe }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const { recipeId } = await params;
    const {
      mealName,
      category,
      PreparationInstructions,
      ingredients,
      isFavorite,
      image,
    } = await request.json();

    await connect();

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        $set: {
          mealName,
          category,
          PreparationInstructions,
          ingredients,
          isFavorite,
          image,
        },
      },
      { new: true }
    );

    return NextResponse.json({ updatedTodo: updatedRecipe }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const { recipeId } = await params;

    await connect();

    await Recipe.findByIdAndDelete(recipeId);
    return NextResponse.json({ massage: `object deleted` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
