import React, { Component } from "react";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";

class WinPage extends Component {
  state = {
    user: "",
    users: [],
    isLoading: true,
  };

  // postUser = (username) => {
  //   console.log('post user')
  //   fetch('https://helpers-game-backend.herokuapp.com/playerlist', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: username
  //     })
  //   })
  //   .then((res) => res.json())
  //   .then((players) => {
  //     console.log(players)
  //   })
  // }

  getUsers = () => {
    console.log("get user");
    fetch("https://helpers-game-backend.herokuapp.com/playerlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((players) => {
        console.log(players);
        this.setState({ users: players, isLoading: false, error: null });
        console.log(this.state.users, "STATE");
      })
      .catch(({response}) => {
        this.setState({
            error: {
              response
              // status: response.status,
              // message: response.data.msg,
            }
        })
    });
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { users, isLoading, error } = this.state;
    if (error) return <ErrorDisplay {...error} />;
    if (isLoading) return <Loader />;

    return (
      <div className="user-list">
        <h1>Well Done!</h1>
        <ul>
          {users.map((user) => {
            return <li>{user.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default WinPage;
