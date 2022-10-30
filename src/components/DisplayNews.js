const DisplayNews = ({ GNews, searchedNews }) => {

    if (!GNews) {
      return null
    }

    // Display the top new stories in the header
    const newsNodes = GNews.map((article) => {
      return (
        <li key={article.id} className="headlines" >
        <div className="li-div" >
            <h5>{article.sectionName}</h5>
            <a className="a-link" href={article.webUrl}>{article.webTitle}</a>
            <p>Published: {article.webPublicationDate}</p>
        </div>
        </li>
      )
    })

    return (
      <>
        <div className="ul-div">
            <ul className="ul">
            {newsNodes}
            </ul>
        </div>
      </>
    )
  }
  
  export default DisplayNews;