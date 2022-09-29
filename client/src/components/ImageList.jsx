import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  ImageListItem,
} from "@mui/material";
import React from "react";
import Image from "./Image";

const ImageList = (props) => {
    const data = props.data
    console.log(props)
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {data.map((imgData, index) =>
        <Grid item xs={2} sm={4} md={4} key={index}>
          <Image imageData={imgData} deleteImage = {props.deleteImage}/>
        </Grid>
      )}
    </Grid>
  );
};

export default ImageList;
