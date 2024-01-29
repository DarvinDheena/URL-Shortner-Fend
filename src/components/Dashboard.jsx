import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import config from '../config';

  function Dashboard({ urls  }) {

   const [ count , setCount ] = useState(1);


  return (
    <div className='mt-5 pt-0 m-auto bg-white p-3 shadow rounded-4'>
      <Table striped="columns">
      <thead>
        <tr>
          <th><h4>URL</h4> </th>
          <th> <h4>ShortURL</h4> </th>
          <th> <h4>CreatedAt</h4> </th>
        </tr>
      </thead>
      <tbody>
        {
          urls.map( url => {
            return <tr key={ url._id }>
              <td>{ url.longURL }</td>
              <td> {`${config.API_URL}/url/ ${url.shortURL}`}</td>
              <td>{ url.createdAt  }</td>
            </tr>
          })
        }
      </tbody>
    </Table>
    </div>
  )
}

export default Dashboard;