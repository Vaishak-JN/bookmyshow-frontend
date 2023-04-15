import React from 'react'
import PageTitle from '../../components/PageTitle'
import BasicTabs from '../../components/Tabs'
import MoviesList from './MoviesList'
import TheatresList from './TheatresList'
import { useDispatch } from 'react-redux'
import { GetAllMovies } from '../../api/movies'
import { GetAllTheatres } from '../../api/theatres'
import { useEffect } from 'react'


let tabsArray = [
    {
        tabName: "Movies",
        tabBody: <MoviesList />
    },
    {
        tabName: "Theatres",
        tabBody: <TheatresList />
    }
]

const Admin = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAllMovies())
        dispatch(GetAllTheatres())
    }, [])

    return (
        <div>
            <PageTitle title="admin" />
            <BasicTabs tabs={tabsArray} />
        </div>
    )
}

export default Admin