import React from 'react';
import { Navbar } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';



//Header

var Header = React.createClass({



  render: function () {
    return (
        <div>
  

      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
          <a href="https://www.adslot.com/"><img src={'http://p1.bqimg.com/567571/7db1d7231d2dc7ae.png'} alt='logo'></img> </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text pullRight>
            <FontAwesome name='close' size='2x' />
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      </div>
    )
  }
});


export { Header };