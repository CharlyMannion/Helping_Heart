import React from "react";
import { Link } from "@reach/router";
import TutorialContainer from "../styledComponents/TutorialContainer";
import StyledParagraph from "../styledComponents/StyledParagraph";
import StyledButton from "../styledComponents/StyledButton";
import StyledHeader from "../styledComponents/StyledHeader";

const Tutorial = (props) => {
  return (
    <TutorialContainer>
      <StyledHeader>Tutorial</StyledHeader>
      <StyledParagraph>
        <p>Welcome {props.username}!</p>
        <p>Run around the map and find those in need.</p>
        <p></p>
        <p>Use W,A,S,D keys to move around.</p>
        <p>When you see a person, hit the space bar to chat to them.</p>
        <p>Help 5 of your new pals to complete the game.</p>
        <p></p>
        <Link to="/game">
          <StyledButton>PLAY!</StyledButton>
        </Link>
      </StyledParagraph>
    </TutorialContainer>
  );
};

export default Tutorial;
