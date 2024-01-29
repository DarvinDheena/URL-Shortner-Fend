import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

  function Dashboard({ urls  }) {

   const [ count , setCount ] = useState(1);


  return (
    <div>
      <Table striped="columns">
      <thead>
        <tr>
          <th>URL </th>
          <th>ShortURL</th>
          <th>CreatedAt</th>
        </tr>
      </thead>
      <tbody>
        {
          urls.map( url => {
            return <tr key={ url._id }>
              <td>{ url.longURL }</td>
              <td> { url.shortURL}</td>
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