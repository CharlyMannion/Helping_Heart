import React from "react";
import { Link } from "@reach/router";
import TutorialContainer from "../styledComponents/TutorialContainer";
import TutorialHeader from "../styledComponents/TutorialHeader";
import StyledParagraph from "../styledComponents/StyledParagraph";
import StyledButton from "../styledComponents/StyledButton";
import StyledHeader from "../styledComponents/StyledHeader";

const Tutorial = (props) => {
  return (
    <TutorialContainer>
      <StyledHeader>Tutorial</StyledHeader>
      <StyledParagraph>
        <p>Welcome {props.username}!</p>
        <p>Some info on controls</p>
        <p></p>
        <p>Some info on controls</p>
        <p>Some info on controls</p>
        <p>Some info on controls</p>
        <p>Some info on controls</p>
        <p>Some info on controls</p>
        <p>Some info on controls</p>
        <p>Some info on controls</p>
        <Link to="/game">
          <StyledButton>PLAY!</StyledButton>
        </Link>
      </StyledParagraph>
    </TutorialContainer>
  );
};

export default Tutorial;
