import { Resend } from 'resend';
import type { APIRoute } from 'astro';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { asunto, descripcion, email } = await request.json();
    if (!asunto || !descripcion || !email) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios.' }), { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Contacto Coding Pit <no-reply@coding-pit.com>',
      to: ['juanje.cilla@gmail.com'],
      subject: `[Contacto] ${asunto}`,
      reply_to: email,
      text: `Asunto: ${asunto}\nEmail: ${email}\n\n${descripcion}`,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error procesando la solicitud.' }), { status: 500 });
  }
}; 