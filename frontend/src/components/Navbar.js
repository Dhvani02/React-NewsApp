import React from "react"
import AutoSearch from "./AutoSearch"
import { NavLink } from 'react-router-dom';
import { MdBookmarkBorder,MdBookmark } from 'react-icons/md';
import ReactTooltip from "react-tooltip";

class Navbar extends React.Component {
  constructor(props){
    super(props)
    // console.log(this.props)
  }

render(){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom-2 topmost">
     <div className = "col-10 col-sm-10 col-md-4 col-lg-3" style = {{paddingLeft:'0' }}>
      <AutoSearch />
      </div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse " id="navbarSupportedContent">

    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
      <NavLink exact activeClassName="active" className = "nav-link" to="/">
        Home
      </NavLink>
      </li>
      <li className="nav-item">
      <NavLink exact activeClassName="active" className = "nav-link" to="/world">
        World
      </NavLink>
      </li>
      <li className="nav-item">
      <NavLink exact activeClassName="active" className = "nav-link" to="/politics">
        Politics
      </NavLink>
      </li>
      <NavLink exact activeClassName="active" className = "nav-link" to="/business">
        Business
      </NavLink>
      <li className="nav-item">
      <NavLink exact activeClassName="active" className = "nav-link" to="/technology">
        Technology
      </NavLink>
      </li>
      <li className="nav-item">
      <NavLink exact activeClassName="active" className = "nav-link" to="/sports">
        Sports
      </NavLink>
      </li>
</ul>
<div className="justify-content-end">
        <ul className="navbar-nav">
        <li className="nav-item nav-link" style={{color: 'white'}}> 
        <NavLink to = '/favorite' style={{color:'white'}} data-tip="Bookmark" data-for="in_nav">
            {this.props.bookmark?<MdBookmark size='1.5em' />:<MdBookmarkBorder size='1.5em'/>}
        </NavLink>
        <ReactTooltip place= "bottom" type="dark" effect="float" id="in_nav"/>
        </li>
          {this.props.handleSwitchChange && 
          <> 
          <li className="nav-item nav-link" style={{color: 'white'}}>NYTimes</li>
            <label className="switch">
              <input type="checkbox" className="primary" checked={this.props.checked}
              onChange={this.props.handleSwitchChange(1)}/>
              <span className="slider round"></span>
            </label>
          <li className="nav-item nav-link" style={{color: 'white'}}>Guardian</li>
          </>
          }
        </ul>
      </div>
</div>
      
</nav>
  );
  }
}


export default Navbar;