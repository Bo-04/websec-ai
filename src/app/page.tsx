import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>WebSec AI</h1>
      <p style={{ marginBottom: 24 }}>
        Scan → explain → fix (auto-PRs) and a 24/7 mini-SOC. Sign in to get started.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <a href="/api/auth/signin" style={{ padding: "10px 14px", border: "1px solid #333", borderRadius: 8 }}>Sign in with GitHub</a>
        <Link href="/dashboard" style={{ padding: "10px 14px", border: "1px solid #333", borderRadius: 8 }}>Go to dashboard</Link>
      </div>
    </main>
  );
}
