import { prisma } from "@/app/lib/prisma";
import { PrismaUserOutput } from "@/app/utils/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
    const signature = req.headers.get('stripe-signature'); //stripe will send this header
    if (!signature) {
        return NextResponse.json({ message: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event;

    try {
        const body = await req.text();
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
        console.error('⚠️ Webhook signature verification failed.', err);
        return NextResponse.json({ message: 'Webhook Error' }, { status: 400 });
    }

    if (event.type === 'payment_intent.created') {
        console.log("Payment intent created")
        //This if-check has to have some logic, a mere console log even, for the logic in the next if statement to work.
        //And this if-check has to exist.
    }

    if (event.type === 'payment_intent.succeeded') {
        //You could add the products to user's list of purchsed courses in the database. 
        //But for now, let's just clear the cart.

        const paymentIntent = event.data.object;

        const userDetails: PrismaUserOutput = JSON.parse(paymentIntent.metadata.userDetails)
        const userId = userDetails.id

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                cart: {
                    set: []
                }
            }
        })

        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

    } else {
        console.log(`Unhandled event type ${event.type}.`);
    }
    return NextResponse.json({ received: true }, { status: 200 });


}