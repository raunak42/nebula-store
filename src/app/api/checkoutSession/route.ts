import Stripe from 'stripe';
import { PrismaProductOutput, PrismaUserOutput } from '@/app/utils/types';
import { NextRequest } from 'next/server';
import { BASE_URL } from '@/app/utils/constants';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

export interface BodyType {
    products: PrismaProductOutput[],
    userDetails: PrismaUserOutput
}

export async function POST(req: NextRequest) {
    const body: BodyType = await req.json()
    const { products, userDetails } = body;

    try {
        var items: Stripe.Checkout.SessionCreateParams.LineItem[] | undefined = []

        for (let i = 0; i < products.length; i++) {
            const qty = getOccurence(userDetails, products[i])
            items.push(
                {
                    price_data: {
                        unit_amount: products[i].price! * 100,
                        currency: 'inr',
                        product_data: {
                            name: products[i].name!,
                            images: [products[i].imageLink!]
                        },

                    },
                    quantity: qty,
                }
            )
        }

        const session = await stripe.checkout.sessions.create({
            currency: "inr",
            ui_mode: "hosted",
            submit_type: "pay",
            line_items: items,
            mode: "payment",
            success_url: `${req.headers.get('origin')}/return?success=true`,
            cancel_url: `${req.headers.get('origin')}/return?success=false`,
            billing_address_collection: 'required',
            customer_creation: 'always',
            payment_intent_data: {
                metadata: {
                    userDetails: JSON.stringify(userDetails)
                }
            }
        })

        return Response.json(session.url as string)
    } catch (err) {
        console.error(err)
        if (err instanceof Error) {
            return new Response(JSON.stringify({ message: err.message }));
        }
    }


}

export async function GET() {
    return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'POST' },
    });
}

const getOccurence = (
    user: PrismaUserOutput,
    item: PrismaProductOutput
) => {
    let occurence = 0;
    const cart = user.cart;
    cart?.forEach((id) => {
        if (id === item.id) {
            occurence++;
        }
    });
    return occurence;
};