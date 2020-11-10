import React from "react";
import { Link } from "@reach/router";
import TutorialContainer from "../styledComponents/TutorialContainer";
import TutorialHeader from "../styledComponents/TutorialHeader";
import TutorialHowToPlayContainer from "../styledComponents/TutorialHowToPlayContainer";
import StyledButton from "../styledComponents/StyledButton";

const Tutorial = (props) => {
  return (
    <TutorialContainer>
      <TutorialHeader>Tutorial</TutorialHeader>
      <TutorialHowToPlayContainer>
        <p className="tutorial-paragraph">Welcome {props.username}!</p>
        <Link to="/game">
          <StyledButton>PLAY!</StyledButton>
        </Link>
      </TutorialHowToPlayContainer>
    </TutorialContainer>
  );
};

export default Tutorial;
