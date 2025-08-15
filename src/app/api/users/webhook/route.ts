import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import {db} from "@/db";
import {users} from "@/db/schema";
import {eq} from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req)
        const eventType = evt.type

        if (eventType === 'user.created') {
            const { id, first_name, last_name, image_url } = evt.data;

            if (!id) {
                return new Response("Missing user ID", { status: 400 });
            }
            const userName = [first_name, last_name].filter(Boolean).join(" ").trim();
            try {
                await db.insert(users).values({
                    clerkId: id,
                    name: userName,
                    imageUrl: image_url,
                });
                console.log(`User created: ${id}`);
                return new Response("User created", { status: 201 });
            } catch (dbError) {
                console.error("Database error:", dbError);
                return new Response("Database error", { status: 500 });
            }
        }
        if (eventType === 'user.deleted') {
            const {data} = evt;
            if (!data.id){
                return new Response("Missing user id", {status: 400})
            }
            await db.delete(users).where(eq(users.clerkId, data.id))
        }
        if (eventType === "user.updated") {
            const {data} = evt
            await db
                .update(users)
                .set({
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url,
                })
                .where(eq(users.clerkId, data.id));
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}