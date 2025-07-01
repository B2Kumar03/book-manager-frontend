import React from 'react';

const BookCard = ({ book,index,total}) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 w-full max-w-sm hover:shadow-xl transition-shadow">
      <h2 className="text-xl font-bold mb-2 text-blue-700">{book.title}</h2>
      <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Author:</span> {book.author}</p>
      <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Genre:</span> {book.genre}</p>
      <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Price:</span> ${book.price}</p>
   
      <button onClick={() => window.location.href = `/book/${encodeURIComponent(book.title)}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">View Details</button>
    </div>
  );
};

export default BookCard;
