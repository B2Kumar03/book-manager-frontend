import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";

const allBook = [
 
];

const BookList = () => {
  const [books, setBooks] = useState(allBook);
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  function filterByCategory(category) {
    setCategory(category);
    if (category === "All") {
      setBooks(allBook);
    } else {
      const filteredBooks = allBook.filter(
        (book) => book.category === category
      );
      setBooks(filteredBooks);
    }
  }
  function sortByPrice(sortedby) {
    if (sortedby === "asc") {
      console.log("asc");
      const sortedBooks = [...allBook].sort((a, b) => b.price - a.price);
      console.log(sortedBooks);
      setBooks(sortedBooks);
    }
    if (sortedby === "desc") {
      console.log("desc");
      const sortedBooks = [...allBook].sort((a, b) => a.price - b.price);
      setBooks(sortedBooks);
    }
  }
  useEffect(()=>{
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks([...allBook,...storedBooks]);
  },[])
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Book Collection
      </h1>
      <div className="flex justify-end gap-1.5 mb-4 border-b border-gray-300 pb-2">
        <div>
          <label
            htmlFor="category"
            className=" text-sm font-medium text-gray-700 "
          >
            Category
          </label>
          <select
            name="category"
            id=""
            className=" ml-1 border border-gray-300 rounded-md p-2"
            onChange={(e) => filterByCategory(e.target.value)}
            value={category}
          >
            <option value="All">All</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="price"
            className=" text-sm font-medium text-gray-700 "
          >
            Price
          </label>
          <select
            name="price"
            id=""
            className=" ml-1 border border-gray-300 rounded-md p-2"
            onChange={(e) => sortByPrice(e.target.value)}
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
        <div>
          <button onClick={() => navigate("/add-book")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Book
          </button>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {books.map((book, index) => (
          <BookCard key={index} book={book} index={index} total={books.length} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
