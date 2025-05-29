
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

    // Prepare professional email content for full-size pages
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background-color: #f8f9fa;
          }
          .container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #d4af37;
            padding-bottom: 30px;
            margin-bottom: 40px;
          }
          .header h1 {
            color: #d4af37;
            font-size: 28px;
            margin: 0;
            font-weight: bold;
          }
          .header p {
            color: #666;
            margin: 10px 0 0 0;
            font-size: 16px;
          }
          .order-info {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 6px;
            margin-bottom: 30px;
            border-left: 4px solid #d4af37;
          }
          .order-info h2 {
            color: #333;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 20px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 15px 20px;
            align-items: center;
          }
          .info-label {
            font-weight: 600;
            color: #555;
          }
          .info-value {
            color: #333;
          }
          .items-section {
            margin-bottom: 30px;
          }
          .items-section h3 {
            color: #333;
            margin-bottom: 20px;
            font-size: 18px;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
          }
          .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
          }
          .item:last-child {
            border-bottom: none;
          }
          .item-details {
            flex: 1;
          }
          .item-name {
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
          }
          .item-quantity {
            color: #666;
            font-size: 14px;
          }
          .item-price {
            font-weight: 600;
            color: #d4af37;
            font-size: 16px;
          }
          .total-section {
            background-color: #d4af37;
            color: white;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
            margin-bottom: 30px;
          }
          .total-section h3 {
            margin: 0;
            font-size: 18px;
            font-weight: normal;
          }
          .total-amount {
            font-size: 24px;
            font-weight: bold;
            margin: 5px 0;
          }
          .special-instructions {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
          }
          .special-instructions h4 {
            color: #856404;
            margin-top: 0;
            margin-bottom: 10px;
          }
          .special-instructions p {
            color: #856404;
            margin: 0;
          }
          .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #eee;
          }
          @media print {
            body {
              background-color: white;
              padding: 0;
            }
            .container {
              box-shadow: none;
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>5 Star Grill</h1>
            <p>New Order Received</p>
          </div>

          <div class="order-info">
            <h2>Order Information</h2>
            <div class="info-grid">
              <span class="info-label">Order ID:</span>
              <span class="info-value">#${sanitizeText(order.id.slice(0, 8))}</span>
              
              <span class="info-label">Customer Email:</span>
              <span class="info-value">${sanitizeText(customerEmail)}</span>
              
              ${order.customer_phone ? `
                <span class="info-label">Customer Phone:</span>
                <span class="info-value">${sanitizeText(order.customer_phone)}</span>
              ` : ''}
              
              <span class="info-label">Status:</span>
              <span class="info-value">${sanitizeText(order.status.charAt(0).toUpperCase() + order.status.slice(1))}</span>
              
              <span class="info-label">Order Date:</span>
              <span class="info-value">${new Date(order.created_at).toLocaleString()}</span>
            </div>
          </div>

          <div class="items-section">
            <h3>Order Items</h3>
            ${order.items.map((item: any) => `
              <div class="item">
                <div class="item-details">
                  <div class="item-name">${sanitizeText(item.name)}</div>
                  <div class="item-quantity">Quantity: ${item.quantity}</div>
                </div>
                <div class="item-price">$${item.totalPrice.toFixed(2)}</div>
              </div>
            `).join('')}
          </div>

          <div class="total-section">
            <h3>Total Amount</h3>
            <div class="total-amount">$${order.grand_total.toFixed(2)}</div>
          </div>

          ${order.special_instructions ? `
            <div class="special-instructions">
              <h4>Special Instructions</h4>
              <p>${sanitizeText(order.special_instructions)}</p>
            </div>
          ` : ''}

          <div class="footer">
            <p>Please prepare this order for pickup as soon as possible.</p>
            <p><strong>5 Star Grill</strong> | 1681 Lakewood Rd, Toms River, NJ 08755 | (856) 559-4938</p>
          </div>
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
