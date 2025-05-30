
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

    // Ultra-compact thermal printer optimized email content for single 4x6 page
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @media print {
            @page {
              size: 4in 6in;
              margin: 0.1in;
            }
          }
          body {
            font-family: 'Courier New', monospace;
            line-height: 1.0;
            color: #000;
            width: 3.8in;
            margin: 0;
            padding: 0.1in;
            background-color: white;
            font-size: 9px;
          }
          .header {
            text-align: center;
            border-bottom: 1px solid #000;
            padding-bottom: 3px;
            margin-bottom: 5px;
            margin-top: 40px;
            padding-top: 20px;
          }
          .header h1 {
            font-size: 14px;
            font-weight: bold;
            margin: 0;
            letter-spacing: 1px;
          }
          .header p {
            font-size: 8px;
            margin: 1px 0 0 0;
            font-weight: bold;
          }
          .order-info {
            margin-bottom: 5px;
            border: 1px solid #000;
            padding: 3px;
          }
          .order-info h2 {
            font-size: 10px;
            font-weight: bold;
            margin: 0 0 3px 0;
            text-decoration: underline;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1px;
            font-size: 8px;
          }
          .info-label {
            font-weight: bold;
          }
          .info-value {
            text-align: right;
            max-width: 60%;
            word-wrap: break-word;
          }
          .items-section {
            margin-bottom: 5px;
          }
          .items-section h3 {
            font-size: 10px;
            font-weight: bold;
            margin: 0 0 3px 0;
            text-decoration: underline;
            border-bottom: 1px solid #000;
            padding-bottom: 1px;
          }
          .item {
            border-bottom: 1px dashed #000;
            padding: 2px 0;
            font-size: 8px;
          }
          .item:last-child {
            border-bottom: none;
          }
          .item-name {
            font-weight: bold;
            margin-bottom: 1px;
          }
          .item-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .item-quantity {
            font-size: 8px;
          }
          .item-price {
            font-weight: bold;
            font-size: 9px;
          }
          .total-section {
            border: 2px solid #000;
            padding: 4px;
            text-align: center;
            margin-bottom: 5px;
            background-color: #000;
            color: white;
          }
          .total-section h3 {
            margin: 0;
            font-size: 9px;
            font-weight: normal;
          }
          .total-amount {
            font-size: 14px;
            font-weight: bold;
            margin: 1px 0;
            letter-spacing: 1px;
          }
          .special-instructions {
            border: 1px solid #000;
            padding: 3px;
            margin-bottom: 5px;
            background-color: #f5f5f5;
          }
          .special-instructions h4 {
            font-size: 9px;
            font-weight: bold;
            margin: 0 0 2px 0;
            text-decoration: underline;
          }
          .special-instructions p {
            font-size: 8px;
            margin: 0;
            word-wrap: break-word;
          }
          .footer {
            text-align: center;
            font-size: 7px;
            margin-top: 5px;
            padding-top: 3px;
            border-top: 1px solid #000;
          }
          .footer p {
            margin: 1px 0;
          }
          .cut-line {
            border-top: 1px dashed #000;
            margin: 5px 0;
            text-align: center;
            font-size: 6px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>5 STAR GRILL</h1>
          <p>*** NEW ORDER ***</p>
        </div>

        <div class="order-info">
          <h2>ORDER DETAILS</h2>
          <div class="info-row">
            <span class="info-label">Order #:</span>
            <span class="info-value">${sanitizeText(order.id.slice(0, 8))}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Customer:</span>
            <span class="info-value">${sanitizeText(customerEmail)}</span>
          </div>
          ${order.customer_phone ? `
            <div class="info-row">
              <span class="info-label">Phone:</span>
              <span class="info-value">${sanitizeText(order.customer_phone)}</span>
            </div>
          ` : ''}
          <div class="info-row">
            <span class="info-label">Status:</span>
            <span class="info-value">${sanitizeText(order.status.charAt(0).toUpperCase() + order.status.slice(1))}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Time:</span>
            <span class="info-value">${new Date(order.created_at).toLocaleString()}</span>
          </div>
        </div>

        <div class="items-section">
          <h3>ITEMS ORDERED</h3>
          ${order.items.map((item: any) => `
            <div class="item">
              <div class="item-name">${sanitizeText(item.name)}</div>
              <div class="item-details">
                <span class="item-quantity">Qty: ${item.quantity}</span>
                <span class="item-price">$${item.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="total-section">
          <h3>TOTAL</h3>
          <div class="total-amount">$${order.grand_total.toFixed(2)}</div>
        </div>

        ${order.special_instructions ? `
          <div class="special-instructions">
            <h4>INSTRUCTIONS</h4>
            <p>${sanitizeText(order.special_instructions)}</p>
          </div>
        ` : ''}

        <div class="footer">
          <p><strong>5 STAR GRILL</strong></p>
          <p>1681 Lakewood Rd, Toms River, NJ</p>
          <p>(856) 559-4938</p>
        </div>

        <div class="cut-line">
          ✂ - - - - - - - - - - - - - - - - - - - ✂
        </div>
      </body>
      </html>
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
