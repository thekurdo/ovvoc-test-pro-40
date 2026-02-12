import { cookies, headers } from 'next/headers';

export default function HomePage() {
  const cookieStore = cookies();
  const headersList = headers();
  const theme = cookieStore.get('theme')?.value || 'light';
  const userAgent = headersList.get('user-agent') || 'unknown';

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Theme: {theme}</p>
      <p>Agent: {userAgent}</p>
    </main>
  );
}
