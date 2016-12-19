import React from 'react';
import ReactDOM from 'react-dom';
import { sites, categories } from './Data';
import './index.css';
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FormGroup, FormControl, Glyphicon, Row, Col } from 'react-bootstrap';



/*
** prpos: Sites & Categories (List Componment)
** state: User Input (SearchBox)
**
*/

//MainBody Componment
var SearchBox = React.createClass({

  getInitialState: function () {
    return {
      siteName: '',
      siteNames: [],
      siteLists: [],
      idArray: [],
      categoriesLists: [],
    }
  },

  /*
  ** Due to I don't filimar how to use JavaScript (I just only know Python and Java) to wrtite Data Structure,
  ** So I don't use Ternary Search Trees to complete the Search Problems.
  */
  filterList: function (userInput) {

    let sameNames = [];
    let sameSites = [];
    let searchArray = [];
    let sameIds = [];

    /*
    **  Get the User Input :
    **  1. Without Commas
    **  2. With Commas
    */ 
    if (userInput !== "") {

      // When user input with Commas
      if (userInput.includes(',')) {
        searchArray = userInput.split(',');
        this.props.initialCategories.forEach(function (Category) {

          if (Category.description.includes('&')) {
            let category = Category.description.split('&');
            for (let c of category) {
              for (let s of searchArray){
                  if (c.toLowerCase().trim() === s.toLowerCase()) {
                  sameIds.push(Category.id);
                  sameIds = Array.from(new Set(sameIds));
              }
              }
            }
          }

          for (let s of searchArray)
          {
            if (Category.description.toLowerCase() === s.toLowerCase()) {
            sameIds.push(Category.id);
            sameIds = Array.from(new Set(sameIds));
          }
          }

        });

         sameIds.length !== 0 ?
         // Search websites by Category
          this.props.initialSites.forEach(function (site) {

            for (let id of sameIds) {
              if (site.categoryIds.includes(id)) {
                sameSites.push(site);
                sameSites = Array.from(new Set(sameSites));
              }
            }

          })
        :
        // Search sebsites by Keywords 
        this.props.initialSites.forEach(function (site) {
          for (let search of searchArray) {
            if (search !== "") {
              if (site.siteName.toLowerCase().match(search.toLowerCase()) || site.siteUrl.toLowerCase().match(search.toLowerCase())) {

                /*
                ** Delete Repeat websites
                */
                sameNames.push(site.siteName);
                sameNames = Array.from(new Set(sameNames));
                sameSites.push(site);
                sameSites = Array.from(new Set(sameSites));

              }
            }
          }
        });

        if (sameSites.length === 0) {
          sameSites = false;
        }

      } else {

        // When user input without Commas

        this.props.initialCategories.forEach(function (Category) {

          if (Category.description.includes('&')) {
            let category = Category.description.split('&');
            for (let c of category) {
              if (c.toLowerCase().trim() === userInput.toLowerCase()) {
                sameIds.push(Category.id);
              }

            }
          }

          if (Category.description.toLowerCase() === userInput.toLowerCase()) {

            sameIds.push(Category.id);
            sameIds = Array.from(new Set(sameIds));
          }


        });

        sameIds.length !== 0 ?

        // Search by Categories
          this.props.initialSites.forEach(function (site) {

            for (let id of sameIds) {
              if (site.categoryIds.includes(id)) {
                sameSites.push(site);
                sameSites = Array.from(new Set(sameSites));
              }
            }

          })
        
          :
          // Search by Keywords of websites
          this.props.initialSites.forEach(function (site) {
            if (site.siteName.toLowerCase().match(userInput.toLowerCase()) || site.siteUrl.toLowerCase().match(userInput.toLowerCase())) {
              sameNames.push(site.siteName);
              sameSites.push(site);
            }
          });


        if (sameSites.length === 0) {
          sameSites = false;
        }

      }


    }


    this.setState({ idArray: sameIds })
    this.setState({ siteNames: sameNames })
    this.setState({ siteLists: sameSites })
  },

  handleChange: function (event) {

    this.filterList(event.target.value.trim());

    this.setState({ siteName: event.target.value.trim() });

  },

  componentWillMount: function () {
    this.setState({ siteLists: this.state.siteLists })
  },

  render: function () {
    return (
      <div className="myList">
        <Header />

        <Row className="show-grid">
          <Col xs={3} md={2} sm={3} lg={3}></Col>
          <Col xs={6} md={8} sm={6} lg={6}>

            <center>
              <FormGroup controlId="formValidationNull" validationState={null} >

                <FormControl type="text" placeholder="Search Publishers" onChange={this.handleChange} />
                <FormControl.Feedback >
                  <Glyphicon glyph="search" />
                </FormControl.Feedback>
              </FormGroup>
            </center>
            <List items={this.state.siteLists} />
          </Col>
          <Col xs={3} md={2} sm={3} lg={3}></Col>
        </Row>
        <Footer />
      </div>
    );
  }
});


// List Componment
var List = React.createClass({
  render: function () {
    return (
      <div>
        <ul>
          {
            this.props.items ?
              this.props.items.map(function (site, i) {
                return (
                  <div className="List" key={i}>
                    <li><h3>{site.siteName}</h3></li>
                    <li><a href={site.siteUrl} target="_blank">{site.siteUrl}</a></li>
                    <li>{site.description}</li>
                    <br />
                    <br />
                  </div>
                )
              }) : <h3 className="hint" >We currently don't have any results for your search, try another</h3>
          }
        </ul>
      </div>
    )
  }
});




// DOM Render
ReactDOM.render(<SearchBox initialSites={sites} initialCategories={categories} />, document.getElementById('root'));
