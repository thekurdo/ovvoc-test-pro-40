import { cookies } from 'next/headers';

export default function ProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value;
  const isLoggedIn = !!token;

  return (
    <div>
      <h1>Profile</h1>
      <p>{isLoggedIn ? 'Logged in' : 'Not logged in'}</p>
    </div>
  );
}
