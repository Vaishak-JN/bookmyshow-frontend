import { Typography } from "@mui/material"

function PageTitle({ title }) {
    return (

        <Typography variant="h5" component="h5">
            {title.toUpperCase()}
        </Typography>
    )
}

export default PageTitle