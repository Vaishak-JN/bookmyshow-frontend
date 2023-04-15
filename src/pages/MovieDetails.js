import { Box, Typography, TextField } from "@mui/material"
import moment from "moment"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { GetAllMovies, GetMovieById } from "../api/movies"
import { SetMovieById } from "../redux/moviesSlice"
import { GetAllTheatresByMovie } from "../api/theatres"
import ShowTheatresForMovie from "../components/ShowTheatresForMovie"
import { ResetTheatres } from "../redux/theatresSlice"


const MovieDetails = () => {

    const urlDate = new URLSearchParams(window.location.search).get("date")


    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const movies = useSelector(state => state.movies.movies)
    // const movie = useSelector(state => state.movies.movieById)
    const theatresByMovie = useSelector(state => state.theatres.theatresByMovie)
    const [date, setDate] = useState(urlDate || moment().format("YYYY-MM-DD"))


    const getData = async () => {
        try {
            await dispatch(GetAllTheatresByMovie({ movie: id, date })).unwrap()
        } catch (err) {
            console.log(err)
        }
    }
    // console.log(movie)

    const movie = movies.find(movie => id === movie._id) || null

    useEffect(() => {

        if (movie === null) {
            dispatch(GetAllMovies())
        }

        return () => {
            dispatch(ResetTheatres())
        }

    }, [])
    useEffect(() => {
        getData()
    }, [date])

    const handleDateChange = (e) => {
        setDate(e.target.value)
        navigate(`/movie/${id}?date=${e.target.value}`)
    }



    // console.log(theatresByMovie)
    return (
        <div>
            <Box my={2}>
                <Typography my={2} variant="h4" component="h4">
                    {movie?.name}
                </Typography>
                <Typography mb={2} size="large" component="p">
                    {movie?.description}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <Typography size="large" component="p">
                            <span style={{ fontWeight: "bold" }}>Language:</span> {movie?.language}
                        </Typography>
                        <Typography size="large" component="p">
                            <span style={{ fontWeight: "bold" }}>Release Date:</span> {moment(movie?.releaseDate).format("DD-MM-YYYY")}
                        </Typography>
                        <Typography size="large" component="p">
                            <span style={{ fontWeight: "bold" }}>Genre:</span> {movie?.genre}
                        </Typography>
                        <Typography size="large" component="p">
                            <span style={{ fontWeight: "bold" }}>Duration:</span> {movie?.duration} mins
                        </Typography>
                    </Box>
                    <Box>
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Date" value={date} onChange={handleDateChange} minDate={moment().format("YYYY-MM-DD")} />
                            </DemoContainer>
                        </LocalizationProvider> */}
                        {/* <DatePicker label="Date" value={date} onChange={handleDateChange} minDate={moment().format("YYYY-MM-DD")} /> */}
                        <Typography size="large" component="div">
                            Select Date
                        </Typography>
                        <TextField type="date" value={date} onChange={handleDateChange} min={moment().format("YYYY-MM-DD")} id="date" size="small" />
                    </Box>
                </Box>

            </Box>
            <hr />
            <Box my={2}>
                <Typography size="large" component="h4" variant="h4">
                    Book your seats at:
                </Typography>
            </Box>
            <ShowTheatresForMovie theatres={theatresByMovie} />
        </div>
    )
}

export default MovieDetails