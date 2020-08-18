import React, {useState, useEffect} from 'react';
import {Link as LinkRouter} from 'react-router-dom'
import axios from "axios"
import Button from '@material-ui/core/Button'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Image from 'material-ui-image'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'
import Title from './Title';

const MovieTable = () => {
  const [movie, setMovie] = useState(null)
  const [sortType,setSortType] = useState(true)

  const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    if (movie === null) {
        axios.get(`https://backendexample.sanbersy.com/api/movies`)
        .then(res => {
          setMovie(res.data.map(el => {
            return {
              id: el.id,
              created_at: el.created_at,
              updated_at: el.updated_at,
              title: el.title,
              description: el.description,
              year: el.year,
              duration: el.duration,
              genre: el.genre,
              rating: el.rating,
              review: el.review,
              image_url: el.image_url
            }
          }))
        })
      }
    })

    const sortColumn = (field) => {
      setSortType(!sortType)

       const sorted = [...movie].sort(function(a,b){
           switch (field) {
               case "title":
                   if (sortType) {
                       return (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : ((b.title.toUpperCase() > a.title.toUpperCase()) ? -1 : 0);
                   }else{
                       return (a.title.toUpperCase() < b.title.toUpperCase()) ? 1 : ((b.title.toUpperCase() < a.title.toUpperCase()) ? -1 : 0);
                   }
                  
               case "description":
                   if (sortType) {
                       return (a.description.toUpperCase() > b.description.toUpperCase()) ? 1 : ((b.description.toUpperCase() > a.description.toUpperCase()) ? -1 : 0);
                   }else{
                       return (a.description.toUpperCase() < b.description.toUpperCase()) ? 1 : ((b.description.toUpperCase() < a.description.toUpperCase()) ? -1 : 0);
                   }
               
               case "year":
                   if (sortType) {
                       return (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0);
                   }else{
                       return (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0);
                   }
                 
               case "duration":
                   if (sortType) {
                       return (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0);
                   }else{
                       return (a.duration < b.duration) ? 1 : ((b.duration < a.duration) ? -1 : 0);
                   }
                  
               case "genre":
                   if (sortType) {
                       return (a.genre.toUpperCase() > b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() > a.genre.toUpperCase()) ? -1 : 0);
                   }else{
                       return (a.genre.toUpperCase() < b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() < a.genre.toUpperCase()) ? -1 : 0);
                   }
                 
               case "rating":
                   if (sortType) {
                       return (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0);
                   }else{
                       return (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0);
                   }
                
           
               default:
                   break;
           }
       })

         setMovie(sorted);
     }

const Action = ({idMovie}) => {

  const handleDelete = () => {
      console.log(idMovie)
      let newMovie = movie.filter(el => el.id !== idMovie);
      axios.delete(`https://backendexample.sanbersy.com/api/movies/${idMovie}`)
          .then(res => {
              console.log(res);
              alert('Data Berhasil DiHapus !')
          })
      setMovie([...newMovie])
  }

  return (
      <>
          <Button onClick={handleDelete}> 
            Hapus
          </Button>
          <Button component={LinkRouter} to={`/movie/movietable/edit/${idMovie}`}> 
            Edit
          </Button>
      </>
  )
}

const handleSearch = (event) => {
  let strSearch = event.target.value
  axios.get(`https://backendexample.sanbersy.com/api/movies`)
    .then(res => {
      let findMovie = res.data.filter(o => o.title.toLowerCase().includes(strSearch.toLowerCase()) || o.year.toString().toLowerCase().includes(strSearch.toLowerCase()) || o.genre.toLowerCase().includes(strSearch.toLowerCase()) || o.rating.toString().toLowerCase().includes(strSearch.toLowerCase()))
      setMovie(findMovie.map(el=>{ 
          return {
              id: el.id,
              created_at: el.created_at,
              updated_at: el.updated_at,
              title: el.title,
              description: el.description,
              year: el.year,
              duration: el.duration,
              genre: el.genre,
              rating: el.rating,
              image_url: el.image_url
          }
      }))
    })
}
  return(
    <center><Card style={{maxWidth:"100%", marginBottom:"20px"}}>
                <CardContent>
    <React.Fragment>
      <Title><strong>Movie Table</strong></Title>
      <Button href="/movie/movietable/create" variant="contained" color="primary" style={{ float: "right", marginRight: "5px"}}> 
        <AddIcon />Add Movie
      </Button>
      <TextField variant="outlined" id="search" label="Search" name="search" style={{ float: "left"}} onChange={handleSearch}/>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>No</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
            <TableCell><strong>Updated At</strong></TableCell>
            <TableCell onClick={()=>sortColumn("title")}><strong>Title</strong></TableCell>
            <TableCell onClick={()=>sortColumn("duration")}><strong>Duration</strong></TableCell>
            <TableCell onClick={()=>sortColumn("genre")}><strong>Genre</strong></TableCell>
            <TableCell onClick={()=>sortColumn("rating")}><strong>Rating</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell><strong>Image</strong></TableCell>
            <TableCell><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {movie != null && movie.map((el, index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{el.created_at}</TableCell>
              <TableCell>{el.updated_at}</TableCell>
              <TableCell>{el.title}</TableCell>
              <TableCell>{el.duration}</TableCell>
              <TableCell>{el.genre}</TableCell>
              <TableCell>{el.rating}</TableCell>
              <TableCell>{el.description}</TableCell>
              <TableCell>
                <Image src={el.image_url}/>
              </TableCell>
              <TableCell>
                <Action idMovie={el.id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
    </CardContent>
    </Card></center>
  )
}

export default MovieTable