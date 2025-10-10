// @ts-nocheck
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { db } from "@/lib/db";

export default async function SitesPage() {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) {
    return (
      <main>
        <h1>Unauthorized</h1>
        <p>Please <a href="/api/auth/signin">sign in</a> first.</p>
      </main>
    );
  }

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) return <main><h1>User not found</h1></main>;

  const sites = await db.site.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Your Sites</h1>

      <form action="/dashboard/sites/new" method="post" style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input name="name" placeholder="Site name" required
               style={{ padding: 8, border: "1px solid #333", borderRadius: 8 }} />
        <input name="url" placeholder="https://example.com" required
               style={{ padding: 8, border: "1px solid #333", borderRadius: 8, minWidth: 280 }} />
        <button type="submit" style={{ padding: "8px 12px", border: "1px solid #333", borderRadius: 8 }}>
          Add Site
        </button>
      </form>

      {sites.length === 0 ? (
        <p>No sites yet. Add your first one above.</p>
      ) : (
        <ul style={{ display: "grid", gap: 10, listStyle: "none", padding: 0 }}>
          {sites.map(s => (
            <li key={s.id} style={{ border: "1px solid #333", borderRadius: 10, padding: 12 }}>
              <div style={{ fontWeight: 600 }}>{s.name}</div>
              <div style={{ color: "#666" }}>{s.url}</div>
              <div style={{ marginTop: 6, fontSize: 12 }}>
                <code>SITE_TOKEN: {s.token}</code>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
