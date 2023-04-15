import {
    Typography, Button, Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material"
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowsForm from "./ShowsForm";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteShow, GetAllShowsByTheatre } from "../../../api/theatres";
import moment from "moment";


const Shows = ({ onClose, selectedTheatre }) => {


    const [addShow, setAddShow] = useState(false)

    const dispatch = useDispatch()

    // dispatch(GetAllShowsByTheatre({ theatreId: selectedTheatre._id }))

    const movies = useSelector(state => state.movies.movies)
    const shows = useSelector(state => state.theatres.shows)
    // console.log(shows)


    const deleteShow = (id) => {
        dispatch(DeleteShow({ showId: id }))
    }


    return (
        <>
            <Typography id="modal-modal-title" variant="h4" component="h2">
                {selectedTheatre.name}
            </Typography>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Shows
                </Typography>
                {!addShow && <Button
                    variant="contained"
                    size="medium"
                    color="info"
                    onClick={() => setAddShow(!addShow)}
                >
                    Add Show
                </Button>}
            </div>
            <br />
            {!addShow ? (<TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#333545" }}>
                        <TableRow >
                            <TableCell sx={{ color: "white" }}>Show Name</TableCell>
                            <TableCell sx={{ color: "white" }} >Date</TableCell>
                            <TableCell sx={{ color: "white" }} >Time</TableCell>
                            <TableCell sx={{ color: "white" }} >Movie</TableCell>
                            <TableCell sx={{ color: "white" }} >Ticket Price</TableCell>
                            <TableCell sx={{ color: "white" }} >Total Seats</TableCell>
                            <TableCell sx={{ color: "white" }} >Availbale Seats</TableCell>
                            <TableCell sx={{ color: "white" }} >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {shows.map(show => {
                            return (
                                <TableRow key={show._id}>

                                    <TableCell>{show.name}</TableCell>
                                    <TableCell>{moment(show.date).format(
                                        "DD-MM-YYYY")}</TableCell>
                                    <TableCell>{show.time}</TableCell>
                                    <TableCell>{show.movie.name}</TableCell>
                                    <TableCell>{show.ticketPrice}</TableCell>
                                    <TableCell>{show.totalSeats}</TableCell>
                                    <TableCell>{show.totalSeats - show.bookedSeats.length}</TableCell>
                                    {/* <TableCell>{show.isActive ? <Button color="error"
                                        variant="outlined"
                                        size="small"
                                        onClick={() => showData(show)}
                                    >Show</Button> : ""}</TableCell> */}
                                    {/* <TableCell>{show.isActive ? "Approved" : "Pending"}</TableCell> */}

                                    <TableCell>
                                        {/* <EditIcon color="primary" sx={{ cursor: "pointer" }}
                                        onClick={() => editshow(show._id)}
                                        /> */}
                                        {show.bookedSeats.length === 0 &&
                                            <DeleteIcon color="error" sx={{ cursor: "pointer" }}
                                                onClick={() => deleteShow(show._id)}
                                            />}
                                    </TableCell>
                                </TableRow>
                            )
                        })}


                    </TableBody>
                </Table>
            </TableContainer>)
                :
                (
                    <ShowsForm onClose={onClose} selectedTheatre={selectedTheatre} />
                )
            }
            <br />
            {!addShow && <Button
                variant="contained"
                size="small"
                color="error"
                sx={{ marginTop: "10px" }}
                onClick={onClose}
            >
                Close
            </Button>}
        </>
    )
}

export default Shows