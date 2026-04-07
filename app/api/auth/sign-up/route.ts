import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

interface RegisterBody {
  name: string;
  username: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();

    // Validate fields exist
    if (
      typeof body !== "object" ||
      body === null ||
      !("name" in body && "username" in body && "email" in body && "password" in body)
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { name, username, email, password } = body as RegisterBody;

    if (!name || !username || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 🔍 Check if username or email already exists
    const existingUser = await db.users.findFirst({
      where: {
        OR: [
          { username }, // check username
          { email },    // check email
        ],
      },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return NextResponse.json(
          { error: "Username is already taken" },
          { status: 409 }
        );
      }
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: "Email is already registered" },
          { status: 409 }
        );
      }
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const user = await db.users.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered!", userId: user.id },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}