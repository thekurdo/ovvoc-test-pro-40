export const metadata = {
  title: 'Dashboard App',
  description: 'Next.js 14 dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
