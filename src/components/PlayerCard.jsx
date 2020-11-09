import React from "react";

const PlayerCard = (props) => {
    return (
        <section className="player-card">
            <p>{props.name}</p>
        </section>
    )
}

export default PlayerCard;