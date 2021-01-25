import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button";

class Header extends React.Component {
  render() {
    return (
      <Jumbotron fluid className="bg-dark text-white text-center">
 <div className="container">
        <h1 className="display-4 ">Weather Dashboard</h1>
      </div>
      <div className="row">
      <div className="col-lg-3 search">
        <p>Search for a City:</p>
        <input type="text" className="city" id="city"/>
        <Button  id="searchBtn" className="btn btn-primary" >Search</Button>
        

<ul id="myUL">
  
</ul>

      </div>
      <div className="col-lg-9">
        <div id="weatherContainer" className="weatherCard" style={{width:'100%'}}></div>
        <div id="currentWeather" className="cardBody">

        </div>
        

      </div>
    </div>
  
      </Jumbotron>
    );
  }
}

export default Header;
