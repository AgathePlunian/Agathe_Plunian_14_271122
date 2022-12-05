import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux';
import { addEmployee } from '../store';
import departments from '../assets/data/department'
import states from '../assets/data/state'
import { useEffect } from 'react';
import { Modal } from 'modal-lib-react-oc'


function Home() {

  const [startdate, setStartDate] = useState(new Date());
  const [birthdate, setBirthDate] = useState(new Date());
  const dispatch = useDispatch();

  // Add event listener on button save
  useEffect(() => {
    let modalBtn = document.getElementsByClassName('btn-modal')[0];
    modalBtn.addEventListener('click', handleSubmit);
  }, []);


  /*
    Function save employee
    Reset Form
   */
  function handleSubmit(e) {
    e.preventDefault();   
    let employee = {
      "firstName" : document.getElementById('first-name').value,
      "lastName" : document.getElementById('last-name').value,
      "startDate" : document.getElementById('startDate').value.toString(),
      "department" : document.getElementById('department').value,
      "birthDate" : document.getElementById('birthDate').value.toString(),    
      "street" : document.getElementById('street').value,
      "city" : document.getElementById('city').value,
      "state" : document.getElementById('state').value,
      "zipCode" : document.getElementById('zip-code').value,    
    }
    dispatch(addEmployee(employee))

    // Reset form
    document.getElementById('first-name').value="";
    document.getElementById('last-name').value="";
    document.getElementById('zip-code').value="";
    document.getElementById('city').value="";
    document.getElementById('street').value="";
    document.getElementById('state').selectedIndex = 0;
    document.getElementById('department').selectedIndex = 0;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = dd+ '/' + mm + '/' + yyyy;

    document.getElementById('birthDate').value = today;   
    document.getElementById('startDate').value = today; 
  }

  return (
    <main>
      <div className='home-wrap'> 
        <div className="form-container">
           
          <div className="page-header">
            <h1 className='form-title'>Create Employee</h1>
          </div>
          
          <form action="#" id="create-employee" className='form-create'>
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" className='form-input' />

              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" className='form-input'/>

              <label htmlFor="date-of-birth">Date of Birth</label>
              <DatePicker className='form-input form-input-date' id='birthDate' selected={birthdate}  dateFormat="dd/MM/yyyy" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"   onChange={(date) => setBirthDate(date)} />

              <label htmlFor="start-date">Start Date</label>
        
              <DatePicker className='form-input form-input-date' id="startDate" selected={startdate} dateFormat="dd/MM/yyyy"  peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" yearDropdownItemNumber={15}  scrollableYearDropdown onChange={(date) => setStartDate(date)} />

              <div className="address">
                <legend className='legend'>Address</legend>

                <label htmlFor="street">Street</label>
                <input id="street" type="text"  className='form-input'/>

                <label htmlFor="city">City</label>
                <input id="city" type="text"  className='form-input'/>

                <label htmlFor="state">State</label>
                <select name="state" id="state" className='form-input form-select'>
                {states.map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
                </select>

                  <label htmlFor="zip-code">Zip Code</label>
                  <input id="zip-code" type="number"  className='form-input '/>
              </div>

              <label htmlFor="department">Department</label>
              <select name="department" id="department" className='form-input form-select'>
                {departments.map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
          </form>

          <button type='button' className='btn btn-primary btn-save btn-modal'>Save</button>
        </div>
    </div>
    <Modal content="Employee Created !"></Modal>
  </main>

  )
} 

export default Home