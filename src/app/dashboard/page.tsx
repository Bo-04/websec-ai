// @ts-nocheck
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions as any);
  if (!session) {
    return (
      <main>
        <h1>Unauthorized</h1>
        <p>Please <a href="/api/auth/signin">sign in with GitHub</a> to continue.</p>
      </main>
    );
  }

  return (
    <main>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ marginBottom: 16 }}>Welcome, {session.user?.name ?? session.user?.email}.</p>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <Link href="/dashboard/sites" style={{ padding: "8px 12px", border: "1px solid #333", borderRadius: 8 }}>
          Manage Sites
        </Link>
        <a href="/api/auth/signout" style={{ padding: "8px 12px", border: "1px solid #333", borderRadius: 8 }}>
          Sign out
        </a>
      </div>

      <p>Next up: add a Site and wire the ingest endpoint.</p>
    </main>
  );
}
