import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddTheatre, GetAllTheatresByOwner, UpdateTheatre } from '../../api/theatres';


const TheatresForm = ({ selectedTheatre, getData, formType, onClose }) => {

    const user = useSelector(state => state.users.user)

    // console.log(user)

    const [name, setName] = useState(selectedTheatre ? selectedTheatre.name : "")
    const [address, setAddress] = useState(selectedTheatre ? selectedTheatre.address : "")
    const [number, setNumber] = useState(selectedTheatre ? selectedTheatre.number : "")
    const [email, setEmail] = useState(selectedTheatre ? selectedTheatre.email : "")

    let id = selectedTheatre?._id

    const values = {
        id,
        name,
        address,
        number,
        email,
        owner: user._id
    }

    const dispatch = useDispatch();
    const handleSubmit = async () => {
        try {
            dispatch(ShowLoading());
            let response = null;

            if (formType === "add") {
                await dispatch(AddTheatre(values)).unwrap();
                // await AddTheatre(values);
                // const res = await dispatch(GetAllTheatresByOwner({ owner: user._id })).unwrap()
            } else {
                await dispatch(UpdateTheatre({
                    ...values,
                    theatreId: id,
                })).unwrap();
                // const res = await dispatch(GetAllTheatresByOwner({ owner: user._id })).unwrap()
            }

            onClose(false)

            if (response.success) {
                // getData()
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());

        }
    };

    const handleReset = () => {
        setName("")
        setAddress("")
        setNumber("")
        setEmail("")
        onClose()
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleNumberChange = (e) => {
        setNumber(e.target.value)
    }
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    return (
        <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {formType === "add" && <h3>Add Theatre</h3>}
                {formType === "edit" && <h3>Edit Theatre</h3>}

            </Typography>

            {/* <FormControl fullWidth> */}
            <TextField value={name} onChange={handleNameChange} sx={{ margin: "10px 0" }} label="Name" autoComplete="off" id="name" size="small" fullWidth required />

            <TextField value={address} onChange={handleAddressChange} sx={{ margin: "10px 0" }} label="Address" autoComplete="off" id="address" size="small" fullWidth required multiline rows={4} />



            <TextField value={number} onChange={handleNumberChange} sx={{ margin: "10px 0" }} label="Number" autoComplete="off" id="number" size="small" fullWidth required />

            <TextField value={email} onChange={handleEmailChange} sx={{ margin: "10px 0" }} label="Email" autoComplete="off" id="email" size="small" fullWidth required />



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

            {/* </FormControl> */}

        </>
    )
}

export default TheatresForm