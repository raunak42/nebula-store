// import Stripe from 'stripe';
// import { MetadataParam } from '@stripe/stripe-js';


// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: '2024-06-20',
// });

// export default async function POST(req:Request) {
//   const metaData: MetadataParam = {

//   }

//   const session = await stripe.checkout.sessions.create({
//     currency:"inr",
//     ui_mode:"hosted",
//     submit_type:"pay",
//     line_items:[
//         {
//             price_data:{
                
//             }
//         }
//     ]

//   })
// }

import { prisma } from "@/app/lib/prisma";
import { apiResponse } from "@/app/utils/helpers/apiResponse";

export async function GET(req: Request): Promise<Response> {
    try {
        const allProducts = await prisma.product.findMany()
        return apiResponse({ products: allProducts, message: "Success" }, 200)
    } catch (error) {
        console.log(error)
        return apiResponse({ message: "Error" })
    }

}