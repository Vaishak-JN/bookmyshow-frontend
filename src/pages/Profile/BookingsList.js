import { useDispatch, useSelector } from "react-redux"
import { GetBookingsOfUser } from "../../api/bookings"
import { useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, CardActionArea, TextField } from '@mui/material';
import moment from 'moment';


const BookingsList = () => {

    const dispatch = useDispatch()
    const shows = useSelector(state => state.users.bookings)

    const getData = async () => {
        try {
            await dispatch(GetBookingsOfUser()).unwrap()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        getData()

    }, [])
    return (
        (shows?.length !== 0 && <div className="shows-container">
            {/* {shows.map(show => show.show.movie.name)} */}
            {shows.map(show => <Card key={show._id} sx={{ borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <CardActionArea sx={{ display: "flex", justifyContent: "start", alignItems: "start" }}>
                    <CardMedia
                        component="img"
                        height="100%"

                        sx={{ objectFit: "cover", maxWidth: "15%" }}
                        image={show.show.movie.poster}
                        alt="poster"
                    />
                    <CardContent sx={{ width: "60%" }}>
                        <Typography sx={{ mb: 1 }} variant="h5" component="h6">
                            {show.show.movie.name}
                        </Typography>
                        <Typography sx={{ mb: 1 }} variant="h5" component="h6">
                            Theatre: {show.show.theatre.name}
                        </Typography>

                        <Typography sx={{ mb: 1 }} variant="h5" component="h6">
                            Seats: {show.seats.join(",")}
                        </Typography>
                        <Typography sx={{ mb: 1 }} variant="h5" component="h6">
                            Date: {moment(show.show.date).format("DD-MM-YYYY")} at {moment(show.show.time, "HH:mm").format("hh:mm A")}
                        </Typography>
                        <Typography sx={{ mb: 1 }} variant="h5" component="h6">
                            Amount: ₹{show.show.ticketPrice * show.seats.length}
                        </Typography>
                        <Typography sx={{ mb: 1 }} variant="h5" component="h6">
                            Booking ID: {show._id.toUpperCase()}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>)}
        </div>)
    )
}

export default BookingsList