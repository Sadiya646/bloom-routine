
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // Shob page-e toast show korar jonno

export const metadata: Metadata = {
  title: "Bloom Routine | Your Little Productivity Space",
  description:
    "Plan your day, build healthy habits, and make every little moment count with Bloom Routine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Toast-er position, color ebong animation setup */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#fffaff",
              color: "#49365f",
              border: "1px solid #eee5ff",
              borderRadius: "16px",
              padding: "14px 18px",
              fontFamily: "Nunito, sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#8b6bd6",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
