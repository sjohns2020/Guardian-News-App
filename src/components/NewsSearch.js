import React, {useState} from "react"
const NewsSearch = ({ GNews, onSearchSubmit }) => {

    const[searchTerm, setSearchTerm] = useState('')
  
    const onChange = function(event) {
        setSearchTerm(event.target.value)
    }

    const onSubmit = function(event) {
        event.preventDefault();
        const searchWord = searchTerm.trim()
        onSearchSubmit(searchWord)
        setSearchTerm('')
    }


    return (
      <div className="search-bar">
            <form onSubmit={onSubmit}>
            <label htmlFor="input">Find your news</label>
            <input className="input" type="input" id="input" onChange={onChange}  />
            <input type="submit" value="Search" />
                
            </form>
      </div>
    )
  }
  
  export default NewsSearch;