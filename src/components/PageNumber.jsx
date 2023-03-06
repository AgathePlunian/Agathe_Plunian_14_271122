import { useEffect } from "react";

/**
* Function rendering number of navigation pages buttons
* @param {number} limitedValue -  Number of rows shown in table
* @param {number} allEntries - Number of all entries to be show
* @param {function} changePage - Function handle navigation with buttons to select number of page
* @param {function} navPage -Function handle navigation with buttons "previous" , "next"
* @returns {Array} To show
*/
function PageNumber({limitedValue, allEntries, changePage, navPage, search, DataToShow}) {
  let numberOfpages;

  if(search == true) {
     numberOfpages = Math.ceil(DataToShow.length / limitedValue);
  }

  else {
    numberOfpages = Math.ceil(allEntries / limitedValue);
  }

  let content = [];
  
  
  for(let i = 0; i < numberOfpages ; i++) {
    if(i == 0) {
      content.push(<li className="btn-page-item" key={i}><button type="button" className="btn-page current-page" onClick={event => changePage(event)}>{i + 1}</button ></li>); 
    }
    else {
      content.push(<li className="btn-page-item" key={i}><button onClick={event => changePage(event)} type="button" className="btn-page">{i + 1}</button></li>); 
    }
  }
   
  useEffect(() => {
    let currentPage = document.getElementsByClassName("current-page")[0].innerHTML;

    if(currentPage == 1) {
      document.getElementsByClassName("btn-prev")[0].classList.add("disabled")
    }   
  }, []);

  return (
    <ul className="btn-page-container">
      <li className="btn-page-item"><button type="button" className={`btn-prev  ${numberOfpages == 1 ? "disabled" : ""}`} onClick={event => navPage(event)}>Previous</button></li>
      {content}
      <li className="btn-page-item"><button type="button" className={`btn-next ${numberOfpages == 1 ? "disabled" : ""}`} onClick={event => navPage(event)}>Next</button></li>
    </ul>
  )
}

export default PageNumber