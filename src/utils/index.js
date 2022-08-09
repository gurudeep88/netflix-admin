export const getMovieUrl = (image) => {
    return image.substring(0,5) === 'https' ? image : process.env.REACT_APP_API_SERVICE_HOST+"images/" + image;
}