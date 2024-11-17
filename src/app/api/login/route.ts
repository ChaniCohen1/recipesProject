import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  
  if (email === "user@example.com" && password === "111") {

    const token = jwt.sign(
      { email }, 
      process.env.JWT_SECRET!, 
      { expiresIn: "1h" } //הגדרת תוקף הטוקן
    );

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `token=${token}; path=/; secure; HttpOnly; SameSite=Strict`
    );

    console.log(headers, token);
    
    return NextResponse.json(
      { message: "Login successful", token },
      { headers }
    );
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
};


export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token missing" },
        { status: 401 }
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET!;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("Decoded Token:", decoded);

      return NextResponse.json({
        message: "User authenticated",
        user: decoded,
      });
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json(
      { message: "Server error during authentication" },
      { status: 500 }
    );
  }
};



