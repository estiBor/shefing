import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const fields =  ['Title', 'Body'];

export default function FormDialog({openModal, setOpenModal, setData}) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [err, setErr] = useState(false)

    useEffect(() => {
        if(title && body) setErr(false)
    }, [title, body])

  const handlePost = () => {
      if(title && body) {
        const newPost = {
            title,
            body,
        }
        setData(prevData => [newPost, ...prevData ]);
        setTitle('');
        setBody('');
        handleClose();
      }
      else setErr(true);
  };

  const handleClose = () => {
    setErr(false);
    setOpenModal(false);
  };

  return (
    <div>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
            {
                fields.map((field) => {
                    return (
                        <TextField
                            error={err}
                            autoFocus
                            margin="dense"
                            id="outlined-basic"
                            label={field}
                            fullWidth
                            variant="outlined"
                            multiline = {field === 'Body'? true : false}
                            rows={field === 'Body'? 7 : 1}
                            onChange={(e) => field === 'Body'? setBody(e.target.value) :setTitle(e.target.value)}
                        />
                    )
                })
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePost}>Add Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
