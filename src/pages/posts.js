import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PostCard from '../components/postCard';
import FormDialog from '../components/dialog';
import '../styles/posts.css'

export default function Posts() {
    const { id, name } = useParams();

    const [data, setData] = useState([]);
    const [word, setWord] = useState('');
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
            const row = [];
            res.data.filter(obj => obj.userId == id).map(obj => row.push({id: obj.id, title: obj.title, body: obj.body}))
            setData(row);
        })
    }, [])

    function search() {
        return data.filter((row) =>
          ['title', 'body'].some(
            (column) =>
              row[column]
                .toLowerCase()
                .indexOf(word) > -1,
          ),
        );
      }

    return(
        <div>
            <div className="page">
                <div className='header-title'>{name} posts</div>

                <div className='header'>
                    <TextField 
                     className='search-bar'
                     id="outlined-search" 
                     label="Search..." 
                     type="search" 
                     onChange={(e) => setWord(e.target.value)}
                    />

                    <Button variant="contained" onClick={()=> setOpenModal(true)}>Create Post</Button>
                </div>

                <div>
                    {search().map(post => {
                        return <PostCard key={post.id} title={post.title} body={post.body} />
                    })}
                </div>
            </div>
            
            <FormDialog 
             openModal={openModal} 
             setOpenModal={setOpenModal} 
             setData={setData} 
            /> 
        </div>
    )
}