import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { items } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'No items found in the cart.' });
  }

  const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${process.env.NEXT_URL}/`;

  const lineItems = items.map((item: { priceId: string, quantity: number }) => ({
    price: item.priceId,
    quantity: item.quantity,
  }));

  console.log("Line items for Stripe checkout:", lineItems); 

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: success_url,
      cancel_url: cancel_url,
      line_items: lineItems,
    });

    return res.status(201).json({
      checkoutUrl: checkoutSession.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ error: 'Failed to create checkout session.' });
  }
}
