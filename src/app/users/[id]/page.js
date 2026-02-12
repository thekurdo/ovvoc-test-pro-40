export default function UserPage({ params }) {
  const { id } = params;

  return (
    <div>
      <h1>User {id}</h1>
      <p>User details for ID: {id}</p>
    </div>
  );
}
