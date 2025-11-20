import { NextRequest, NextResponse } from 'next/server';
import {
  addToReadingList,
  getBookDetails,
  getReadingList,
  getReadingStats,
  markAsRead,
  searchBooks,
} from '../../../../src/server/tools';

const TOOL_MAP = {
  searchBooks,
  getBookDetails,
  addToReadingList,
  getReadingList,
  markAsRead,
  getReadingStats,
};

type ToolName = keyof typeof TOOL_MAP;

const getUserId = (request: NextRequest) => request.headers.get('x-user-id') ?? 'demo-user';

export async function POST(request: NextRequest, { params }: { params: { tool: ToolName } }) {
  const toolName = params.tool;
  if (!toolName || !(toolName in TOOL_MAP)) {
    return NextResponse.json({ error: 'Herramienta no permitida' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const userId = getUserId(request);
    const executor = TOOL_MAP[toolName];
    const result =
      toolName === 'searchBooks' || toolName === 'getBookDetails'
        ? await executor(body)
        : await executor(body, userId);

    return NextResponse.json({ tool: toolName, result });
  } catch (error: any) {
    const message =
      error?.issues?.[0]?.message ||
      error?.message ||
      'No pudimos procesar la solicitud. Verifica los parámetros e intenta nuevamente.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({
    tools: Object.keys(TOOL_MAP),
    usage: 'Envía un POST con JSON válido a /api/tools/{toolName}',
  });
}
