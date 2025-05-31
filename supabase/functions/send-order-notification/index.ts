import { serve } from '@supabase/functions-js';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.');
  process.exit(1);
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderId, customerEmail } = await req.json();
    console.log('Processing order notification:', { orderId, customerEmail });

    if (!orderId || !customerEmail) {
      console.error('Missing orderId or customerEmail in request.');
      return new Response(JSON.stringify({ error: 'Missing orderId or customerEmail' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
      },
    });

    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError) {
      console.error('Error fetching order:', orderError);
      return new Response(JSON.stringify({ error: 'Failed to fetch order' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!order) {
      console.error('Order not found:', orderId);
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const orderItems = (order.items || []).map((item: any) => ({
      quantity: item.quantity,
      name: item.name,
      totalPrice: item.totalPrice,
      customizations: item.customizations || [],
    }));

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Order Receipt - 5 Star Grill</title>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h1>5 STAR GRILL</h1>
              <p>1814 Route 37 East, Toms River, NJ 08753</p>
              <p>Phone: (732) 736-7827</p>
            </div>
            
            <div class="order-info">
              <h2>ORDER RECEIPT</h2>
              <div class="info-row">
                <span class="info-label">Order #:</span>
                <span>${order.id.substring(0, 8).toUpperCase()}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Date:</span>
                <span>${new Date(order.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Status:</span>
                <span>${order.status?.toUpperCase() || 'PENDING'}</span>
              </div>
              ${order.pickup_time ? `
                <div class="info-row">
                  <span class="info-label">Pickup Time:</span>
                  <span>${new Date(order.pickup_time).toLocaleString('en-US')}</span>
                </div>
              ` : ''}
            </div>

            <div class="items-section">
              <h3>ORDER ITEMS</h3>
              ${orderItems.map(item => `
                <div class="item">
                  <div class="item-header">
                    <span class="item-quantity">${item.quantity}x</span>
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${item.totalPrice.toFixed(2)}</span>
                  </div>
                  ${item.customizations && item.customizations.length > 0 ? `
                    <div class="item-customizations">
                      ${item.customizations.map(custom => `
                        <div class="customization">+ ${custom.name} (+$${custom.price.toFixed(2)})</div>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>

            <div class="totals-section">
              <h3>ORDER TOTAL</h3>
              <div class="total-row subtotal">
                <span>Subtotal:</span>
                <span>$${order.total.toFixed(2)}</span>
              </div>
              <div class="total-row tax">
                <span>Tax (6.625%):</span>
                <span>$${order.tax_amount.toFixed(2)}</span>
              </div>
              <div class="total-row grand-total">
                <span>Grand Total:</span>
                <span>$${order.grand_total.toFixed(2)}</span>
              </div>
            </div>

            ${order.special_instructions ? `
              <div class="special-instructions">
                <h4>Special Instructions:</h4>
                <p>${order.special_instructions}</p>
              </div>
            ` : ''}

            <div class="footer">
              <p>Thank you for choosing 5 Star Grill!</p>
              <p>We appreciate your business!</p>
            </div>

            <div class="cut-line">
              ✂️ CUT HERE ✂️
            </div>
          </div>

        <style>
          .receipt {
            font-family: 'Courier New', monospace;
            max-width: 3in;
            margin: 0;
            padding: 0.1in;
            background-color: white;
            font-size: 11px;
          }
          .header {
            text-align: center;
            border-bottom: 1px solid #000;
            padding-bottom: 3px;
            margin-bottom: 5px;
            margin-top: 10px;
            padding-top: 20px;
          }
          .header h1 {
            font-size: 17px;
            font-weight: bold;
            margin: 0;
            letter-spacing: 1px;
          }
          .header p {
            font-size: 10px;
            margin: 1px 0 0 0;
            font-weight: bold;
          }
          .order-info {
            border-bottom: 1px solid #000;
            margin-bottom: 5px;
            padding: 3px;
          }
          .order-info h2 {
            font-size: 12px;
            font-weight: bold;
            margin: 0 0 3px 0;
            text-decoration: underline;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1px;
            font-size: 10px;
          }
          .info-label {
            font-weight: bold;
          }
          .items-section {
            border-bottom: 1px solid #000;
            margin-bottom: 5px;
            padding: 3px;
          }
          .items-section h3 {
            font-size: 12px;
            font-weight: bold;
            margin: 0 0 3px 0;
            text-decoration: underline;
          }
          .item {
            border-bottom: 1px dashed #000;
            padding: 2px 0;
            font-size: 10px;
          }
          .item:last-child {
            border-bottom: none;
          }
          .item-header {
            display: flex;
            justify-content: space-between;
            gap: 5px;
          }
          .item-name {
            flex-grow: 1;
            text-align: center;
            align-items: center;
          }
          .item-quantity {
            font-size: 10px;
          }
          .item-price {
            font-weight: bold;
            font-size: 11px;
          }
          .totals-section {
            border: 1px solid #000;
            padding: 3px;
            margin-bottom: 5px;
          }
          .totals-section h3 {
            margin: 0 0 3px 0;
            font-size: 11px;
            font-weight: bold;
            text-decoration: underline;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
            font-size: 10px;
          }
          .total-row.subtotal {
            font-weight: normal;
          }
          .total-row.tax {
            font-weight: normal;
          }
          .total-row.grand-total {
            font-weight: bold;
            font-size: 12px;
            border-top: 1px solid #000;
            padding-top: 2px;
            margin-top: 3px;
          }
          .special-instructions {
            border: 1px solid #000;
            padding: 3px;
            margin-bottom: 5px;
            background-color: #f5f5f5;
          }
          .special-instructions h4 {
            font-size: 11px;
            font-weight: bold;
            margin: 0 0 2px 0;
            text-decoration: underline;
          }
          .special-instructions p {
            font-size: 10px;
            margin: 0;
            word-wrap: break-word;
          }
          .footer {
            text-align: center;
            font-size: 8px;
            margin-top: 5px;
            padding-top: 3px;
            border-top: 1px solid #000;
            font-weight: bold;
          }
          .cut-line {
            text-align: center;
            border-top: 1px dashed #000;
            margin: 5px 0;
            text-align: center;
            font-size: 7px;
            color: #666;
          }
        </style>
        </body>
      </html>
    `;

    const { error: emailError } = await supabaseClient.functions.invoke('send-email', {
      body: {
        to: customerEmail,
        subject: `5 Star Grill - Order Receipt #${order.id.substring(0, 8).toUpperCase()}`,
        html: emailHtml,
      },
    });

    if (emailError) {
      console.error('Error sending email:', emailError);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Order notification processed successfully' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Function execution error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
