import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
// import { AddTheatre, GetAllTheatresByOwner, UpdateTheatre } from '../../api/theatres';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';
import { AddShow } from '../../../api/theatres';


const ShowsForm = ({ selectedTheatre, getData, formType, onClose }) => {

    // const user = useSelector(state => state.users.user)
    const movies = useSelector(state => state.movies.movies)

    console.log(movies)

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [ticketPrice, setTicketPrice] = useState("")
    const [movie, setMovie] = useState("")
    const [totalSeats, setTotalSeats] = useState("")
    // const [name, setName] = useState(selectedTheatre ? selectedTheatre.name : "")
    // const [date, setDate] = useState(selectedTheatre ? moment(selectedTheatre.date).format("YYYY-MM-DD") : "")
    // const [time, setTime] = useState(selectedTheatre ? selectedTheatre.time : "")
    // const [ticketPrice, setTicketPrice] = useState(selectedTheatre ? selectedTheatre.ticketPrice : "")
    // const [movie, setMovie] = useState(selectedTheatre ? selectedTheatre.movie : "")
    // const [totalSeats, setTotalSeats] = useState(selectedTheatre ? selectedTheatre.totalSeats : "")

    // let id = selectedMovie?._id
    // console.log(movie)


    const movieId = movies.find(m => m.name === movie) || null
    // console.log("id", movieId)
    const values = {
        theatre: selectedTheatre._id,
        // movie: movieId._id,
        name,
        date,
        time,
        ticketPrice,
        totalSeats
    }

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            // dispatch(ShowLoading());
            let response = null;
            await dispatch(AddShow({ ...values, movie: movieId._id, })).unwrap();

            // if (formType === "add") {
            //     await dispatch(AddTheatre(values)).unwrap();
            //     // await AddTheatre(values);
            //     // const res = await dispatch(GetAllTheatresByOwner({ owner: user._id })).unwrap()
            // } else {
            //     await dispatch(UpdateTheatre({
            //         ...values,
            //         theatreId: id,
            //     })).unwrap();
            //     // const res = await dispatch(GetAllTheatresByOwner({ owner: user._id })).unwrap()
            // }

            onClose(false)

            if (response.success) {
                // getData()
            }
            // dispatch(HideLoading());
        } catch (error) {
            // dispatch(HideLoading());

        }
    };

    const handleReset = () => {
        setName("")
        setDate("")
        setTime("")
        setMovie("")
        setTicketPrice("")
        setTotalSeats("")
        onClose()
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleDateChange = (e) => {
        setDate(e.target.value)
    }
    const handleTimeChange = (e) => {
        setTime(e.target.value)
    }
    const handleMovieChange = (e) => {
        setMovie(e.target.value)
        console.log(movie)
    }
    const handleTicketPriceChange = (e) => {
        setTicketPrice(e.target.value)
    }
    const handleTotalSeatsChange = (e) => {
        setTotalSeats(e.target.value)
    }

    return (
        <>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                {formType === "add" && <h3>Add Theatre</h3>}
                {formType === "edit" && <h3>Edit Theatre</h3>}

            </Typography> */}

            {/* <FormControl fullWidth> */}
            <TextField value={name} onChange={handleNameChange} sx={{ margin: "10px 0" }} label="Show name" autoComplete="off" id="name" size="small" fullWidth required />

            <TextField type="date" value={date} onChange={handleDateChange} sx={{ margin: "10px 0" }} autoComplete="off" id="date" size="small" fullWidth required />



            <TextField value={time} onChange={handleTimeChange} sx={{ margin: "10px 0" }} label="Time" autoComplete="off" id="time" type="time" size="small" fullWidth required />

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Movie</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={movie}
                    label="Age"
                    onChange={handleMovieChange}
                >
                    {movies.map(movie => <MenuItem key={movie._id} value={movie.name}>{movie.name}</MenuItem>)}
                </Select>
            </FormControl>

            <TextField value={ticketPrice} onChange={handleTicketPriceChange} sx={{ margin: "10px 0" }} label="TicketPrice" autoComplete="off" id="ticketPrice" size="small" fullWidth required type="number" />

            <TextField value={totalSeats} onChange={handleTotalSeatsChange} sx={{ margin: "10px 0" }} label="TotalSeats" autoComplete="off" id="totalSeats" size="small" fullWidth required type="number" />



            <Button color="error" variant="contained" sx={{ margin: "20px 10px 20px 0px" }} size="medium"
                onClick={handleReset}
            >
                <Typography variant="p" component="p" >
                    Cancel
                </Typography>
            </Button>
            <Button variant="contained" sx={{ margin: "20px 0" }} size="medium" onClick={handleSubmit}>
                <Typography variant="p" component="p" >
                    Submit
                </Typography>
            </Button>

            {/* </FormControl> */}

        </>
    )
}

export default ShowsForm