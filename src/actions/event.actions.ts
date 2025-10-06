"use server";

import { prisma } from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createEvent(title: string, imageUrl:string,date: Date, city: string, category: string){
    try {
        const userId = await getDbUserId();

        if (userId === null){
            return;
        }

        const event = await prisma.event.create({
            data: {
                title: title,
                date: date,
                city: city,
                category: category,
                image: imageUrl,
                creatorId: userId
            }
        })

        revalidatePath("/");
        return {success:true, event}

    } catch (error) {
        return {success:false, error: "Failed to create event"}
    }
}


export async function getEvents(){
    try {

        const userId = await getDbUserId();

        if (userId === null){
            return;
        }

        const events = await prisma.event.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
               creator: {
                select: {
                    name:true,
                    image: true
                }
            },

            favourites: {
                select: {
                    userId: true, 
                },
            },

            visitors: {
                select: {
                    userId: true
                }
            }
               
            }
        })

        return events;
    } catch (error) {
        console.log("Error getting events", error);
    }
}


export async function markasFavourite(eventId: string){
    try {

        const userId = await getDbUserId();

        if (userId === null){
            return;
        }
        
        const exisitingLike = await prisma.favourites.findUnique({
            where: {
                userId_eventId: {
                    userId,
                    eventId
                }
            }
        });

        if (exisitingLike){
            // unlike
            await prisma.favourites.delete({
            where: {
                userId_eventId: {
                    userId,
                    eventId
                }
            }
            });
        }else{
            // like
            await prisma.favourites.create({
            data: {
                userId,
                eventId
                }
            });
        }

        revalidatePath("/");
        return {success:true};

        
    } catch (error) {
        console.log("Error liking event", error);
        return {success:false};
        
    }
}

export async function getEvent(id:string | string[] | undefined){
    try {
        if (typeof id != "string"){
            return;
        }

        const event = await prisma.event.findFirst({
            where:{
                id
            },
            include: {
               creator: {
                select: {
                    name:true,
                    image: true
                }
            },
             visitors: {
                select: {
                    userId: true,
                    user: true
                }
            },
        }

           
        })

        return event;
    } catch (error) {
        console.log("Error getting event or not found", error);
    }
}


export async function visitEvent(eventId:string){
    try {
       const userId = await getDbUserId();

        if (userId === null){
            return {success:false};
        }
        
        const exisitingVisit = await prisma.visitors.findFirst({
            where: {
                userId,
                eventId
            }
        });

        if (exisitingVisit){
            return {success:true};
        }

        await prisma.visitors.create({
            data:{
                userId,
                eventId
            }
        })

        revalidatePath(` /events/${eventId}`)

        return {success:true};
        
    } catch (error) {
        return {success:false};
    }
}

