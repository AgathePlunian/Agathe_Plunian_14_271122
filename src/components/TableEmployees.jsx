import { useSelector } from "react-redux";
import sortUp from "../img/sort-up.png";
import sortDown from "../img/sort-down.png";
import { useEffect } from "react";
import { useState } from "react";

function TableEmployees(props) {

  let dataEmployees = props.data;

  const colTitle = [
    { name: "First Name", type: "firstName" },
    { name: "Last Name", type: "lastName" },
    { name: "Start Date", type: "startDate" },
    { name: "Department", type: "department" },
    { name: "Date of Birth", type: "birthDate" },
    { name: "Street",type: "street" },
    { name: "City", type: "city" },
    { name: "State", type: "state" },
    { name: "Zip Code", type: "zipCode" },
  ];


return (

  <table id="employee-table">
    <thead>
      <tr>
        {colTitle.map((value, index) => {
        const typeOf =
        value.type === "startDate" || value.type === "birthDate"
        ? "date"  : "string";
        return <th key={index}className="header-col"> 
        <div className="header-value">{value.name}</div>
        <div className="icons-container">
          <button className="sort-btn btn-asc" type="button" onClick={event => props.sortTable(event, typeOf, "ASC", value.type)}><img className="btn-sort-img" src={sortUp} alt="sort up" /></button>
          <button className="sort-btn btn-des" type="button" onClick={event => props.sortTable(event, typeOf, "DES", value.type)}><img className="btn-sort-img"  src={sortDown} alt="sort down" /></button>
        </div>
      </th>
      })}    
      </tr>
    </thead>
    <tbody>
      {dataEmployees.slice(0, props.limitedValue).map((value, index) => {
      return (
      <tr key={index}>
        <td>{value.firstName} </td>
        <td>{value.lastName}</td>
        <td>{value.startDate}</td>
        <td>{value.department}</td>
        <td>{value.birthDate}</td>
        <td>{value.street}</td>
        <td>{value.city}</td>
        <td>{value.state}</td>
        <td>{value.zipCode}</td>
      </tr>
      )
    })}      
  </tbody>
</table>
)
}
export default TableEmployees