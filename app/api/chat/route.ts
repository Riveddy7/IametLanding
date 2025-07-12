/**
 * Chat API endpoint for IAMET Zebra AI Assistant "Zara"
 * This endpoint is no longer needed as we use n8n chat widget directly.
 * Keeping for potential future direct API integrations.
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST handler - returns not implemented as we use n8n widget directly
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json(
    { 
      error: 'Not implemented',
      message: 'Chat functionality is now handled by n8n widget directly.'
    },
    { status: 501 }
  );
}

/**
 * GET handler for health check
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'IAMET Zebra Chat API Client',
  });
}
