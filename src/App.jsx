
import { Route, Routes } from 'react-router-dom'
import './App.css'
import BookList from './componets/BookList'
import AddBook from './componets/AddBook'
import BookDetails from './componets/BookDetails'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<BookList />} />

        <Route path="/add-book" element={<AddBook />} />
        <Route path="/book/:title" element={<BookDetails />} />
      </Routes>
    </>
  )
}

export default App
