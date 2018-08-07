import React from "react"

import Wrapper from "./Wrapper"
import Icon from "./Icon"

class Game extends React.Component {

  constructor(props) {
    super(props)

    this.state = { history: [], users: props.users, round: 1, action: 1, cards: props.cards }

    this.references = []

    this.buttons = this.buttons.bind(this)
    this.cards = this.cards.bind(this)
    this.check = this.check.bind(this)
    this.next = this.next.bind(this)
    this.undo = this.undo.bind(this)
  }

  buttons() {
    return (
      <div className="division btn-group btn-return">
        <button type="button" className="btn btn-outline-secondary" onClick={this.undo}>
          <Icon icon="undo" />
        </button>
        <button type="button" className="btn btn-secondary" onClick={this.next}>
          <Icon icon="next" />
        </button>
      </div>
    )
  }

  cards() {
    if (this.state.round > this.state.cards) {
      return this.state.cards - (this.state.round - this.state.cards)
    } else {
      return this.state.round
    }
  }

  check(key) {
    const { users } = this.copy(this.state)

    users[key].check = !users[key].check

    this.setState({ users })
  }

  copy(data) {
    return JSON.parse(JSON.stringify(data))
  }

  next() {
    let { history, users, round, action, cards } = this.copy(this.state)

    let temporary = { round, action }

    switch (action) {

      case 1:
        temporary.users = this.copy(users)
        action = 2
      break

      case 2:
        users = users.map((user) => {
          user.bet = this.references[user.key].value
          user.check = undefined
          return user
        })
        temporary.users = this.copy(users)
        action = 3
      break

      case 3:
        temporary.users = this.copy(users)
        action = 4
      break

      case 4:
        temporary.users = this.copy(users)
        users = users.map((user) => {
          if (user.check) {
            user.score = user.score + 10 + +user.bet
          }
          user.bet = undefined
          return user
        })
        action = 5
      break

      case 5:
        temporary.users = this.copy(users)
        action = 1
      break

    }

    history.push(temporary)

    round = action == 1 ? round + 1 : round

    if (round == (cards * 2)) {
      this.props.return(users)
    } else {
      this.setState({ history, users, round, action })
    }
  }

  undo() {
    const { history } = this.copy(this.state)
    const state = history.pop()

    if (state) {
      this.setState({ history, users: state.users, round: state.round, action: state.action })
    } else {
      this.props.undo()
    }
  }

  render() {
    switch (this.state.action) {

      case 1:
        return (
          <Wrapper>
            <div className="division text-center">
              <h3>
                Rodada #{this.state.round}
              </h3>
              <span>
                {this.cards()} { this.cards() == 1 ? "carta" : "cartas" } para cada participante
              </span>
            </div>
            {this.buttons()}
          </Wrapper>
        )

      case 2:
        return (
          <Wrapper>
            <div className="division text-center">
              <h3>
                Rodada #{this.state.round}
              </h3>
              <span>
                Marque as apostas
              </span>
            </div>
            <div className="division list">
              {this.state.users.map((user) => (

                <div key={user.key}>
                  <span className="list-user">
                    {user.name}
                  </span>
                  <div className="list-action">
                    <input type="number" className="form-control" defaultValue={user.bet || 0} ref={(element) => this.references[user.key] = element} />
                  </div>
                </div>

              ))}
            </div>
            {this.buttons()}
          </Wrapper>
        )

      case 3:
        return (
          <Wrapper>
            <div className="division text-center">
              <h3>
                Rodada #{this.state.round}
              </h3>
              <span>
                Rodada em andamento...
              </span>
            </div>
            {this.buttons()}
          </Wrapper>
        )

      case 4:
        return (
          <Wrapper>
            <div className="division text-center">
              <h3>
                Rodada #{this.state.round}
              </h3>
              <span>
                Marque os acertos
              </span>
            </div>
            <div className="division list">
              {this.state.users.map((user) => (

                <div key={user.key}>
                  <span className="list-user">
                    {user.name} apostou {user.bet}
                  </span>
                  <div className="list-action">
                    <button type="button" className="btn btn-icon" onClick={() => this.check(user.key)}>
                      <Icon icon={ user.check ? "check" : "uncheck" } measure="2x" />
                    </button>
                  </div>
                </div>

              ))}
            </div>
            {this.buttons()}
          </Wrapper>
        )

      case 5:
        return (
          <Wrapper>
            <div className="division text-center">
              <h3>
                Rodada #{this.state.round}
              </h3>
              <span>
                Pontuação
              </span>
            </div>
            <div className="division list">
              {this.state.users.map((user) => (

                <div key={user.key}>
                  <span className="list-user">
                    {user.name}
                  </span>
                  <span className="list-action">
                    {user.score}
                  </span>
                </div>

              ))}
            </div>
            {this.buttons()}
          </Wrapper>
        )

    }
  }

}

export default Game
