import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AuthService from "../services/auth.service";
import { render } from "@testing-library/react";

export default function BasicSelect(props) {
  const [username, setUsername] = React.useState(props.data);
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameNew, setUsernameNew] = React.useState();
  const [errorText, setErrorText] = React.useState("");
  const [error, setError] = React.useState(false);

  const onFirstNameChange = (e) => setFirstName(e.target.value);
  const onLastNameChange = (e) => setLastName(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onUsernameChange = (e) => {
    setUsernameNew(e.target.value);
    setError(false)
    setErrorText("")
  };

  const handleChange = (event) => {
    if (event.target.value === "new") {
      console.log("event.target.value:");
      console.log(event.target.value);
      setOpen(true);
    } else {
      getImagesByUser(event.target.value);
    }
    setUsername(event.target.value);
  };

  const getImagesByUser = (setUsername) => {
    props.loadImages(setUsername);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const createUser = () => {
    AuthService.register(firstName, lastName, usernameNew, password, 0).then(
      (res) => {
        console.log(res.data);
        console.log(res.data.status_code);
        if (res.data.status_code === 201) {
          handleClose()
          console.log("prošlo")
          //setUsername(usernameNew)
          window.location.reload()
        } else {
          console.log(res.data.detail);
          setErrorText(res.data.detail);
          setError(true);
        }
      }
    );
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
            <MenuItem value="new" color="red">
              Create a new user ...
            </MenuItem>
          </Select>
        </FormControl>

        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Register new user</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                {/* "first_name": "Nikol", "last_name": "Martiniková", "username":
                "nikol2001", "password": "test" */}
                <TextField
                  id="firstName"
                  label="First name"
                  type="text"
                  onChange={onFirstNameChange}
                  required
                />
                <TextField
                  id="lastName"
                  label="Last name"
                  type="text"
                  onChange={onLastNameChange}
                  required
                />
                <TextField
                  id="username"
                  label="Username"
                  type="text"
                  onChange={onUsernameChange}
                  helperText={errorText}
                  error={error}
                  required
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={onPasswordChange}
                  required
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createUser}>Ok</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
