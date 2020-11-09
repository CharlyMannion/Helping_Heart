import React from "react";
import PlayerCardContainer from "../styledComponents/PlayerCardContainer";

const PlayerCard = (props) => {
    return (
        <PlayerCardContainer className="player-card">
            <p>{props.name}</p>
        </PlayerCardContainer>
    )
}

export default PlayerCard;