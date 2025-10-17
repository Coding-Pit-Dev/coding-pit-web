import type { APIRoute } from 'astro';

export const prerender = false;

// Newsletter functionality is temporarily disabled
export const POST: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Newsletter functionality is temporarily unavailable'
    }),
    {
      status: 503,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};

// Disable all other exports by commenting out the rest of the file
/*

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per window

// Listmonk configuration
const LISTMONK_BASE_URL = 'https://codingpit-listmonk.zeabur.app';
const LISTMONK_SUBSCRIPTION_ENDPOINT = '/subscription/form';

interface SubscriptionRequest {
  name: string;
  email: string;
}

interface SubscriptionResponse {
  success: boolean;
  error?: string;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting function
function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientIP);

  if (!clientData || now > clientData.resetTime) {
    // Reset or initialize rate limit for this IP
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return true;
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  // Increment count
  clientData.count++;
  rateLimitStore.set(clientIP, clientData);
  return true;
}

// Input validation function
function validateInput(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('El nombre es obligatorio');
  } else if (data.name.trim().length > 100) {
    errors.push('El nombre no puede exceder 100 caracteres');
  }

  if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
    errors.push('El email es obligatorio');
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.push('El formato del email no es válido');
  } else if (data.email.trim().length > 255) {
    errors.push('El email no puede exceder 255 caracteres');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input.trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 255); // Limit length
}

// Submit to Listmonk
async function submitToListmonk(name: string, email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    // Add default list - you may need to configure this based on your Listmonk setup
    formData.append('l', 'newsletter'); // This should be your list UUID or identifier

    const response = await fetch(`${LISTMONK_BASE_URL}${LISTMONK_SUBSCRIPTION_ENDPOINT}`, {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'CodingPit-Newsletter-Subscription/1.0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Listmonk API error:', response.status, errorText);

      // Handle specific Listmonk errors
      if (response.status === 409) {
        return { success: false, error: 'Ya estás suscrito a nuestra newsletter' };
      } else if (response.status === 400) {
        return { success: false, error: 'Datos de suscripción inválidos' };
      } else {
        return { success: false, error: 'Error al procesar la suscripción' };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Network error submitting to Listmonk:', error);
    return { success: false, error: 'Error de conexión. Inténtalo de nuevo más tarde.' };
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Get client IP for rate limiting
    const clientIP = clientAddress || 'unknown';

    // Check rate limiting
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Demasiadas solicitudes. Inténtalo de nuevo en 15 minutos.'
        } as SubscriptionResponse),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '900' // 15 minutes
          }
        }
      );
    }

    // Parse request body
    let requestData: SubscriptionRequest;
    try {
      requestData = await request.json();
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Formato de datos inválido'
        } as SubscriptionResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate input
    const validation = validateInput(requestData);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: validation.errors.join(', ')
        } as SubscriptionResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Sanitize input
    const sanitizedName = sanitizeInput(requestData.name);
    const sanitizedEmail = sanitizeInput(requestData.email);

    // Submit to Listmonk
    const result = await submitToListmonk(sanitizedName, sanitizedEmail);

    if (result.success) {
      return new Response(
        JSON.stringify({
          success: true
        } as SubscriptionResponse),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: result.error
        } as SubscriptionResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('Unexpected error in newsletter subscription:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error interno del servidor. Inténtalo de nuevo más tarde.'
      } as SubscriptionResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};*/
