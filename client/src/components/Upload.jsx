import { Button, IconButton } from '@mui/material';
import React, { useState } from 'react'
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Upload = (props) => {
    const [image, setImage] = useState()

    const onImageChange = (e) =>{
        setImage(e.target.files[0])
        props.uploadImage(e.target.files[0]);
    }
  return (
    <>
      <Button variant="contained" component="label">
        Upload Photo
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={onImageChange}
        />
      </Button>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        {/* <PhotoCamera /> */}
      </IconButton>
    </>
  );
}

export default Upload