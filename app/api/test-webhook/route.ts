/**
 * Test endpoint to verify n8n webhook connectivity
 */

import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = 'https://riveddy7.app.n8n.cloud/webhook/5a6d3896-65ca-4b5e-ab47-2be3e7b7af63';

/**
 * POST handler to test webhook
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    
    console.log('Testing n8n webhook with payload:', body);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: body.message || 'Test message from IAMET chat',
        sessionId: body.sessionId || 'test-session',
        timestamp: new Date().toISOString(),
        source: 'test-endpoint',
      }),
    });

    const responseText = await response.text();
    console.log('n8n webhook response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText,
    });

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { rawResponse: responseText };
    }

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: responseData,
      webhookUrl: N8N_WEBHOOK_URL,
    });

  } catch (error) {
    console.error('Webhook test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      webhookUrl: N8N_WEBHOOK_URL,
    }, { status: 500 });
  }
}

/**
 * GET handler for health check
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'healthy',
    webhookUrl: N8N_WEBHOOK_URL,
    timestamp: new Date().toISOString(),
  });
}