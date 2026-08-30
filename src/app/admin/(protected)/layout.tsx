import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { logout } from "@/app/admin/login/actions";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdmin();
  if (!authed) redirect("/admin/login");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
      <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/admin" className="font-semibold text-foreground">
            Dashboard
          </Link>
          <Link href="/admin/posts/new" className="text-muted hover:text-foreground">
            New post
          </Link>
          <Link href="/admin/subscribers" className="text-muted hover:text-foreground">
            Subscribers
          </Link>
          <Link href="/" className="text-muted hover:text-foreground">
            View site
          </Link>
        </nav>
        <form action={logout}>
          <button type="submit" className="text-sm text-muted hover:text-foreground">
            Log out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
