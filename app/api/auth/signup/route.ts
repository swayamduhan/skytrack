import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrpyt from "bcrypt"

export async function POST(req : NextRequest){
    const { name, email, password } = await req.json()

    if(!(name && email && password)){
        return NextResponse.json({ message : "INCOMPLETE_INPUT" }, { status : 400 })
    }

    try{
        const existingUser = await prisma.user.findUnique({ where : { email }})
        if(existingUser){
            return NextResponse.json({ message : "USER_ALREADY_EXISTS"}, { status : 400 })
        }

        const hashedPassword = await bcrpyt.hash(password, 10)

        const createdUser = await prisma.user.create({
            data : {
                name,
                email,
                password : hashedPassword,
                emailVerified : "PENDING"
            }
        })

        return NextResponse.json({ message : "USER_CREATED", id : createdUser.id })
    } catch (e) {
        return NextResponse.json({ message : "ERROR_ENCOUNTERED "}, { status : 500 })
    }
}