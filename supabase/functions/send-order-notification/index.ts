import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderNotificationRequest {
  order: {
    id: string;
    user_id: string;
    items: any[];
    total: number;
    tax_amount: number;
    grand_total: number;
    special_instructions?: string;
    status: string;
    pickup_time: string;
    estimated_wait_minutes: number;
    created_at: string;
  };
  customerEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order, customerEmail }: OrderNotificationRequest = await req.json();

    console.log("Processing order notification for order:", order.id);

    // Format order items for email
    const itemsList = order.items.map((item: any) => 
      `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    // Format pickup time
    const pickupTime = new Date(order.pickup_time).toLocaleString('en-US', {
      timeZone: 'America/New_York',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
          New Order Received!
        </h1>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333; margin-top: 0;">Order Details</h2>
          <p><strong>Order ID:</strong> #${order.id.slice(0, 8)}</p>
          <p><strong>Customer Email:</strong> ${customerEmail}</p>
          <p><strong>Status:</strong> ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
          <p><strong>Estimated Pickup Time:</strong> ${pickupTime}</p>
          <p><strong>Estimated Wait:</strong> ${order.estimated_wait_minutes} minutes</p>
        </div>

        <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Items Ordered:</h3>
          <pre style="font-family: Arial, sans-serif; white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 4px;">${itemsList}</pre>
        </div>

        <div style="background: #e8f5e8; border: 1px solid #4caf50; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2e7d32; margin-top: 0;">Order Total</h3>
          <p style="margin: 5px 0;"><strong>Subtotal:</strong> $${order.total.toFixed(2)}</p>
          <p style="margin: 5px 0;"><strong>Tax:</strong> $${order.tax_amount.toFixed(2)}</p>
          <p style="margin: 5px 0; font-size: 18px; color: #2e7d32;"><strong>Grand Total: $${order.grand_total.toFixed(2)}</strong></p>
        </div>

        ${order.special_instructions ? `
        <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #856404; margin-top: 0;">Special Instructions</h3>
          <p style="color: #856404;">${order.special_instructions}</p>
        </div>
        ` : ''}

        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; color: #6c757d; font-size: 14px;">
            Order placed on ${new Date(order.created_at).toLocaleString('en-US', {
              timeZone: 'America/New_York',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </p>
        </div>
      </div>
    `;

    // Send email notification to restaurant (using your Resend account email temporarily)
    const emailResponse = await resend.emails.send({
      from: "Order Notifications <onboarding@resend.dev>",
      to: ["moesenterprises732@gmail.com"], // Using your verified Resend email temporarily
      subject: `New Order #${order.id.slice(0, 8)} - $${order.grand_total.toFixed(2)}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
