import React, { Component } from "react";
import { Link } from "@reach/router";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";
import PlayerCard from "../components/PlayerCard";
import StyledHeader from "../styledComponents/StyledHeader";
import StyledBiggerButton from "../styledComponents/StyledBiggerButton";
import StyledParagraph from "../styledComponents/StyledParagraph";

class WinPage extends Component {
  state = {
    users: [],
    isLoading: true,
  };

  postUser = () => {
    console.log("post user");
    fetch("https://helpers-game-backend.herokuapp.com/playerlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.props.name,
      }),
    })
      .then((res) => res.json())
      .then((players) => {
        this.setState({ users: players, isLoading: false, error: null });
      })
      .catch(({ response }) => {
        this.setState({
          error: {
            response,
            // status: response.status,
            // message: response.data.msg,
          },
        });
      });
  };

  componentDidMount() {
    this.postUser();
  }

  render() {
    const { users, isLoading, error } = this.state;
    if (error) return <ErrorDisplay {...error} />;
    if (isLoading) return <Loader />;

    return (
      <div className="user-list">
        <StyledParagraph>
          <StyledHeader>Well Done!</StyledHeader>
        </StyledParagraph>
        <br></br>
        <StyledParagraph>
          Now for a lovely list of previous players...
        </StyledParagraph>
        <StyledParagraph>
          <ul>
            {users.map((user) => {
              return <PlayerCard key={user.name} name={user.name}></PlayerCard>;
            })}
            <p></p>
            <Link to="/">
              <StyledBiggerButton>PLAY AGAIN!</StyledBiggerButton>
            </Link>
          </ul>
        </StyledParagraph>
      </div>
    );
  }
}

export default WinPage;
