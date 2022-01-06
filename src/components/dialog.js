import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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
          <TextField
            error={err}
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Title"
            fullWidth
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            error={err}
            margin="dense"
            id="outlined-basic"
            label="Body"
            fullWidth
            variant="outlined"
            multiline
            rows={7}
            onChange={(e) => setBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePost}>Add Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
