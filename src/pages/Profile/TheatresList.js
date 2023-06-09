import { Button } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TheatresForm from "./TheatresForm";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GetAllTheatres, GetAllTheatresByOwner, GetAllShowsByTheatre } from "../../api/theatres";
import { DeleteTheatre } from "../../api/theatres";
import Shows from "./Shows/Shows";


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

const TheatresList = () => {

    const theatres = useSelector(state => state.theatres.theatres)
    const user = useSelector(state => state.users.user)
    // console.log("theatres", theatres)

    const [showTheatreForm, setShowTheatreform] = useState(false)
    const [showTheatreShowForm, setShowTheatreShowForm] = useState(false)

    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [formType, setFormType] = useState("add");

    const dispatch = useDispatch();


    const getData = async () => {
        try {
            dispatch(ShowLoading());
            await dispatch(GetAllTheatresByOwner({ owner: user._id })).unwrap()
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            // message.error(error.message);
        }
    }

    // useEffect(() => {
    //     // dispatch(GetAllTheatres())
    //     // dispatch(GetAllTheatresByOwner({ owner: user._id }))
    //     // getData()
    // }, [])



    const addTheatre = () => {
        setFormType("add")
        setShowTheatreform(true)
    }

    const editTheatre = (id) => {
        const theatre = theatres.find(theatre => theatre._id === id)
        setSelectedTheatre(theatre)
        setFormType("edit")
        setShowTheatreform(true)
    }
    const closeModal = () => {

        setSelectedTheatre(null)
        setFormType("add")
        setShowTheatreform(false)
    }
    const closeShowModal = () => {

        // setSelectedTheatre(null)
        // setFormType("add")
        setSelectedTheatre(null)
        setShowTheatreShowForm(false)
    }


    const deleteTheatre = async (id) => {
        await dispatch(DeleteTheatre({ theatreId: id })).unwrap()
        // getData()
    }

    const showData = (theatre) => {
        setSelectedTheatre(theatre)
        dispatch(GetAllShowsByTheatre({ theatreId: theatre._id }))
        setShowTheatreShowForm(true)
    }
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    size="large"
                    color="error"
                    sx={{ marginRight: "20px" }}
                    onClick={addTheatre}
                >
                    Add Theatre
                </Button>
            </div>
            <br />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#333545" }}>
                        <TableRow >
                            <TableCell sx={{ color: "white" }}>Name</TableCell>
                            <TableCell sx={{ color: "white" }} >Address</TableCell>
                            <TableCell sx={{ color: "white" }} >Number</TableCell>
                            <TableCell sx={{ color: "white" }} >Email</TableCell>
                            <TableCell sx={{ color: "white" }} >Shows</TableCell>
                            <TableCell sx={{ color: "white" }} >Status</TableCell>
                            <TableCell sx={{ color: "white" }} >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {theatres.map(theatre => {
                            return (
                                <TableRow key={theatre._id}>

                                    <TableCell>{theatre.name}</TableCell>
                                    <TableCell>{theatre.address}</TableCell>
                                    <TableCell>{theatre.number}</TableCell>
                                    <TableCell>{theatre.email}</TableCell>
                                    <TableCell>{theatre.isActive ? <Button color="primary"
                                        variant="contained"
                                        size="small"
                                        onClick={() => showData(theatre)}
                                    >Shows</Button> : ""}</TableCell>
                                    <TableCell>{theatre.isActive ? "Approved" : "Pending"}</TableCell>

                                    <TableCell>
                                        <EditIcon color="primary" sx={{ cursor: "pointer" }}
                                            onClick={() => editTheatre(theatre._id)}
                                        />
                                        <DeleteIcon color="error" sx={{ cursor: "pointer" }}
                                            onClick={() => deleteTheatre(theatre._id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}


                    </TableBody>
                </Table>
            </TableContainer>


            <Modal

                open={showTheatreForm}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{ overflow: "scroll", maxHeight: "70%" }}>
                    <TheatresForm onClose={closeModal} formType={formType} selectedTheatre={selectedTheatre} />

                </Box>
            </Modal>

            <Modal

                open={showTheatreShowForm}
                onClose={closeShowModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{ overflow: "scroll", maxHeight: "70%" }}>
                    <Shows onClose={closeShowModal} selectedTheatre={selectedTheatre} />
                </Box>
            </Modal>
        </div>
    )
}

export default TheatresList