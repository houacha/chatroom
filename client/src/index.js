import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Card, Avatar, Input, Typography } from "antd";
import "antd/dist/antd.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

const client = new W3CWebSocket("ws://127.0.0.1:8000");

export default class App extends React.Component {
  state = {
    userName: "",
    isLoggedIn: false,
    messages: [],
  };

  onButtonClick = (val) => {
    client.send(
      JSON.stringify({
        type: "message",
        msg: val,
        user: this.state.userName,
      })
    );
    this.setState({ searchVal: "" });
  };

  componentDidMount() {
    client.onmessage = (message) => {
      console.log(message);
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.type === "message") {
        this.setState((state) => ({
          messages: [
            ...state.messages,
            {
              msg: dataFromServer.msg,
              user: dataFromServer.user,
            },
          ],
        }));
      }
    };
  }

  componentDidUpdate() {
    const main = document.getElementById("wrapper");
    const msgContainer = document.getElementById("messages");
    if (main && msgContainer) {
      if (main.offsetHeight- 87 <= msgContainer.offsetHeight) {
        main.style.height = msgContainer.offsetHeight + 87;
      }
    }
  }

  render() {
    return (
      <div className="main" id="wrapper">
        {this.state.isLoggedIn ? (
          <div>
            <div className="title">
              <Text
                id="main-heading"
                type="secondary"
                style={{ fontSize: "36px" }}
              >
                Chat Me: {this.state.userName}
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: 50,
              }}
              id="messages"
            >
              {this.state.messages.map((message, i) => (
                <Card
                  key={i}
                  style={{
                    width: 300,
                    margin: "16px 4px 0 4px",
                    alignSelf:
                      this.state.userName === message.user
                        ? "flex-end"
                        : "flex-start",
                  }}
                  loading={false}
                >
                  <Meta
                    avatar={
                      <Avatar
                        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                      >
                        {message.user[0].toUpperCase()}
                      </Avatar>
                    }
                    title={message.user + ":"}
                    description={message.msg}
                  />
                </Card>
              ))}
            </div>
            <div className="button">
              <Search
                placeholder="input message and send"
                enterButton="Send"
                value={this.state.searchVal}
                size="large"
                onChange={(e) => this.setState({ searchVal: e.target.value })}
                onSearch={(val) => this.onButtonClick(val)}
              />
            </div>
          </div>
        ) : (
          <div style={{ padding: "200px 40px" }}>
            <Search
              placeholder="Enter Username"
              enterButton="Login"
              size="Large"
              onSearch={(val) =>
                this.setState({
                  isLoggedIn: true,
                  userName: val,
                })
              }
            />
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
