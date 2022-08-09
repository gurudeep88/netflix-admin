import { useState } from "react";
import axios from 'axios';
import "./newProduct.css";
import { createMovie } from "../../context/movieContext/apiCall";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext";

export default function NewProduct() {
  const {dispatch} = useContext(MovieContext);
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgThumb, setImgThumb] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setMovie({ ...movie, [name]: value });
  };
  console.log('movie', movie, uploaded);

  const upload = (items) => {
    items.forEach(async(item) => {
      if(item.file){
        const data = new FormData();
        const filename = Date.now() +"_"+ item.file.name;
        data.append("name", filename);
        data.append("file", item.file);
        console.log('data', data);
        try {
          await axios.post('/movie/upload', data, {
            headers: {
              token: JSON.parse(localStorage.getItem('user'))
            }
          });
        } catch (error) {
          console.log(error);
        }
        setMovie(prev => ({...prev, [item.label]: filename}));
        setUploaded(prev => prev+1);
      }
    })
  }

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      {file: img, label: "img"},
      {file: imgTitle, label: "imgTitle"},
      {file: imgThumb, label: "imgThumb"},
      {file: trailer, label: "trailer"},
      {file: video, label: "video"},
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  }

console.log(img);
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="imgThumb"
            name="imgThumb"
            onChange={(e) => setImgThumb(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="Limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {
          uploaded === 5 ? 
            <button className="addProductButton" onClick={handleSubmit}>Create</button>
            :
            <button className="addProductButton" onClick={handleUpload}>Upload</button>
        }
      </form>
    </div>
  );
}
