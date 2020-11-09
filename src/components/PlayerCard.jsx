import React from "react";
import styled from "styled-components";

const PlayerCardContainer = styled.div`
width: 80%;
  height: 30px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 90% 10%;
  font-family: 'VT323', monospace;
  font-size: 1.5rem;
`

const PlayerCard = (props) => {
    return (
        <PlayerCardContainer className="player-card">
            <p>{props.name}</p>
        </PlayerCardContainer>
    )
}

export default PlayerCard;