import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'

function BookShelf(){

    const [books, setBooks] = useState([])
    let navigate = useNavigate()
    

    // fetching books from backend
    const handleFetch = async () => {  

        const URL = "http://localhost:8000/bookshelf"
        fetch(URL)
        .then(resp=>{
            console.log(resp)
            return resp.json()
        })
        .then(data=>{
            console.log(data)
            setBooks(data)            
        })
    
    }

    useEffect(()=>{
        handleFetch()
    }, [])


    //Post fetch to Backend //
    const addBook = async (data) =>{
        const URL = "http://localhost:8000/desk/"
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            console.log('data inside addBook', data)
            const addedBook = await fetch(URL,options)
            // console.log(addedBook)
            const parsedBooks = await addedBook.json()
            console.log(parsedBooks)
            setBooks([...books, parsedBooks])
            navigate('/desk')
                
        }catch(err){
            console.log(err)
        }
    }

    // handleClick //
    const handleClick = ({title, authors, description, imageLinks})=>{
        addBook({title, authors: authors[0], description, imageLinks: imageLinks.thumbnail})
    }

    // Delete backend //
    const deleteBook = async (id) => {
        console.log("Deleting id:", id)
        const deleteId = id._id
        const URL = `http://localhost:8000/bookshelf/${deleteId}`
        console.log(URL) 
        
        try {
          fetch(URL, {method: 'DELETE'})
          .then(resp=>{
              console.log(resp)
              return resp.json()
          })
          .then(deleteBook =>{
            console.log('Deleted: ', deleteBook)
    
            const updatedBookList = books.filter(book=>book._id !== deleteBook._id)
            setBooks(updatedBookList)
          })
    
    
        }catch(err){
            console.log(err)
        }
    
      }

     // deleteHandleClick //
     const deleteHandleClick = (_id)=>{
        deleteBook(_id)
    }

    return (
        
        <div>
            <header className='header'>
                <h1 className="header__title">Book Shelf</h1>
            </header>

            {books &&
                books.map((book, index) => (
                    <div className='bookResult' key={book.id}>                 
                           
                        <button onClick={() => handleClick(book)}>
                            Add to Desk
                        </button>
                        <button onClick={() => deleteHandleClick(book)}>
                            Remove Book
                        </button>
                        
                        <h2>
                            {index+1}. {' '}
                            {book.title} 
                        </h2>
                        
                        <h3>
                            {'By: '}
                            {book.authors}
                        </h3>
                        <img 
                            src={book.imageLinks} 
                            alt={book.title}
                        />
                        <p>{book.description}</p>                      
                                                   
                    </div>
                ))
            }
            

                <Link to='/desk/library'>
                    <h2>Library</h2>
                </Link>
                <Link to='/desk'>
                    <h2>Desk</h2>
                </Link>
        </div>

    )
}

export default BookShelf