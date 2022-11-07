import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Fab, Grid, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import authHeader from "../services/auth-header";
import BasicSelect from "./BasicSelect";
import ImageList from "./ImageList";
import Upload from "./Upload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const GlobalCard = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [imageData, setImageData] = useState([])
  const [uploadBtnVisible, setUploadBtnVisible] = useState(true);

  const uploadImage = async (file) => {
    //console.log(file)
    const formData = new FormData()
    formData.append("file", file)
    try {
      const response = await axios({
        method: "POST",
        url: `${serverUrl}/api/v1/users/${username}/images/upload`,
        data: formData,
        headers: authHeader(),
      });
      //console.log(response)
      response.status===200 ? loadImages(username) : alert("Chyba!")
    } catch (error) {
      console.log(error)
    }
  }

  const deleteImage = async (imageName) => {
    imageName = imageName.replace("./assets/", "");
    //console.log(imageName);
    let imageUsername = imageName.split("_")[0];
    //console.log(imageUsername);
    // const formData = new FormData();
    // formData.append("file", file);
    try {
      const response = await axios({
        method: "DELETE",
        url: `${serverUrl}/api/v1/users/images/delete/${imageUsername}/${imageName}`,
        headers: authHeader(),
      });
      //console.log(response);
      response.status === 200 ? loadImages(username) : alert("Chyba!");
    } catch (error) {
      console.log(error);
    }
  };

  const loadImages = (usr) => {
    console.log("load images!!!!!!" + usr);
    setUsername(usr);
     axios
       .get(`${serverUrl}/api/v1/users/${usr}/images`, {
         headers: authHeader(),
       })
       .then((res, err) => {
         try {
          console.log(res.data.length);
          res.data.length == 5
            ? setUploadBtnVisible(false)
            : setUploadBtnVisible(true);
           setImageData(res.data);
         } catch (error) {
           console.log(error);
         }
       });
  };
  const getAllUsers = () => {
    axios
      .get(`${serverUrl}/api/v1/users`, {
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
        backgroundColor: "#ecf0f1",
      }}
    >
      <Grid item xs={3} style={{ backgroundColor: "rgba(39, 174, 96, 0.6)" }}>
        {/* <div style={{ height: "40px" }}>
          <span>
            {uploadBtnVisible && username && (
              <Upload uploadImage={uploadImage} />
            )}
          </span>
        </div> */}
        <Card sx={{ minWidth: "80%", paddingTop: "20px" }}>
          {/* <CardMedia
            component="img"
            src={`data:image/jpg;base64, ${encodedImg}`}
          /> */}
          <div style={{ height: "40px", alignItems: "flex-end" }}>
            <span>
              {uploadBtnVisible && username && (
                <Upload uploadImage={uploadImage} />
              )}
            </span>
          </div>
          <CardContent>
            <BasicSelect data={data} loadImages={loadImages} />
            {/* <img src={`data:image/jpeg;base64,${dataa}`} /> */}
            {imageData && (
              <ImageList data={imageData} deleteImage={deleteImage} />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GlobalCard;
