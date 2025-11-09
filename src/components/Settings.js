import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { Switch } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Settings = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = () => {
    props.darkness(!props.dark);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <SettingsIcon onClick={handleClick} className="text-black cursor-pointer dark:text-white hover:animate-spin" />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <FormControlLabel className="pl-5 text-black" control={<Switch checked={props.dark} color="default" size="small" onChange={handleChange} />} label="Dark Mode" />
        <hr />
        <div className="flex justify-around pt-2">
          <a className="flex" href="https://github.com/JackScottow">
            <GitHubIcon />
          </a>
        </div>
      </Menu>
    </div>
  );
};

export default Settings;
