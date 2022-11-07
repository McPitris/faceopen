import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import authHeader from "../services/auth-header";
import BasicSelect from "./BasicSelect";
import ImageList from "./ImageList";
import Upload from "./Upload";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const GlobalCard = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [imageData, setImageData] = useState([])

  const uploadImage = async (file) => {
    console.log(file)
    const formData = new FormData()
    formData.append("file", file)
    try {
      const response = await axios({
        method: "POST",
        url: `https://facerecog-gate-be.herokuapp.com/api/v1/users/${username}/images/upload`,
        data: formData,
        headers: authHeader(),
      });
      console.log(response)
      response.status===200 ? loadImages(username) : alert("Chyba!")
    } catch (error) {
      console.log(error)
    }
  }

  const deleteImage = async (imageName) => {
    console.log(imageName);
    // const formData = new FormData();
    // formData.append("file", file);
    try {
      const response = await axios({
        method: "DELETE",
        url: `https://facerecog-gate-be.herokuapp.com/api/v1/users/images/delete/${imageName}`,
        headers: authHeader(),
      });
      console.log(response);
      response.status === 200 ? loadImages(username) : alert("Chyba!");
    } catch (error) {
      console.log(error);
    }
  };

  const loadImages = (usr) => {
    console.log("load images!!!!!!" + usr);
    setUsername(usr);
     axios
       .get(
         `https://facerecog-gate-be.herokuapp.com/api/v1/users/${usr}/images`,
         {
           headers: authHeader(),
         }
       )
       .then((res, err) => {
         try {
           setImageData(res.data);
         } catch (error) {
           console.log(error);
         }
       });
  };
  const getAllUsers = () => {
    axios
      .get("https://facerecog-gate-be.herokuapp.com/api/v1/users", {
        headers: authHeader(),
      })
      .then((res, err) => {
        try {
          setData(res.data);
        } catch (error) {
          console.log(error);
        }
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const dataa = [];
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      // alignItems="center"
      justify="center"
      style={{
        minHeight: "100vh",
        minWidth: "100%",
        border: "1px solid black",
      }}
    >
      <Grid item xs={3}>
        <div style={{ height: "50px" }}>
          <span>{username && <Upload uploadImage={uploadImage} />}</span>
        </div>
        <Card sx={{ minWidth: "80%", border: "1px solid magenta" }}>
          {/* <CardMedia
            component="img"
            src={`data:image/jpg;base64, ${encodedImg}`}
          /> */}
          <CardContent>
            <BasicSelect data={data} loadImages={loadImages} />
            {/* <img src={`data:image/jpeg;base64,${dataa}`} /> */}
            {imageData && <ImageList data={imageData} deleteImage={deleteImage}/>}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GlobalCard;
