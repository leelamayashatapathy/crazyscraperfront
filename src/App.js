
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//import React from 'react'
//import { useState, useEffect } from 'react';
import logo from "./assets/scrap.png"
//import Table from 'react-bootstrap/Table';
//import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios from 'axios';



const ScrapedDataTable = ({ data }) => (
  <table className="table align-middle mb-0 bg-white" >
  <thead className="bg-light">
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Price</th>
      <th>Description</th>
      <th>Rating</th>
      <th>URL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img
              src={data.product_image}
              alt=""
              width="200"
              height="200"
              />
        </div>
        </td>
      <td>
        <p className="fw-normal mb-1">{ data.product_name }</p>
      </td>
      <td>
        <p className="fw-normal mb-1" >{ data.product_price }</p>
      </td>
      <td>
        <p className="fw-normal mb-1" > {data.description}</p>
      </td>
      <td>
        <p className="fw-normal mb-1">{data.product_rating }</p>
      </td>
      <td>
        <a href={data.prod_url} class="link-primary">URL Link</a>
      </td>
    </tr>
  </tbody>
</table>
);

const AllScrapedDataTable = ({ data }) => (
  <table className="table align-middle mb-0 bg-white" >
  <thead className="bg-light">
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Price</th>
      <th>Description</th>
      <th>Rating</th>
      <th>URL</th>
    </tr>
  </thead>
  <tbody>
  {data.map((item, index) => (
    <tr key={index}>
      <td>
        <div className="d-flex align-items-center">
          <img
              src={item.image}
              alt=""
              width="200"
              height="200"
              />
        </div>
        </td>
      <td>
        <p className="fw-normal mb-1">{ item.product_name }</p>
      </td>
      <td>
        <p className="fw-normal mb-1" >{ item.price }</p>
      </td>
      <td>
        <p className="fw-normal mb-1" > { item.product_desc}</p>
      </td>
      <td>
        <p className="fw-normal mb-1">{item.rating }</p>
      </td>
      <td>
        <a href={item.prod_url} class="link-primary">URL Link</a>
      </td>
    </tr>
     ))}
  </tbody>
</table>
);

const App = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState([]);
  const [alldata, setScrapedata] = useState([])

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await axios.post('http://127.0.0.1:8000/', { url });
    setData(response.data);
    console.log(response.data)
  };
  const handleClick = async () => {
    const response = await fetch('http://127.0.0.1:8000/scraped_list/');
    const json = await response.json();
    setScrapedata(json);
    console.log(json);
    };
   const handleDownload = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/download_data/');
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Scraped_data.xls';
      link.click();
    } catch (error) {
      console.error(error);
    }
  };


  return (
  <React.Fragment>
  <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            𝐂𝐫𝐚𝐳𝐲 𝐒𝐜𝐫𝐚𝐩𝐞𝐫
          </Navbar.Brand>
        <Nav>
            <Nav.Link onClick={handleClick} >𝐀𝐥𝐥 𝐒𝐜𝐫𝐚𝐩𝐞𝐝 𝐝𝐚𝐭𝐚</Nav.Link>
            <Nav.Link onClick={handleDownload} >𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐒𝐜𝐫𝐚𝐩𝐞 𝐄𝐱𝐜𝐞𝐥</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <div className= " py-5 text-center" >
    <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
      <h1 class="fw-light"><span class="text-info"><b>Scrape</b></span><b> Here</b><span class="text-info"><b> !</b></span></h1>
      <form onSubmit={handleSubmit}>
        <input className="form-control border border-info" type="text" placeholder="Enter Your URL Here.."  name="searchurl" id="searchurl" required value={url} onChange={e => setUrl(e.target.value)} />
        <button className="btn btn-info my-2" type="submit">Scrape</button>
      </form>
      <p>shortn your URL! copy till ?</p>
      <p class="text-dark"> This Website is an Extraordinary platform that allows users to extract and collect product information from the Flipkart e-commerce website. This tool enables users to scrape data such as product names, prices, descriptions, ratings, and images.</p>
    </div>
    </div>
    </div>
    {Object.keys(data).length > 0 && <ScrapedDataTable data={data} />}
    {Object.keys(alldata).length > 0 && <AllScrapedDataTable data={alldata} />}
   </React.Fragment>
  );
};

export default App;
