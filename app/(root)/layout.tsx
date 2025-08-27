import { Inter } from "next/font/google";
import RootProvider from "../../providers/RootProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans flex flex-col max-w-screen`}>
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
