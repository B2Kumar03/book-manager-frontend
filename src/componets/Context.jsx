import { createContext, useState } from "react";


export const BookContext=createContext()

export const Context = ({children}) => {
    const [book,setContext]=useState()
    return (
        <BookContext.Provider value={{book,setContext}}>
            {children}
        </BookContext.Provider>
    )
}

