
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { order, customerEmail } = await req.json()

    // Input validation
    if (!order || !customerEmail) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: order and customerEmail' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Processing order notification:', { orderId: order.id, customerEmail })

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get the Resend API key
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found')
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Sanitize order data for email
    const sanitizeText = (text: string) => {
      return text.replace(/[<>&"']/g, (char) => {
        const entities: { [key: string]: string } = {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;',
          "'": '&#x27;'
        }
        return entities[char] || char
      })
    }

    // Prepare email content with sanitized data
    const emailHtml = `
      <h2>New Order Received - 5 Star Grill</h2>
      <p><strong>Order ID:</strong> ${sanitizeText(order.id.slice(0, 8))}</p>
      <p><strong>Customer Email:</strong> ${sanitizeText(customerEmail)}</p>
      <p><strong>Total:</strong> $${order.grand_total.toFixed(2)}</p>
      <p><strong>Status:</strong> ${sanitizeText(order.status)}</p>
      <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleString()}</p>
      
      <h3>Items:</h3>
      <ul>
        ${order.items.map((item: any) => `
          <li>${sanitizeText(item.name)} (${item.quantity}) - $${item.totalPrice.toFixed(2)}</li>
        `).join('')}
      </ul>
      
      ${order.special_instructions ? `<p><strong>Special Instructions:</strong> ${sanitizeText(order.special_instructions)}</p>` : ''}
      
      <p>Please prepare this order for pickup.</p>
    `

    // Send email using Resend with verified domain
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Using Resend's verified domain
        to: ['restaurant@5stargrill.com'], // Replace with actual restaurant email
        subject: `New Order #${order.id.slice(0, 8)} - 5 Star Grill`,
        html: emailHtml,
      }),
    })

    const emailResult = await emailResponse.json()

    if (!emailResponse.ok) {
      console.error('Failed to send email:', emailResult)
      return new Response(
        JSON.stringify({ error: 'Failed to send email notification', details: emailResult }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Email sent successfully:', emailResult)

    return new Response(
      JSON.stringify({ success: true, emailId: emailResult.id }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in send-order-notification function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
