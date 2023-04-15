import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { GetShowById } from "../api/theatres"
import { Typography, Paper, Box, Button } from '@mui/material';
import moment from "moment";
import { ResetTheatresShow } from "../redux/theatresSlice";
import StripeCheckout from "react-stripe-checkout";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { MakePayment, BookShowTickets } from "../api/bookings";


const BookShow = () => {

    const [selectedSeats, setSelectedSeats] = useState([])
    const [totalCost, setTotalCost] = useState(0)

    const stripe_public_key = "pk_test_51MpoUcSB2F8scByEUIKww6uSFqit9UKi7bXyXEmb59wJNYtuhIrhQCuYAXIhlONQwvfCxhK7Lt9jMKb1JWkN5stY00Us3iYC8N"
    const dispatch = useDispatch()
    const show = useSelector(state => state.theatres.showById) || null
    const user = useSelector(state => state.users.user)

    const { id } = useParams()
    const navigate = useNavigate()
    const getData = async () => {
        try {
            const res = await dispatch(GetShowById({ showId: id })).unwrap()
            return res
        } catch (err) {
            console.log(err)
        }
    }

    console.log(show)

    useEffect(() => {
        // if (!show) {
        getData()
        // }
        return () => {
            dispatch(ResetTheatresShow())
        }

    }, [])

    const handleSeatSelect = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(prev => prev.filter(s => s !== seat))
            setTotalCost(prev => prev - show.ticketPrice)
        } else {
            setSelectedSeats(prev => [...prev, seat])
            setTotalCost(prev => prev + show.ticketPrice)
        }

    }

    // const columns = 10
    const totalSeats = show?.totalSeats

    const bookedSeats = show?.bookedSeats?.map(el => parseInt(el))

    const book = async (transactionId) => {
        try {
            dispatch(ShowLoading());
            const response = await BookShowTickets({
                show: id,
                seats: selectedSeats,
                transactionId,
                user: user._id,
            });
            if (response.success) {
                // message.success(response.message);
                navigate("/profile");
            } else {
                // message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            // message.error(error.message);
            dispatch(HideLoading());
        }
    };

    const onToken = async (token) => {
        console.log(token)
        try {
            dispatch(ShowLoading());
            const response = await MakePayment(
                token,
                selectedSeats.length * show.ticketPrice * 100
            );
            if (response.success) {

                await book(response.data);
            } else {

            }
            dispatch(HideLoading());
        } catch (error) {

            dispatch(HideLoading());
        }
    };


    return (
        (show.theatre && <>
            <Paper elevation={5} sx={{ display: "flex", justifyContent: "space-between", p: 4 }}>
                <Typography color="text.secondary" variant="h5" component="h5">
                    {show?.theatre.name}
                    <Typography sx={{ fontSize: "18px" }} color="text.secondary" variant="p" component="p">
                        {show?.theatre.address}
                    </Typography>
                    <br />
                    {totalCost > 0 && <Box >
                        <StripeCheckout
                            currency="INR"
                            token={onToken}
                            stripeKey={stripe_public_key}
                            amount={totalCost * 100}
                        >
                            <Button variant="outlined" color="error" >
                                Pay {totalCost}
                            </Button>
                        </StripeCheckout>
                    </Box>}
                </Typography>
                <Typography variant="h4" component="h4">
                    {show?.movie.name}
                </Typography>
                <Typography color="text.secondary" variant="h5" component="h5">
                    {moment(show.date).format("MMM Do yyyy")} -{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                </Typography>
            </Paper>

            <div className="seats-container">
                <div className="seats">
                    {Array.from(Array(totalSeats).keys()).map((seat, index) => { //0 to 99
                        return (
                            <button key={index + 1}
                                value={index + 1}
                                className={
                                    bookedSeats.includes(index + 1)
                                        ? "seat booked-seat"
                                        : (selectedSeats.includes(index + 1) ? "seat selected-seat" : "seat")
                                }
                                onClick={() => handleSeatSelect(index + 1)}
                                disabled={bookedSeats.includes(index + 1)}
                            >
                                {index + 1}
                            </button>
                        )


                    })}
                </div>
                {/* {Array.from(Array(totalSeats).keys()).map((seat, index) => { //0 to 99
                    return <div className="seats">
                        {Array.from(Array(columns).keys()).map((column, index) => { //0 to 9
                            console.log({ seat, columns, column })
                            return <div className="seat" style={{ margin: "10px", width: "40px", height: "40px", border: "1px solid green" }}>
                                {seat * columns + column + 1}
                            </div>
                        })}
                    </div>
                })} */}

            </div>
            <div className="screen">
                Screen
            </div>
        </>)
    )
}

export default BookShow