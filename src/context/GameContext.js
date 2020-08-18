import React, {createContext, useState} from 'react'

export const GameContext = createContext();

export const GameProvider = (props) => {
    const [game, setGame] = useState({
        lists: null,
        SelectedId: 0,
        statusForm: "create"
    })
    return(
        <GameContext.Provider value={[game, setGame]}>
            {props.children}
        </GameContext.Provider>
    )
}