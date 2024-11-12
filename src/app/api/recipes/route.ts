import connect from "@/app/lib/DB/mongoDB";
import Todo from "@/app/lib/models/Todo";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {

        await connect();
        console.log("before");
        const newTodo = new Todo({
            todo: "משימה חדשה",           
            completed: true,    
        });
        
        await newTodo.save();
        
        return NextResponse.json({ todo: newTodo}, { status: 200 });
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

        
        const todos = await Todo.find();
        if (todos)
            return NextResponse.json(todos, { status: 200 });
        else
            return NextResponse.json({ error: "not found" }, { status: 500 });

    } catch {
        return NextResponse.json({ error: "failed to get todo" }, { status: 500 });
    }
};


export async function PUT(request: Request) {
    try {

        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const { todo, completed } = await request.json();
        await connect();
        console.log("before", todo, completed);

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { $set: { todo, completed } },
            { new: true }
        );
        console.log("after");

        return NextResponse.json({ updatedTodo: updatedTodo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }

};

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        await connect();

        await Todo.findByIdAndDelete(id);
        return NextResponse.json({ massage: `object deleted` }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};