import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function BasicSelect(props) {
  const [username, setUsername] = React.useState(props.data);

  const handleChange = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value);
    getImagesByUser(event.target.value)
  };

  const getImagesByUser = (setUsername) => {
    props.loadImages(setUsername);
  };

  return (
    <>
      <Box sx={{ minWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={username}
            label="User"
            onChange={handleChange}
          >
            {props.data &&
              props.data.map((user) => (
                <MenuItem value={user.username}>
                  {user.username} - ({user.first_name} {user.last_name})
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
