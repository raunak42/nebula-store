import Stripe from 'stripe';
import { MetadataParam } from '@stripe/stripe-js';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

export default async function POST(req:Request) {
  const metaData: MetadataParam = {

  }

  const session = await stripe.checkout.sessions.create({
    currency:"inr",
    ui_mode:"hosted",
    submit_type:"pay",
    line_items:[
        {
            price_data:{
                
            }
        }
    ]

  })
}