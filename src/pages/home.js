import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomizedTables from '../components/table';
import TextField from '@mui/material/TextField';
import '../styles/home.css'

export default function Home() {
  const [data, setData] = useState([]);
  const [word, setWord] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then( res => {
      const row = [];
      res.data.map(obj => row.push({name: obj.name, email: obj.email, company: obj.company.name, id: obj.id}))
      setData(row);
    })
  }, [])

  function search() {
    return data.filter((row) =>
      ['name', 'email'].some(
        (column) =>
          row[column]
            .toLowerCase()
            .indexOf(word) > -1,
      ),
    );
  }

  return (
    <div className="page">
        <div className='container'>
            <div className='search-input'>
                <TextField 
                fullWidth
                id="outlined-search" 
                label="Search..." 
                type="search" 
                onChange={(e) => setWord(e.target.value)}
                />
            </div>
        
            <CustomizedTables data={search()} />
        </div>
    </div>
  );
}

