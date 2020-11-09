import React, { Component } from "react";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";
import PlayerCard from "../components/PlayerCard";
import styled from "styled-components";

const HeaderContainer = styled.h1`
width: 80%;
  height: 30px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 90% 10%;
  font-family: 'VT323', monospace;
  font-size: 3rem;
`

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
      </div>
    );
  }
}

export default WinPage;
