import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Image from 'material-ui-image'

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: []
    };
  }

  componentDidMount() {
    axios
      .get(`https://www.backendexample.sanbersy.com/api/movies`)
      .then((res) => {
        let movie = res.data.map((el) => {
          return {
            id: el.id,
            title: el.title,
            rating: el.rating,
            duration: el.duration,
            genre: el.genre,
            description: el.description,
            image_url: el.image_url
          };
        });
        this.setState({ movie });
      });
  }

  render() {
    return (
      <>
        <Typography variant="h3" component="h2">
          <center>
            <strong>Daftar Film Film Terbaik</strong>
          </center>
        </Typography>
        <div id="article-list">
          {this.state.movie.map((item) => {
            return (
              <center><Card style={{maxWidth:"700px", marginBottom:"20px"}}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                   <center>{item.title}</center>
                  </Typography>
                  <center>
                  <Typography variant="body2" component="p" style={{width:"30%", height:"30%"}}>
                    <Image src={item.image_url}/>
                  </Typography>
                  </center>
                  <Typography variant="body2" component="p">
                    <strong>Rating </strong>{item.rating}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>Durasi: </strong>{item.duration} Menit
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>genre: </strong>{item.genre}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <Link to={`/movie/moviedetail/${item.id}`}>
                    <Button color="primary">Detail</Button>
                    </Link>
                  </Typography>
                </CardContent>
              </Card></center>
            );
          })}
        </div>
      </>
    );
  }
}
export default MovieList;
