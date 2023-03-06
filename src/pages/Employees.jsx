import { NavLink } from 'react-router-dom';
import TableEmployees from '../components/TableEmployees';
import PageNumber from '../components/PageNumber';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import iconHome from '../img/home.svg'

function Employees() {

  let storeData = useSelector((state) => state.employeeStore.employeesArray);
  const [dataToShow, setDataToShow] = useState(storeData.slice(0, 10));
  const [limitedValue, setEntries] = useState(10);
  const [searchActive, setSearch] = useState(false);
  
  let numberOfEntries = storeData.length;

  /*
   * Function to handle desabled buttons previous and next on navigation
   */
  function handleNavDisabled() {  
    let currentPage = document.getElementsByClassName("current-page")[0].innerHTML;
    let numberOfpages = document.getElementsByClassName("btn-page").length;

    if(currentPage == 1) {
      document.getElementsByClassName("btn-prev")[0].classList.add("disabled")
    }

    else {
      document.getElementsByClassName("btn-prev")[0].classList.remove("disabled")
    }

    if(currentPage == numberOfpages) {
      document.getElementsByClassName("btn-next")[0].classList.add("disabled")
    }

    else {
      document.getElementsByClassName("btn-next")[0].classList.remove("disabled")
    }
  }

  /**
   * Function to handle the number of rows shown with select "show entries"
   * @returns {Array} To show
   */
  function limitedEntries(event) {
    let currentPage = document.getElementsByClassName("current-page")[0].innerHTML;
    let newLimitedValue = event.target.value;   
    setEntries(newLimitedValue);
    let startIndex = newLimitedValue * (currentPage - 1); 
    let endIndex = newLimitedValue * currentPage ;
    let tmpDataToShow = storeData.slice(startIndex, endIndex);

    setDataToShow(tmpDataToShow);
  }

   /**
   * Function handle navigation with buttons "previous" , "next"
   * @returns {Array} To show
   */
  function navPage(event) {
    let numberPage = document.getElementsByClassName("btn-page").length;

    if(event.target.classList.contains("btn-prev")) {
      numberPage -= 1;
      document.getElementsByClassName("current-page")[0].parentNode.previousSibling.firstChild.classList.add("current-page");       
      document.getElementsByClassName("current-page")[0].parentNode.nextSibling.firstChild.classList.remove("current-page");
    }

    if(event.target.classList.contains("btn-next")) {
      numberPage += 1;
      document.getElementsByClassName("current-page")[0].parentNode.nextSibling.firstChild.classList.add("current-page");       
      document.getElementsByClassName("current-page")[1].parentNode.previousSibling.firstChild.classList.remove("current-page");     
    }

    let newPageNumber = document.getElementsByClassName("current-page")[0].innerHTML;
    let startIndex = limitedValue * (newPageNumber - 1);
    let endIndex = limitedValue * newPageNumber ;
    let tmpDataToShow = storeData.slice(startIndex,endIndex);  
    setDataToShow(tmpDataToShow);
    handleNavDisabled();
  }

  /**
  * Function handle navigation with buttons to select number of page
  * @returns {Array} To show
  */
  function changePage(event) {
    let allPages = document.getElementsByClassName("btn-page");
    let currentPage = document.getElementsByClassName("current-page")[0];
    let numberPage = event.target.innerHTML;
    
    if(allPages.length > 1) {
      currentPage.classList.remove("current-page");
      event.target.classList.add("current-page")
    }

    let startIndex = limitedValue * (numberPage - 1);
    let endIndex = limitedValue * numberPage;
    let tmpDataToShow = storeData.slice(startIndex, endIndex);  
    setDataToShow(tmpDataToShow);

    handleNavDisabled(); 
  }

  /**
   * Function to sort table by name or date
   * @param {object} event
   * @param {string} typeOf - Type of data (string or date)
   * @param {string} order - ASC or DES 
   * @param {string} type - Name of data column
   * @returns {Array} To show
   */

  function sortTable(event, typeOf , order, type) {
    let  allbtn = document.getElementsByClassName("sort-btn");

    for(let i = 0 ; i < allbtn.length ; i++) {
      allbtn[i].classList.remove("not-active") 
    }
    
    if (order === "ASC") {
      event.target.nextElementSibling.classList.add("not-active")
    }

    if (order === "DES") {
      event.target.previousElementSibling.classList.add("not-active")
    }
   
    if (typeOf === "string") {
      if (order === "ASC") {

        const tmpDataToShow =  [...storeData]
        .sort((a, b) => a[type] > b[type] ? 1 : -1 );
        setDataToShow(tmpDataToShow);
   
      }

      if (order === "DES") {
        const tmpDataToShow =  [...storeData]
        .sort((a, b) => a[type] < b[type] ? 1 : -1 )
        setDataToShow(tmpDataToShow);
        
      }
    }
  
    if (typeOf === "date") {
      if (order === "ASC") {
        const tmpDataToShow =  [...storeData]
        .sort(function(a, b) {
        var aa = a[type].split('/').reverse().join(),
            bb = b[type].split('/').reverse().join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0)
      });
      setDataToShow(tmpDataToShow);
      }

      if (order === "DES") {
        const tmpDataToShow =  [...storeData]
        .sort(function(a, b){
        var aa = a[type].split('/').reverse().join(),
            bb = b[type].split('/').reverse().join();
        return aa > bb ? -1 : (aa < bb ? 1 : 0)
      });
      setDataToShow(tmpDataToShow);
      }
    }
  };
        

  /**
   * Function to search in table (input search)
   * @param {object} event
   * @returns {Array} To show
   */

  function searchTable(event) {
    
    let searchValue = event.target.value.toLowerCase(); 

    const tmpDataToShow = storeData
      .filter((item) => {
        const search = Object.values(item)
        .find((element) =>
          element.toLowerCase().startsWith(searchValue) ? element : undefined
        );
        if (search !== undefined) {
        return item;
        }
      })
      if(tmpDataToShow.length > 0) {
        setSearch(true)
      }

      else {
        setSearch(false)
      }
    setDataToShow(tmpDataToShow);
  }  

  return (
    <div id="employee-div" className="container">
      <div className="page-header">
          <h1>Current Employees</h1>
      </div>
    
      <div className="table-component">
        <div className="header-table">
          <div className="show-entries">
            Show 
            <select name="entries" id="entries" className='form-input form-select' onChange={event => limitedEntries(event)}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            entries
          </div>


          <div className="search-container">
            <label htmlFor="search">Search</label>
            <input id="search" type="search" placeholder='Search...' className='form-input' onChange={event => searchTable(event)}/>
          </div>
        </div>
  
        {dataToShow.length > 0 ? 
        <TableEmployees data={dataToShow} sortTable={sortTable} limitedValue={limitedValue}></TableEmployees> 
        : <div className='not-found'>Aucun employé n'a été trouvé ! </div>}
          
        <div className="pages-container">
          <div className="visible-number">
            Showing 1 to {limitedValue} of { numberOfEntries } entries
          </div>

          {dataToShow.length > 0 ? 
          <PageNumber limitedValue={limitedValue} allEntries={ numberOfEntries } changePage={changePage} navPage ={navPage} search={searchActive} DataToShow={dataToShow}></PageNumber> 
          : ''}
        </div>   
        <NavLink to="/" className="back-link">
            <img className="icon-home" src={iconHome} alt='icon home'/>  Go back home
        </NavLink>
      </div>
    </div>
  )
} 

export default Employees