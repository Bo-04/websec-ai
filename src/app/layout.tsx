export const metadata = { title: "WebSec AI" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ maxWidth: 960, margin: "0 auto", padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
        {children}
      </body>
    </html>
  );
}
