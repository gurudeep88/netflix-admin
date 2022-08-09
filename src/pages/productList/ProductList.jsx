import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext";
import { useEffect } from "react";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCall";
import { getMovieUrl } from "../../utils";

export default function ProductList() {
  const {movies, dispatch} = useContext(MovieContext);
  useEffect(()=>{
    getMovies(dispatch);
  },[dispatch])

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
    //setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        console.log(params.row.img);
        return (
          <div className="productListItem">
            <img className="productListImg" src={getMovieUrl(`${params.row.img}`)} alt="product" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "isSeries", headerName: "IsSeries", width: 120 },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/product/" + params.row._id, movie: params.row}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
console.log('movies new', movies);
  return (
    <div className="productList">
      {movies.length>0 && <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={r => r._id}
      /> }
    </div>
  );
}
