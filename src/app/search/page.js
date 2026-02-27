export default function SearchPage({ searchParams }) {
  const query = searchParams.q || '';
  const page = searchParams.page || '1';

  return (
    <div>
      <h1>Search Results</h1>
      <p>Query: {query}</p>
      <p>Page: {page}</p>
    </div>
  );
}
