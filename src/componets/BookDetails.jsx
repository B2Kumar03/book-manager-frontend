import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const BookDetails = () => {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const navigate = useNavigate();

  const selectedBook = books.find(book => book.title === decodedTitle);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSuggestions = async () => {
      if (!selectedBook) return;
      setLoading(true);

      try {
        const response = await fetch('https://recomendator.onrender.com/generate-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: selectedBook.title,
            author: selectedBook.author
          })
        ,},[]);

        const data = await response.json();
         console.log(data);
        // Expecting: [{ title: '...', author: '...' }, ...]
        if (Array.isArray(data)) {
          setAiSuggestions(data);
        } else {
          console.warn('Unexpected response format:', data);
        }
      } catch (err) {
        console.error('AI suggestion fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    getSuggestions();
  }, [selectedBook]);

  if (!selectedBook) {
    return <div className="p-6 text-center text-red-600 text-xl">Book not found.</div>;
  }

  const recommendedBooks = books.filter(
    (book) => book.genre === selectedBook.genre && book.title !== selectedBook.title
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Go back
      </button>

      <h1 className="text-3xl font-bold mb-4 text-blue-800">{selectedBook.title}</h1>
      <p className="text-gray-700"><strong>Author:</strong> {selectedBook.author}</p>
      <p className="text-gray-700"><strong>Genre:</strong> {selectedBook.genre}</p>
      <p className="text-gray-700"><strong>Price:</strong> ${selectedBook.price}</p>
      {selectedBook.description && (
        <p className="text-gray-700 mt-4"><strong>Description:</strong> {selectedBook.description}</p>
      )}

      {/* 🔁 Same Genre Recommendations */}
      {recommendedBooks.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Recommended Books (Same Genre)</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {recommendedBooks.map((book, index) => (
              <Link
                to={`/book/${encodeURIComponent(book.title)}`}
                key={index}
                className="border p-4 rounded shadow hover:shadow-lg bg-white"
              >
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-sm text-gray-600">Author: {book.author}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* 🤖 AI Recommendations */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">🤖 AI Recommendations</h2>
        {loading ? (
          <p className="text-gray-600">Loading AI suggestions...</p>
        ) : aiSuggestions.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {aiSuggestions.map((book, index) => (
              <div key={index} className="border p-4 rounded bg-gray-100 shadow">
                <h3 className="font-bold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-700">Author: {book.author}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No AI suggestions found.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
