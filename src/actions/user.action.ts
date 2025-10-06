'use server';

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function saveUser(){
    try {
        const {userId} = await auth();
        const user = await currentUser();
        if (!userId || !user){
                return;
        }
        const exisiting = await prisma.user.findUnique({
            where:{
                    clerkId: userId
                }
            })
        
            if(exisiting) return;
        
            const dbUser = await prisma.user.create({
                data:{
                    clerkId: userId,
                    name: user.firstName || "",
                    email: user.emailAddresses[0].emailAddress || "",
                    image: user.imageUrl,
                }
            })
    } catch (error) {
        console.log(error);
    }
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
}


export async function getDbUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await getUserByClerkId(clerkId);

  if (!user) throw new Error("User not found");

  return user.id;
}