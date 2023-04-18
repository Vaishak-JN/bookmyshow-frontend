import { Button } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MovieForm from "./MoviesForm";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { DeleteMovie, GetAllMovies } from "../../api/movies";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',

    borderRadius: "5px",
    boxShadow: 40,
    p: 4,
};

const MoviesList = () => {

    const [showMovieForm, setShowMovieform] = useState(false)
    // const [movies, setMovies] = useState([]);



    const movies = useSelector(state => state.movies.movies)
    // console.log(movies)
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState("add");

    const dispatch = useDispatch();
    const getData = useCallback(async () => {
        try {
            dispatch(ShowLoading());
            // const response = await GetAllMovies();
            const response = await dispatch(GetAllMovies());
            if (response.success) {
                // console.log(response.data)
                // setMovies(response.data);
            } else {
                // message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            // message.error(error.message);
        }
    }, []);


    // useEffect(() => {
    //     // getData()
    //     // dispatch(GetAllMovies())

    // }, [])

    const addMovie = () => {
        setFormType("add")
        setShowMovieform(true)
    }
    const editMovie = (id) => {
        const movie = movies.find(movie => movie._id === id)
        setSelectedMovie(movie)
        setFormType("edit")
        setShowMovieform(true)
    }
    const closeModal = () => {

        setSelectedMovie(null)
        setFormType("add")
        setShowMovieform(false)
    }

    const deleteMovie = async (id) => {

        await DeleteMovie({ movieId: id })
        getData()
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    size="large"
                    color="error"
                    sx={{ marginRight: "20px" }}
                    onClick={addMovie}
                >
                    Add Movie
                </Button>
            </div>
            <br />



            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#333545" }}>
                        <TableRow >
                            <TableCell sx={{ color: "white" }}>Poster</TableCell>
                            <TableCell sx={{ color: "white" }}>Name</TableCell>
                            {/* <TableCell sx={{ color: "white" }} >Description</TableCell> */}
                            <TableCell sx={{ color: "white" }} >Duration</TableCell>
                            <TableCell sx={{ color: "white" }} >Release Date</TableCell>
                            <TableCell sx={{ color: "white" }} >Language</TableCell>
                            <TableCell sx={{ color: "white" }} >Genre</TableCell>
                            <TableCell sx={{ color: "white" }} >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {movies.map(movie => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        <img style={{ width: "50px", height: "70px", objectFit: "cover" }} src={movie.poster} alt="poster" />
                                    </TableCell>
                                    <TableCell>{movie.name}</TableCell>
                                    {/* <TableCell>{movie.description.substring(0, 70)}...</TableCell> */}
                                    <TableCell>{movie.duration}</TableCell>
                                    <TableCell>{moment(movie.realeaseDate).format("DD-MM-YYYY")}</TableCell>
                                    <TableCell>{movie.language}</TableCell>
                                    <TableCell>{movie.genre}</TableCell>
                                    <TableCell>
                                        <EditIcon color="primary" sx={{ cursor: "pointer" }}
                                            onClick={() => editMovie(movie._id)}
                                        />
                                        <DeleteIcon color="error" sx={{ cursor: "pointer" }}
                                            onClick={() => deleteMovie(movie._id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}


                    </TableBody>
                </Table>
            </TableContainer>
            {/* {movies.map(movie => movie.name)} */}


            <Modal
                open={showMovieForm}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} style={{ overflow: "scroll", maxHeight: "60%" }}>

                    <MovieForm getData={getData} onClose={closeModal} formType={formType} selectedMovie={selectedMovie} />
                </Box>
            </Modal>
        </div>
    )
}

export default MoviesList