import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import config from '../config';



function CreateURL( { user , token }) {

  const [ longUrl , setLongUrl ] = useState ()
  const [shortUrl , setShortUrl ] = useState('');
  const display = {
    display:'none'
}

  const handleBtnClick = async (event) => {
    event.preventDefault();
    try {
        await axios.post('http://localhost:6001/url/create',{ longURL : longUrl } , {
        headers : {
          Authorization  : `bearer ${token}`
        }
      })
        .then((response) => {
          setShortUrl(response.data.newURL.shortURL)
          document.getElementById('shortUrl').removeAttribute('style');
        })
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='mt-5 w-25 m-auto bg-white p-3 shadow rounded-4'>
      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter URL to Short </Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter Url here..." 
          value={ longUrl }
          onChange={ (e) => setLongUrl(e.target.value)}

        />
      </Form.Group>
      <Button variant="success" size='lg' onClick={ handleBtnClick }>Create</Button>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" id='shortUrl' style={ display }>
        <Form.Label>Shortened URL</Form.Label>
        <Form.Control 
        as="textarea" 
        rows={3} 
        value={ `${ config.API_URL }/url/${shortUrl}` }
        readOnly
        />
      </Form.Group>
    </Form>
    </div>
  )
}

export default CreateURL;