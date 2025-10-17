// Si falta Stripe, instala con: npm install stripe @types/stripe --save
import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const STRIPE_SECRET_KEY = import.meta.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2025-06-30.basil' });

type PlanType = 'mensual' | 'trimestral' | 'anual';

// Completa estos IDs con los de tu cuenta de Stripe
const PRICE_IDS: Record<PlanType, string> = {
  mensual: 'price_xxx_mensual',
  trimestral: 'price_xxx_trimestral',
  anual: 'price_xxx_anual',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { plan } = await request.json();
    if (!['mensual', 'trimestral', 'anual'].includes(plan)) {
      return new Response(JSON.stringify({ error: 'Invalid plan' }), { status: 400 });
    }
    const priceId = PRICE_IDS[plan as PlanType];
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/gracias?plan=${plan}`,
      cancel_url: `${request.headers.get('origin')}/formacion/mentorias?cancel=true`,
    });
    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Stripe error' }), { status: 500 });
  }
}; 