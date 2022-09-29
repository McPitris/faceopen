import { Button, Card, CardActions, CardMedia } from "@mui/material";
import React from "react";

const Image = (props) => {
  console.log("props obrázku:")
  console.log(props)
    const image = props.imageData.image
    const imageName = props.imageData.name
    console.log(props)
  return (
    <Card style={{ border: "1px solid green" }} sx={{ width: 350 }}>
      <CardMedia
        component="img"
        height="300"
        image={`data:image/jpeg;base64,${image}`}
        alt="test"
      />
      <CardActions>
        <Button size="small" id={imageName} onClick={e => {if(window.confirm('Are U sure to delete this photo?')){props.deleteImage(e.target.id);}}}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Image;
