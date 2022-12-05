import iconPeople from '../img/people.svg'
import { NavLink } from 'react-router-dom';

function NavBar () {
  return (
  <header className="main-header">
    <div className="container">
      <div className="header-wrap">
      <NavLink to="/" className="logo-nav-home">
          HRnet
      </NavLink>
      <NavLink to="/employees" className="main-nav-item">
      <img className="icon-people" src={iconPeople}/>
      View Current Employees
      </NavLink>
      </div>
    </div> 
  </header>

  )
}
export default NavBar