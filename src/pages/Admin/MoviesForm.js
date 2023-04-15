import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddMovie, UpdateMovie } from "../../api/movies";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import moment from "moment";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const MovieForm = ({ selectedMovie, getData, formType, onClose }) => {

    // const navigate = useNavigate()
    const [name, setName] = useState(selectedMovie ? selectedMovie.name : "")
    const [description, setDescription] = useState(selectedMovie ? selectedMovie.description : "")
    const [duration, setDuration] = useState(selectedMovie ? selectedMovie.duration : "")
    const [language, setLanguage] = useState(selectedMovie ? selectedMovie.language : "")
    const [genre, setGenre] = useState(selectedMovie ? selectedMovie.genre : "")
    const [releaseDate, setReleaseDate] = useState(selectedMovie ? moment(selectedMovie.releaseDate).format(
        "YYYY-MM-DD") : "")
    const [poster, setPoster] = useState(selectedMovie ? selectedMovie.poster : "")

    let id = selectedMovie?._id

    const values = {
        name,
        description,
        duration,
        releaseDate,
        language,
        genre,
        poster
    }

    const dispatch = useDispatch();
    const handleSubmit = async () => {
        try {
            dispatch(ShowLoading());
            let response = null;

            if (formType === "add") {
                response = await AddMovie(values);
            } else {
                response = await dispatch(UpdateMovie({
                    ...values,
                    movieId: selectedMovie._id,
                }));
            }

            onClose(false)

            if (response.success) {
                getData();
                // message.success(response.message);

            } else {
                // message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            // message.error(error.message);
        }
    };

    const handleReset = () => {
        setName("")
        setDescription("")
        setDuration("")
        setGenre("")
        setReleaseDate("")
        setLanguage("")
        setPoster("")
        onClose(false)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handleDurationChange = (e) => {
        setDuration(e.target.value)
    }
    const handleGenreChange = (e) => {
        setGenre(e.target.value)
    }
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value)
    }
    const handleDateChange = (e) => {
        setReleaseDate(e.target.value)
    }
    const handlePosterChange = (e) => {
        setPoster(e.target.value)
    }


    return (

        <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {formType === "add" && <h3>Add Movie</h3>}
                {formType === "edit" && <h3>Edit Movie</h3>}
            </Typography>


            <TextField value={name} onChange={handleNameChange} sx={{ margin: "10px 0" }} label="Name" autoComplete="off" id="name" size="small" fullWidth required />

            <TextField value={description} onChange={handleDescriptionChange} sx={{ margin: "10px 0" }} label="Description" autoComplete="off" id="description" size="small" fullWidth required multiline rows={4} />


            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ flexGrow: 1, flexBasis: "50%" }}>

                    <TextField value={duration} onChange={handleDurationChange} sx={{ margin: "10px 0" }} label="Duration in mins" autoComplete="off" id="duration" size="small" type="number" required />
                </div>
                <div style={{ flexGrow: 1, flexBasis: "50%" }}>

                    <Select
                        value={language}
                        onChange={handleLanguageChange}
                        // displayEmpty
                        // label="Language"
                        fullWidth
                        size="small"
                        sx={{ margin: "10px 0" }}
                    >
                        <MenuItem value={"Malayalam"}>Malayalam</MenuItem>
                        <MenuItem value={"English"}>English</MenuItem>
                        <MenuItem value={"Tamil"}>Tamil</MenuItem>
                        <MenuItem value={"Hindi"}>Hindi</MenuItem>
                    </Select>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ flexGrow: 1, flexBasis: "50%" }}>


                    <TextField value={releaseDate} onChange={handleDateChange} sx={{ margin: "10px 0" }} autoComplete="off" id="date" size="small" type="date" required />
                </div>
                <div style={{ flexGrow: 1, flexBasis: "50%" }}>

                    <Select

                        value={genre}
                        onChange={handleGenreChange}
                        // id="genre"
                        // label="Genre"
                        fullWidth
                        size="small"
                        sx={{ margin: "10px 0" }}
                    >
                        <MenuItem value={"Action"}>Action</MenuItem>
                        <MenuItem value={"Drama"}>Drama</MenuItem>
                        <MenuItem value={"Comedy"}>Comedy</MenuItem>
                        <MenuItem value={"Romance"}>Romance</MenuItem>
                        <MenuItem value={"Crime"}>Crime</MenuItem>
                        <MenuItem value={"Kids"}>Kids</MenuItem>
                    </Select>
                </div>
            </div>


            <TextField value={poster} onChange={handlePosterChange} sx={{ margin: "10px 0" }} label="Poster Url" autoComplete="off" id="poster" size="small" fullWidth required />



            <Button color="error" variant="contained" sx={{ margin: "20px 10px 20px 0px" }} size="medium" onClick={handleReset}>
                <Typography variant="p" component="p" >
                    Cancel
                </Typography>
            </Button>
            <Button variant="contained" sx={{ margin: "20px 0" }} size="medium" onClick={handleSubmit}>
                <Typography variant="p" component="p" >
                    Submit
                </Typography>
            </Button>



        </>



    );
}

export default MovieForm;