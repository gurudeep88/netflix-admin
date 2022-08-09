import axios from "axios";
import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMoviesFailure, deleteMoviesStart, deleteMoviesSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./action"

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
         const res = await axios.get('/movie', {
            headers: {
                token: 
                `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
         })
         
         dispatch(getMoviesSuccess(res.data));
    } catch (error) {
        dispatch(getMoviesFailure(error));
    }
}

export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try {
         const res = await axios.post('/movie', movie, {
            headers: {
                token: 
                `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
         })
         console.log('res', res.data);
         dispatch(createMovieSuccess(res.data));
    } catch (error) {
        dispatch(createMovieFailure(error));
    }
}

export const updateMovie = async(movie, dispatch) => {
    dispatch(updateMovieStart());
    try{
        const res = await axios.put(`/movie/${movie._id}`, movie, {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
            }
        })
        dispatch(updateMovieSuccess(res.data));
    } catch(error){
        dispatch(updateMovieFailure(error));
    }
}

export const deleteMovie = async(id, dispatch) => {
    dispatch(deleteMoviesStart());
    try {
        await axios.delete(`/movie/${id}`, {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(deleteMoviesSuccess(id));
    } catch (error) {
        dispatch(deleteMoviesFailure(error));
    }
}