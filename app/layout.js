
export const metadata = {
  title: "ScalePilot Dashboard",
  description: "AI-driven scale-up insights"
};
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-6xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
