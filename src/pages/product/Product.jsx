import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { getMovieUrl } from "../../utils";
import { useState } from "react";
import axios from "axios";
import { updateMovie } from "../../context/movieContext/apiCall";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext";

export default function Product() {
  const location = useLocation();
  const movie = location.movie;
  const [updatedMovie, setUpdatedMovie] = useState(movie);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const {dispatch} = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUpdatedMovie({ ...updatedMovie, [name]: value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const upload = (items) => {
        items.map(async(item)=>{
            if(item.file){
                const filename = Date.now()+"_"+item.file.name;
                const data = new FormData();
                data.append("name", filename);
                data.append("file", item.file);
                console.log('daat', data);
                try {
                    await axios.post('/movie/upload', data, {
                        header: {
                            token: JSON.parse(localStorage.getItem('user'))
                    }
                    })
                } catch (error) {
                    console.log(error);
                }
                setUpdatedMovie(prev=>({...prev, [item.label]: filename }));
                }
        })
    }
    upload([
        {file: trailer, label: 'trailer'},
        {file: video, label: 'video'}
    ]);
    console.log('movier', movie)
    updateMovie(updatedMovie, dispatch);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={getMovieUrl(`${movie.img}`)}
              alt="product"
              className="productInfoImg"
            />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              name="title"
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={movie.year}
              name="year"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              name="genre"
              onChange={handleChange}
            />
            <label>Limit</label>
            <input
              type="text"
              placeholder={movie.limit}
              name="limit"
              onChange={handleChange}
            />
            <label>Trailer</label>
            <input
              type="file"
              name="trailer"
              placeholder={movie.trailer}
              onChange={(e) => setTrailer(e.target.value)}
            />
            <label>Video</label>
            <input
              type="file"
              name='video'
              placeholder={movie.video}
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={getMovieUrl(`${movie.img}`)}
                alt="product"
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={handleUpload} >Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
