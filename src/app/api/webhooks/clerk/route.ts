import { prisma } from '@/lib/prisma';
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const eventType = evt.type
    
    if (eventType == "user.created"){
        const {id, email_addresses, first_name, image_url} =evt.data;

        if (!id || !email_addresses){
             return new Response('Error occured-missing data', { status: 400 })
        }

        const dbUser = await prisma.user.create({
                        data:{
                            clerkId: id,
                            name: first_name || "",
                            email: email_addresses[0].email_address || "",
                            image: image_url,
                        }
                    })

    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}