import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Validation schema
const bookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  price: Yup.number()
    .required("Price is required")
    .moreThan(0, "Price must be greater than 0"),
  description: Yup.string(),
});

const AddBook = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

    const updatedBooks = [...storedBooks, values];
    localStorage.setItem("books", JSON.stringify([updatedBooks]));

    resetForm();
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md mt-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>
      <Formik
        initialValues={{
          title: "",
          author: "",
          genre: "",
          price: "",
          description: "",
        }}
        validationSchema={bookSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label className="block font-semibold">Title</label>
              <Field name="title" className="w-full border p-2 rounded" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold">Author</label>
              <Field name="author" className="w-full border p-2 rounded" />
              <ErrorMessage
                name="author"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold">Genre</label>
              <Field name="genre" className="w-full border p-2 rounded" />
              <ErrorMessage
                name="genre"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold">Price</label>
              <Field
                name="price"
                type="number"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold">Description</label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                className="w-full border p-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Book
            </button>
            <button
              type="reset"
              onClick={() => navigate("/")}
              className="bg-gray-300 ml-2 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBook;
