import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetAllMovies } from "../../api/movies"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, CardActionArea, TextField } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { SetMovieById } from "../../redux/moviesSlice";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';


const Home = () => {

    const [name, setName] = useState("")
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const movies = useSelector(state => state.movies.movies)

    const filteredMovies = name ? movies.filter(movie => movie.name.toLowerCase().includes(name.toLowerCase())) : movies

    useEffect(() => {
        dispatch(GetAllMovies())
        // dispatch(SetMovieById())
    }, [])

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const [anchorEl, setAnchorEl] = useState(null);



    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {/* <Box sx={{ flexGrow: 1 }}>
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
                            </IconButton >
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

                                    // dispatch(ResetState())
                                    navigate("/login");
                                }}>Logout</MenuItem>
                            </Menu>
                        </div >

                    </Toolbar >
                </AppBar >
            </Box > */}
            {/* <Box sx={{ p: 3 }}> */}
            <Typography variant="h4" component="h4" >
                Movies
            </Typography >
            <TextField value={name} onChange={handleNameChange} sx={{ margin: "20px 0" }} label="Search movies here..." autoComplete="off" id="Search" size="small" fullWidth />
            <br />
            <Box className="home" sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {filteredMovies.map(movie => <Link key={movie._id} to={`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`} > <Card sx={{ minWidth: 300, borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="340"
                            sx={{ objectFit: "cover" }}
                            image={movie.poster}
                            alt="green iguana"
                        />
                        <CardContent sx={{ backgroundColor: "rgba(44, 43, 38, 0.886)" }}>
                            <Typography sx={{ color: "#ffd700" }} variant="p" component="p">
                                {movie.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                </Link>)}
            </Box>
            {/* </Box> */}
        </>

    )
}

export default Home