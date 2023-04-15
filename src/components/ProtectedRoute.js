// import { message } from "antd";
import { useEffect, useState } from "react";
import { GetCurrentUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { ShowLoading, HideLoading } from '../redux/loadersSlice';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import jwt_decode from "jwt-decode";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ResetState } from "../redux/usersSlice";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import store from "../redux/store"

function ProtectedRoute({ ifAdmin, children }) {


    const { user } = useSelector((state) => state.users);
    const { token } = useSelector((state) => state.users);
    // console.log("user", user)
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const getCurrentUser = async () => {
        try {
            dispatch(ShowLoading());
            // const response = await GetCurrentUser();
            await dispatch(GetCurrentUser()).unwrap()
            // console.log("current user", response.data)
            // const response = await dispatch(GetCurrentUser({ userId: decoded.userId }));
            dispatch(HideLoading());
            // if (response.success) {
            //     // console.log("responsedata", response.data)
            //     dispatch(SetUser(response.data));
            // } else {
            //     dispatch(SetUser(null));
            //     // localStorage.removeItem("token");
            //     // navigate("/login");
            // }
        } catch (error) {
            dispatch(HideLoading());
            dispatch(SetUser(null));
            navigate("/login");

        }
    };

    useEffect(() => {

        if (localStorage.getItem("token") || token || user?.name) {
            // getCurrentUser();
            dispatch(GetCurrentUser())
        } else {
            navigate("/login");
        }
    }, []);

    // const unsubscribe = store.subscribe()


    const [anchorEl, setAnchorEl] = useState(null);



    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        user && (<>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#333545" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: "auto" }}
                            onClick={() => navigate("/")}

                        >
                            bookmyshow
                        </IconButton>


                        <div>

                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Typography variant="h6" component="span" sx={{ marginRight: "4px" }}>
                                    {user.name}
                                </Typography>
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => {
                                    if (user.isAdmin) {
                                        navigate("/admin");
                                    } else {
                                        navigate("/profile");
                                    }
                                }}>My account</MenuItem>
                                <MenuItem onClick={() => {
                                    localStorage.removeItem("token");

                                    dispatch(ResetState())
                                    navigate("/login");
                                }}>Logout</MenuItem>
                            </Menu>
                        </div>

                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ padding: 3 }}>
                {children}
            </Box>
        </>)

        // ifAdmin ? (user.isAdmin ? (

        //     <>
        //         <Box sx={{ flexGrow: 1 }}>
        //             <AppBar position="static" sx={{ backgroundColor: "#333545" }}>
        //                 <Toolbar>
        //                     <IconButton
        //                         size="large"
        //                         edge="start"
        //                         color="inherit"
        //                         aria-label="menu"
        //                         sx={{ mr: "auto" }}
        //                         onClick={() => navigate("/")}

        //                     >
        //                         bookmyshow
        //                     </IconButton>


        //                     <div>

        //                         <IconButton
        //                             size="large"
        //                             aria-label="account of current user"
        //                             aria-controls="menu-appbar"
        //                             aria-haspopup="true"
        //                             onClick={handleMenu}
        //                             color="inherit"
        //                         >
        //                             <Typography variant="h6" component="span" sx={{ marginRight: "4px" }}>
        //                                 {user.name}
        //                             </Typography>
        //                             <AccountCircle />
        //                         </IconButton>
        //                         <Menu
        //                             id="menu-appbar"
        //                             anchorEl={anchorEl}
        //                             anchorOrigin={{
        //                                 vertical: 'top',
        //                                 horizontal: 'right',
        //                             }}
        //                             keepMounted
        //                             transformOrigin={{
        //                                 vertical: 'top',
        //                                 horizontal: 'right',
        //                             }}
        //                             open={Boolean(anchorEl)}
        //                             onClose={handleClose}
        //                         >
        //                             <MenuItem onClick={() => {
        //                                 if (user.isAdmin) {
        //                                     navigate("/admin");
        //                                 } else {
        //                                     navigate("/profile");
        //                                 }
        //                             }}>My account</MenuItem>
        //                             <MenuItem onClick={() => {
        //                                 localStorage.removeItem("token");

        //                                 dispatch(ResetState())
        //                                 navigate("/login");
        //                             }}>Logout</MenuItem>
        //                         </Menu>
        //                     </div>

        //                 </Toolbar>
        //             </AppBar>
        //         </Box>
        //         <Box sx={{ padding: 3 }}>
        //             {children}
        //         </Box>
        //     </>

        // ) : <h1>Not Authorised</h1>)
        //     : (user.isAdmin ? <h1>Not authorised</h1> : <>
        //         <Box sx={{ flexGrow: 1 }}>
        //             <AppBar position="static" sx={{ backgroundColor: "#333545" }}>
        //                 <Toolbar>
        //                     <IconButton
        //                         size="large"
        //                         edge="start"
        //                         color="inherit"
        //                         aria-label="menu"
        //                         sx={{ mr: "auto" }}
        //                         onClick={() => navigate("/")}

        //                     >
        //                         bookmyshow
        //                     </IconButton>


        //                     <div>

        //                         <IconButton
        //                             size="large"
        //                             aria-label="account of current user"
        //                             aria-controls="menu-appbar"
        //                             aria-haspopup="true"
        //                             onClick={handleMenu}
        //                             color="inherit"
        //                         >
        //                             <Typography variant="h6" component="span" sx={{ marginRight: "4px" }}>
        //                                 {user.name}
        //                             </Typography>
        //                             <AccountCircle />
        //                         </IconButton>
        //                         <Menu
        //                             id="menu-appbar"
        //                             anchorEl={anchorEl}
        //                             anchorOrigin={{
        //                                 vertical: 'top',
        //                                 horizontal: 'right',
        //                             }}
        //                             keepMounted
        //                             transformOrigin={{
        //                                 vertical: 'top',
        //                                 horizontal: 'right',
        //                             }}
        //                             open={Boolean(anchorEl)}
        //                             onClose={handleClose}
        //                         >
        //                             <MenuItem onClick={() => {
        //                                 if (user.isAdmin) {
        //                                     navigate("/admin");
        //                                 } else {
        //                                     navigate("/profile");
        //                                 }
        //                             }}>My account</MenuItem>
        //                             <MenuItem onClick={() => {
        //                                 localStorage.removeItem("token");

        //                                 dispatch(ResetState())
        //                                 navigate("/login");
        //                             }}>Logout</MenuItem>
        //                         </Menu>
        //                     </div>

        //                 </Toolbar>
        //             </AppBar>
        //         </Box>
        //         <Box sx={{ padding: 3 }}>
        //             {children}
        //         </Box>
        //     </>)
    );
}

export default ProtectedRoute;