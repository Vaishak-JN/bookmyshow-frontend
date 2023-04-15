import React from 'react'
import PageTitle from '../../components/PageTitle'
import BasicTabs from "../../components/Tabs"
import MoviesList from '../Admin/MoviesList'
import TheatresList from './TheatresList'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllTheatres, GetAllTheatresByOwner } from '../../api/theatres'
import { useEffect } from 'react'
import { GetAllMovies } from '../../api/movies'
import BookingsList from './BookingsList'


let tabsArray = [
    {
        tabName: "Bookings",
        tabBody: <BookingsList />
    },
    {
        tabName: "Theatres",
        tabBody: <TheatresList />
    }
]

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)

    useEffect(() => {
        // dispatch(GetAllTheatres())
        dispatch(GetAllTheatresByOwner({ owner: user._id }))
        dispatch(GetAllMovies())
    }, [])

    return (
        <>
            <PageTitle title="profile" />
            <BasicTabs tabs={tabsArray} />
        </>
    )
}

export default Profile