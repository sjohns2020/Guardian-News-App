import { useState, useEffect} from 'react'
import DisplayNews from '../components/DisplayNews'
import NewsSearch from '../components/NewsSearch'
import SearchedNews from '../components/SearchedNews'


const NewsBox = () => {

  const [GNews, setGNews] = useState([])
  const [sections, setSections] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [searchedNews, setSearchedNews] = useState([])
  const [filteredSearchedNews, setFilteredSearchedNews] = useState([])
  



    // promise for Guardian API
  const getGNews = () => {
    fetch("https://content.guardianapis.com/search?q=latest&format=json&api-key=test")
      .then(res => res.json())
      .then(data => setGNews(data.response.results))
  }
  useEffect(() => {
    getGNews()
  }, [])


    // promis for guardian API with defined search
  const searchedGNews = () => {
    fetch(`https://content.guardianapis.com/search?q=${newSearch}&format=json&api-key=test`)
      .then(res => res.json())
      .then(data => setSearchedNews(data.response.results))
  }
  useEffect(() => {
    searchedGNews()
  }, [newSearch])

  // Get bespoke list of article types to filter search results
  const getSections = function() {
    const chosenSections = GNews.map((article) => article.sectionName)
    const newSecs = chosenSections.filter((section, index, arr) => {
        return arr.indexOf(section) === index;
    })
    setSections(newSecs)
  }
  useEffect(() => {
    getSections()
  }, [GNews])

  // funtion to handle search term
  const onSearchSubmit = function(searchTerm){
    setNewSearch(searchTerm)
  }

  // function to handle filter of search results
  const handleFilterClick = function(sectionName){
    //   const clonedList = [...searchedNews]
      const filteredList = searchedNews.filter((article) => {
          return article.sectionName === sectionName
        })
    setFilteredSearchedNews(filteredList)
  }


  return (
    <>
      <h2 style={{margin: "10px"}}>Guardian News Headlines</h2>
      <div className="display-news">
      <DisplayNews GNews={GNews} searchedNews={searchedNews}  />
      </div>
      <hr />
      <h2 style={{margin: "10px"}}>Search Your News</h2>
      <NewsSearch GNews={GNews} sections={sections} onSearchSubmit={onSearchSubmit}/>
      <SearchedNews GNews={GNews} searchedNews={searchedNews} newSearch={newSearch} handleFilterClick={handleFilterClick} filteredSearchedNews={filteredSearchedNews}/>
    </>
  )
}

export default NewsBox;
