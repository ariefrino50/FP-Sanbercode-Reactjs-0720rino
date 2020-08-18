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

const GameTable = () => {
  const [game, setGame] = useState(null)
  const [sortType,setSortType] = useState(true)

  const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    if (game === null) {
        axios.get(`https://backendexample.sanbersy.com/api/games`)
        .then(res => {
          setGame(res.data.map(el => {
            return {
              id: el.id,
              created_at: el.created_at,
              updated_at: el.updated_at,
              name: el.name,
              genre: el.genre,
              singlePlayer: el.singlePlayer,
              multiplayer: el.multiplayer,
              platform: el.platform,
              release: el.release,
              image_url: el.image_url
            }
          }))
        })
      }
    })

    const sortColumn = (field) => {
      setSortType(!sortType)

       const sorted = [...game].sort(function(a,b){
           switch (field) {
               case "name":
                   if (sortType) {
                       return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0);
                   }else{
                       return (a.name.toUpperCase() < b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() < a.name.toUpperCase()) ? -1 : 0);
                   }
                   
               case "genre":
                   if (sortType) {
                       return (a.genre.toUpperCase() > b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() > a.genre.toUpperCase()) ? -1 : 0);
                   }else{
                       return (a.genre.toUpperCase() < b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() < a.genre.toUpperCase()) ? -1 : 0);
                   }
                   
               case "singlePlayer":
                   if (sortType) {
                       return (a.singlePlayer > b.singlePlayer) ? 1 : ((b.singlePlayer > a.singlePlayer) ? -1 : 0);
                   }else{
                       return (a.singlePlayer < b.singlePlayer) ? 1 : ((b.singlePlayer < a.singlePlayer) ? -1 : 0);
                   }
                  
               case "multiplayer":
                   if (sortType) {
                       return (a.multiplayer > b.multiplayer) ? 1 : ((b.multiplayer > a.multiplayer) ? -1 : 0);
                   }else{
                       return (a.multiplayer < b.multiplayer) ? 1 : ((b.multiplayer < a.multiplayer) ? -1 : 0);
                   }
                   
               case "platform":
                   if (sortType) {
                       return (a.platform.toUpperCase() > b.platform.toUpperCase()) ? 1 : ((b.platform.toUpperCase() > a.platform.toUpperCase()) ? -1 : 0);
                   }else{
                       return (a.platform.toUpperCase() < b.platform.toUpperCase()) ? 1 : ((b.platform.toUpperCase() < a.platform.toUpperCase()) ? -1 : 0);
                   }
                   
               case "release":
                   if (sortType) {
                       return (a.release.toUpperCase() > b.release.toUpperCase()) ? 1 : ((b.release.toUpperCase() > a.release.toUpperCase()) ? -1 : 0);
                   }else{
                       return (a.release.toUpperCase() < b.release.toUpperCase()) ? 1 : ((b.release.toUpperCase() < a.release.toUpperCase()) ? -1 : 0);
                   }
                   default:
                     break;
           }
       })
       setGame(sorted);
     }

const Action = ({idGame}) => {

  const handleDelete = () => {
      console.log(idGame)
      let newGame = game.filter(el => el.id !== idGame);
      axios.delete(`https://backendexample.sanbersy.com/api/games/${idGame}`)
          .then(res => {
              console.log(res);
              alert('Data Berhasil DiHapus !')
          })
      setGame([...newGame])
  }

  return (
      <>
          <Button onClick={handleDelete}> 
            Hapus
          </Button>
          <Button component={LinkRouter} to={`/game/gametable/edit/${idGame}`} > 
            Edit
          </Button>
      </>
  )
}

const handleSearch = (event) => {
  let strSearch = event.target.value
  axios.get(`https://backendexample.sanbersy.com/api/games`)
    .then(res => {
      let findGame = res.data.filter(o => o.name.toLowerCase().includes(strSearch.toLowerCase()) || o.release.toString().toLowerCase().includes(strSearch.toLowerCase()) || o.genre.toLowerCase().includes(strSearch.toLowerCase()) || o.platform.toString().toLowerCase().includes(strSearch.toLowerCase())
      )
      setGame(findGame.map(el=>{ 
          return {
              id : el.id,
              created_at : el.created_at,
              updated_at : el.updated_at,
              name : el.name,
              genre : el.genre,
              singlePlayer : el.singlePlayer,
              multiPlayer : el.multiplayer,
              platform : el.platform,
              release : el.release,
              image_url : el.image_url
          }
      }))
    })
}
  return(
    <center><Card style={{maxWidth:"100%", marginBottom:"20px"}}>
                <CardContent>
    <React.Fragment>
      <h1><strong>Game Table</strong></h1>
      <Button href="/game/gametable/create" variant="contained" color="primary" style={{ float: "right", marginRight: "5px"}}> 
        <AddIcon />Add Game
      </Button>
      <TextField variant="outlined" id="search" label="Search" name="search" style={{ float: "left"}} onChange={handleSearch}/>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>No</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
            <TableCell><strong>Updated At</strong></TableCell>
            <TableCell onClick={()=>sortColumn("name")}><strong>Name</strong></TableCell>
            <TableCell onClick={()=>sortColumn("genre")}><strong>Genre</strong></TableCell>
            <TableCell onClick={()=>sortColumn("singlePlayer")}><strong>Single Player</strong></TableCell>
            <TableCell onClick={()=>sortColumn("multiPlayer")}><strong>Multi Player</strong></TableCell>
            <TableCell onClick={()=>sortColumn("platform")}><strong>Platform</strong></TableCell>
            <TableCell onClick={()=>sortColumn("release")}><strong>Release</strong></TableCell>
            <TableCell><strong>Image</strong></TableCell>
            <TableCell><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {game != null && game.map((el, index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{el.created_at}</TableCell>
              <TableCell>{el.updated_at}</TableCell>
              <TableCell>{el.name}</TableCell>
              <TableCell>{el.genre}</TableCell>
              <TableCell>{el.singlePlayer}</TableCell>
              <TableCell>{el.multiplayer}</TableCell>
              <TableCell>{el.platform}</TableCell>
              <TableCell>{el.release}</TableCell>
              <TableCell>
                <Image src={el.image_url}/>
              </TableCell>
              <TableCell>
                <Action idGame={el.id}/>
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

export default GameTable