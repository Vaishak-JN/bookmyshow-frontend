import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';


const ShowTheatresForMovie = ({ theatres }) => {
    return (
        // <h1>hi</h1>
        (theatres.map(theatre => <Card key={theatre._id} sx={{ width: "100%", marginBottom: "20px" }}>
            <CardContent >
                <Typography variant="h6" component="h6">
                    {theatre.name}
                </Typography>
                <Typography color="text.secondary">
                    {theatre.address}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    {theatre.shows.map(show =>
                        <Link key={show._id} to={`/book-show/${show._id}`} >
                            <Button color="success" sx={{ mr: 2 }} variant="outlined">
                                {moment(show.time, "HH:mm").format("hh:mm A")}
                            </Button>
                        </Link>
                    ).sort(
                        (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                    )}
                </Box>
            </CardContent>
        </Card >)
        )
    )
}

export default ShowTheatresForMovie