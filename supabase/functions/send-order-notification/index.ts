
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

    // Format for thermal 4x6 printer - optimized layout
    const orderDate = new Date(order.created_at).toLocaleString()
    const pickupTime = order.pickup_time ? new Date(order.pickup_time).toLocaleString() : 'TBD'
    
    const emailHtml = `
      <div style="font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.2; max-width: 288px; margin: 0; padding: 8px;">
        <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 8px;">
          <h1 style="margin: 0; font-size: 18px; font-weight: bold;">5 STAR GRILL</h1>
          <p style="margin: 2px 0; font-size: 12px;">NEW ORDER</p>
        </div>
        
        <div style="margin-bottom: 8px;">
          <p style="margin: 2px 0;"><strong>ORDER #:</strong> ${sanitizeText(order.id.slice(0, 8).toUpperCase())}</p>
          <p style="margin: 2px 0;"><strong>DATE:</strong> ${orderDate}</p>
          <p style="margin: 2px 0;"><strong>STATUS:</strong> ${sanitizeText(order.status.toUpperCase())}</p>
        </div>
        
        <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 8px 0; margin: 8px 0;">
          <p style="margin: 2px 0; font-weight: bold;">CUSTOMER INFO:</p>
          <p style="margin: 2px 0;">Email: ${sanitizeText(customerEmail)}</p>
          ${order.customer_phone ? `<p style="margin: 2px 0;">Phone: ${sanitizeText(order.customer_phone)}</p>` : ''}
        </div>
        
        <div style="margin: 8px 0;">
          <p style="margin: 2px 0; font-weight: bold;">ORDER ITEMS:</p>
          ${order.items.map((item: any) => `
            <div style="margin: 4px 0; display: flex; justify-content: space-between;">
              <div style="flex: 1;">
                <p style="margin: 0; font-weight: bold;">${sanitizeText(item.name)}</p>
                <p style="margin: 0; font-size: 12px;">Qty: ${item.quantity}</p>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0;">$${item.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="border-top: 1px dashed #000; padding-top: 8px; margin-top: 8px;">
          <div style="display: flex; justify-content: space-between; margin: 2px 0;">
            <span>Subtotal:</span>
            <span>$${order.total.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 2px 0;">
            <span>Tax:</span>
            <span>$${order.tax_amount.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 2px 0; font-weight: bold; font-size: 16px; border-top: 1px solid #000; padding-top: 4px;">
            <span>TOTAL:</span>
            <span>$${order.grand_total.toFixed(2)}</span>
          </div>
        </div>
        
        ${order.estimated_wait_minutes ? `
          <div style="text-align: center; margin: 8px 0; padding: 4px; border: 1px solid #000;">
            <p style="margin: 0; font-weight: bold;">EST. WAIT TIME</p>
            <p style="margin: 0; font-size: 16px;">${order.estimated_wait_minutes} MINUTES</p>
            <p style="margin: 0; font-size: 12px;">Pickup: ${pickupTime}</p>
          </div>
        ` : ''}
        
        ${order.special_instructions ? `
          <div style="border-top: 1px dashed #000; padding-top: 8px; margin-top: 8px;">
            <p style="margin: 2px 0; font-weight: bold;">SPECIAL INSTRUCTIONS:</p>
            <p style="margin: 2px 0; font-size: 12px; word-wrap: break-word;">${sanitizeText(order.special_instructions)}</p>
          </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 12px; border-top: 2px solid #000; padding-top: 8px;">
          <p style="margin: 2px 0; font-size: 12px;">PAYMENT ON PICKUP</p>
          <p style="margin: 2px 0; font-size: 12px;">CASH & CARDS ACCEPTED</p>
        </div>
      </div>
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
        to: ['5stargrillorders@gmail.com'], // Using the verified email from Resend account
        subject: `Order #${order.id.slice(0, 8)} - 5 Star Grill`,
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
