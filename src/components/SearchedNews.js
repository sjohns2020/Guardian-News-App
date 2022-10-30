import React, {useState} from "react"
const SearchedNews = ({ GNews, searchedNews, newSearch, handleFilterClick, filteredSearchedNews }) => {

    // setting state to handle wahts displayed if filter is applied
    const [filtered , setFiltered] = useState(false)

    // No searched yet? then just display this message
    if (newSearch == null || newSearch.length === 0 ) {
      return <p style={{margin: "10px"}}>Use the search box to search for your news</p>
    }
    
    // render nodes based on search 
    const newsNodes = searchedNews.map((article) => {
        return (
        <li key={article.id} className="new-article-li">
        <div className="news-block">
            <p>{article.sectionName}</p>
            <a className="a-link" href={article.webUrl}>{article.webTitle}</a>
            <p>Published: {article.webPublicationDate}</p>
        </div>
        </li>
      )
    })
    // render nodes based on search and filter
    const filteredNewsNodes = filteredSearchedNews.map((article) => {

        return (
           
          <li key={article.id} className="new-article-li">
          <div className="news-block">
              <p>{article.sectionName}</p>
              <a className="a-link" href={article.webUrl}>{article.webTitle}</a>
              <p>Published: {article.webPublicationDate}</p>
          </div>
          </li>
        )})
    
   // handle filtering from filter buttons
    const onFilterClick = function(event) {
        handleFilterClick(event.target.value)
        setFiltered(true)

    }
    
    // create list of section types generated from search results
    const filterSectionNames = searchedNews.map((article) => {
      return article.sectionName
    }).filter((sectionName, i, arr) => {
      return arr.indexOf(sectionName) === i
    })

        // create filter buttons from the section types generated from search results   
    const sectionNodes = filterSectionNames.map((section) => {
      return (
        <li key={section} className="section-li">
        <button onClick={onFilterClick} value={section}>{section}</button>
         </li>
      )
    })
    // if no filter is applied show whole searched list otherwise sho filtered list.
    const newsToDisplay = !filtered ? newsNodes : filteredNewsNodes 


    return (
      <>
        <p style={{margin: "10px"}}  >Showing search Results for <strong> '{newSearch}' </strong></p>
        <hr />
        <div className="filter-div">
            Filter search by:
            <ul className="filter-sections">
                {sectionNodes}
            </ul>
        </div>
        <div>
            <ul>
             {newsToDisplay}
             {filtered ? <button onClick={() => setFiltered(false)}>Remove Filter</button> : null}
            </ul>
        </div>
      </>
    )
  }
  
  export default SearchedNews;