import {Link} from 'react-router-dom'

function Desk(props){
    return (
        
        <div>
            <h1>Desk</h1>

            <Link to='/desk/bookshelf'>
                <h2>Book Shelf</h2>
            </Link>

            <Link to='/desk/library'>
                <h2>Library</h2>
            </Link>
        </div>

    )
}

export default Desk