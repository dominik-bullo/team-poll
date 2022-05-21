import * as React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleSetAuthedUser } from "../actions/authedUser";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BallotIcon from "@mui/icons-material/Ballot";

const Nav = ({ authedUser, users, dispatch }) => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(handleSetAuthedUser(null));
    navigate("/");
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <BallotIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Team Poll
            </Typography>
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
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={() => navigate("/")}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/add")}>
                  <Typography textAlign="center">New Question</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/leaderboard")}>
                  <Typography textAlign="center">Leaderboard</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <BallotIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Team Poll
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => navigate("/")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
              <Button
                onClick={() => navigate("/add")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                New Question
              </Button>
              <Button
                onClick={() => navigate("/leaderboard")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Leaderboard
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 2 }}>
                  <Avatar
                    alt={users[authedUser].name}
                    src={users[authedUser].avatarURL}
                  />
                </IconButton>
              </Tooltip>
              <Typography variant="caption" textAlign="center">
                {users[authedUser].id}
              </Typography>
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
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <nav className="header" data-testid="navbar">
        <div className="pure-menu pure-menu-horizontal">
          <div className="pure-u-2-3">
            <div className="pure-menu-heading title">Team Poll</div>
            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <Link className="pure-menu-link" to="/">
                  Home
                </Link>
              </li>
              <li className="pure-menu-item">
                <Link className="pure-menu-link" to="/add">
                  New Question
                </Link>
              </li>
              <li className="pure-menu-item">
                <Link className="pure-menu-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="pure-u-1-3 pure-g nav-user">
            <div className="pure-menu-item menu-profile pure-u-1-3">
              <img
                className="avatar"
                src={users[authedUser].avatarURL}
                alt={users[authedUser].name}
              />
            </div>
            <div className="pure-menu-item menu-profile pure-u-2-3">
              {authedUser}
              <br />
              <Button
                size="small"
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav> */}
    </>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps)(Nav);
