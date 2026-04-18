import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await auth.api.signUpEmail({
      body: {
        email: "admin@sifiso.pro",
        password: "SifisoAdmin2024!",
        name: "Admin Sifiso",
      },
    });
    return NextResponse.json({ message: "Admin created successfully! You can now login at /login" });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message || "Something went wrong",
      hint: "If it says 'User already exists', you can just go to /login"
    });
  }
}
