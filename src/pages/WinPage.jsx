import React, { Component } from "react";
import { Link } from "@reach/router";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";
import PlayerCard from "../components/PlayerCard";
import HeaderContainer from "../styledComponents/HeaderContainer";
import StyledBiggerButton from "../styledComponents/StyledBiggerButton";

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
        <HeaderContainer>Well Done!</HeaderContainer>
        <ul>
          {users.map((user) => {
            return <PlayerCard key={user.name} name={user.name}></PlayerCard>;
          })}
        </ul>
        <br />
        <Link to="/">
          <StyledBiggerButton>PLAY AGAIN!</StyledBiggerButton>
        </Link>
      </div>
    );
  }
}

export default WinPage;
