import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { listSubscribers } from "@/lib/subscribers";

function csvEscape(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) {
    return new NextResponse("Não autorizado.", { status: 401 });
  }

  const subscribers = await listSubscribers();
  const rows = ["email,inscrito_em"];
  for (const s of subscribers) {
    rows.push(`${csvEscape(s.email)},${csvEscape(s.createdAt.toISOString())}`);
  }

  return new NextResponse(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="assinantes.csv"`,
    },
  });
}
