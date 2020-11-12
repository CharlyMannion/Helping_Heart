import React, { Component } from "react";
import { Link } from "@reach/router";
import helpIcon from "../assets/help-icon.png";
import InfoDiv from "../styledComponents/InfoDiv";
import HomeTitle from "../styledComponents/HomeTitle";
import ErrorDisplay from "../components/ErrorDisplay";
import StyledButton from "../styledComponents/StyledButton";

class Username extends Component {
  state = {
    user: "",
    error: null,
  };

  handleChange = (event) => {
    event.preventDefault();
    let username = event.target.value;
    this.setState({ user: username });
    this.props.setUser(username);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle submit");
    this.postUser(this.state.user);
  };

  render() {
    const { error } = this.state;
    if (error) return <ErrorDisplay {...error} />;

    return (
      <div className="username-container">
        <HomeTitle>HELPING HEART</HomeTitle>
        <HomeTitle>A GAME ABOUT KINDNESS</HomeTitle>
        <p></p>
        <i class="fas fa-medkit"></i>
        <InfoDiv>
          <span>Enter username: </span>
          <p></p>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <input type="text" name="username"></input>
            <p></p>
            <Link to="/tutorial">
              <StyledButton type="submit">Go!</StyledButton>
            </Link>
          </form>
        </InfoDiv>
      </div>
    );
  }
}

export default Username;
