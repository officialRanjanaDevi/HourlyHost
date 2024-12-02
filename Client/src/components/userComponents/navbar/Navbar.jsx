import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "75%", md: "50%" },
  height: "auto",
  bgcolor: "background.paper",
  border: "4px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

function Navbar() {
  const [menu, setMenu] = useState("");
  const [userType,setUserType]=useState(localStorage.getItem("usertype"));
  useEffect(() => {
    setUserType(localStorage.getItem("usertype"));
  })
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className=" flex justify-between items-center shadow-sm shadow-neutral-400 p-2"
   
  >  
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          HourlyHost
        </Typography>
        <div className="w-1/3 flex justify-center">
        <input type ="text" className="w-[90%] rounded-full bg-neutral-100"/>
        <button className="bg-slate-900 text-white px-1 rounded-full">Submit </button>
        </div>

      {/* For mobile menu */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuItem
              className="flex flex-col  w-40 "
              sx={{
                justifyContent: "start",
                alignItems: "start",
                padding: "0px 0px",
              }}
              onClick={handleCloseNavMenu}
            >
            
             
              <Link
                to="/favourite"
                className="mobile-app-bar-transition"
                style={{
                  display: userType==="Client" ? "block" : "none",
                }}
              >
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  F
                </div>
              </Link>
              <Link
                to="/profile"
                className="mobile-app-bar-transition"
                style={{
                  display: userType==="Client" ? "block" : "none",
                }}
              >
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  &nbsp; Cart
                </div>
              </Link>
              <Link to="/about" className="mobile-app-bar-transition">
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  &nbsp; About us
                </div>
              </Link>
              <Link to="/contact" className="mobile-app-bar-transition">
                <div>
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", color: "#555" }}
                  ></ArrowForwardIcon>
                  &nbsp; Contact us
                </div>
              </Link>
            </MenuItem>
          </Menu>
        </Box>

        {/* Logo for mobile view */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
            hover: { color: "black" },
          }}
        >
          RentMotors
        </Typography>

       
        {/* User avatar menu */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="User Avatar"
                src={"/static/images/avatar/2.jpg"} 
                sx={{ backgroundColor: " rgb(15 23 42)" }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: userType ? "none" : "block",
              }}
            >
              <Link to="/signin" className="hover:text-black">
                Signin
              </Link>
            </MenuItem>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: userType ? "none" : "block",
              }}
            >
              <Link to="/signup" className="hover:text-black">
                SignUp
              </Link>
            </MenuItem>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: userType ? "block" : "none",
              }}
            >
              <Link to="/profile" className="hover:text-black">
                Profile
              </Link>
            </MenuItem>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: userType==="Client" ? "block" : "none",
              }}
            >
              <Link to="/favourite" className="hover:text-black">
                Favourite
              </Link>
            </MenuItem>
         
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: userType? "block" : "none",
              }}
            >
              <Link to="/signout" className="hover:text-black">
                Signout
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      
    </div>
  );
}

export default Navbar;
