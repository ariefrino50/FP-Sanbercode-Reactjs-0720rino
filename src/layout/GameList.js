import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Image from 'material-ui-image'
import { Link } from "react-router-dom";

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: []
    };
  }

  componentDidMount() {
    axios
      .get(`https://www.backendexample.sanbersy.com/api/games`)
      .then((res) => {
        let game = res.data.map((el) => {
          return {
            id: el.id,
            name: el.name,
            genre: el.genre,
            singlePlayer: el.singlePlayer,
            multiplayer: el.multiplayer,
            platform: el.platform,
            release: el.release,
            image_url: el.image_url
          };
        });
        this.setState({ game });
      });
  }

  render() {
    return (
      <>
        <Typography variant="h3" component="h2">
          <center>
            <strong>Daftar Game Terbaik</strong>
          </center>
        </Typography>
        <div id="article-list">
          {this.state.game.map((item) => {
            return (
              <center><Card style={{maxWidth:"700px", marginBottom:"20px"}}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                   <center>{item.name}</center>
                  </Typography>
                  <center>
                  <Typography variant="body2" component="p" style={{width:"30%", height:"30%"}}>
                    <Image src={item.image_url}/>
                  </Typography>
                  </center>
                  <Typography variant="body2" component="p">
                    <strong>Genre </strong>{item.genre}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>Single Player: </strong>{item.singlePlayer} Menit
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>Multiplayer: </strong>{item.multiplayer}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>Platform: </strong>{item.platform}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <strong>Release: </strong>{item.release}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <Link to={`/game/gamedetail/${item.id}`}>
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
export default GameList;
