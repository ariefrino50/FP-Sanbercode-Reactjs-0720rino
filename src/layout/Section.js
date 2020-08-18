import Login from '../pages/Login'

import MovieCreate from '../layout/MovieCreate';
import MovieEdit from '../layout/MovieEdit';
import MovieTable from '../layout/MovieTable';
import MovieList from '../layout/MovieList'
import MovieDetail from '../layout/MovieDetail'

import GameTable from '../layout/GameTable';
import GameCreate from '../layout/GameCreate';
import GameEdit from '../layout/GameEdit';
import GameList from '../layout/GameList'
import GameDetail from '../layout/GameDetail'

import React from 'react';
import { Switch, Route } from 'react-router-dom';
const Section = () => {


    return (
        <>
            <section>
                <Switch>
                    <Route exact path="/login" component={Login} />

                    <Route exact path="/" component={MovieList}/>
                    <Route exact path="/movie/moviedetail/:id" component={MovieDetail} />
                    <Route exact path="/movie/list" component={MovieList} />
                    <Route exact path="/movie/movietable/create" component={MovieCreate} />
                    <Route exact path="/movie/movietable/edit/:id" component={MovieEdit} />
                    <Route exact path="/movie/movietable" component={MovieTable} />

                    <Route exact path="/game" />
                    <Route exact path="/game/list" component={GameList} />
                    <Route exact path="/game/gametable" component={GameTable} />
                    <Route exact path="/game/gametable/create" component={GameCreate} />
                    <Route exact path="/game/gametable/edit/:id" component={GameEdit} />
                    <Route exact path="/game/gamedetail/:id" component={GameDetail} />
                </Switch>
            </section>
        </>

    )
}
export default Section;