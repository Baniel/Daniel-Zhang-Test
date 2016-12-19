import React from 'react';
import { Navbar,} from 'react-bootstrap';








//Header

var Footer = React.createClass({
    render: function () {
        return (
            <div >
                <Navbar inverse collapseOnSelect fixedBottom>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="https://www.adslot.com/"> 
                              <img src={'http://p1.bpimg.com/567571/b6755a6fc0b33284.png'} alt='logo'></img> 
                            </a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
        )
    }
});


export { Footer };