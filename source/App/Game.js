import React from "react"

import Wrapper from "./Wrapper"

class Game extends React.Component {

  constructor(props) {
    super(props)

    this.state = { history: [], users: props.users, round: 1, action: 0, cards: props.cards, roundCards: 1 }

    this.references = []

    this.next = this.next.bind(this)
    this.undo = this.undo.bind(this)
  }

  copy(data) {
    return JSON.parse(JSON.stringify(data))
  }

  next() {
    let { history, users, round, action, cards, roundCards } = this.copy(this.state)

    history.push({ users: this.copy(users), round, action })

    switch (action) {

      case 0:
        users = users.map((user) => {
          const element = this.references[user.key]
          user.betted = element.value
          return user
        })
        action = 1
      break

      case 1:
        action = 2
      break

      case 2:
        users = users.map((user) => {
          const element = this.references[user.key]
          if (element.checked) {
            user.score = user.score + 10 + +user.betted
          }
          user.betted = undefined
          return user
        })
        action = 3
      break

      case 3:
        action = 0
      break

    }

    round = action == 0 ? round + 1 : round

    if (round > cards) {
      roundCards = cards - (round - cards)
    } else {
      roundCards = round
    }

    if (round == (cards * 2)) {
      this.props.return(users)
    } else {
      this.setState({ history, users, round, action, roundCards })
    }
  }

  undo() {
    const { history } = this.state
    const state = history.pop()

    if (state) {
      this.setState({ history, users: state.users, round: state.round, action: state.action })
    } else {
      this.props.undo()
    }
  }

  render() {
    switch (this.state.action) {

      case 0:
        return (
          <Wrapper>
            <div className="division text-center">
              <h3>
                Rodada #{this.state.round}
              </h3>
              <span>
                Marque as apostas ({this.state.roundCards} cartas)
              </span>
            </div>
            <div className="division list">
              {this.state.users.map((user) => (

                <div key={user.key}>
                  <span className="list-user">
                    {user.name}
                  </span>
                  <div className="list-action">
                    <input type="number" className="form-control" defaultValue="0" ref={(element) => this.references[user.key] = element} />
                  </div>
                </div>

              ))}
            </div>
            <div className="division btn-group btn-return">
              <button type="button" className="btn btn-outline-secondary" onClick={this.undo}>Retornar</button>
              <button type="button" className="btn btn-secondary" onClick={this.next}>OK</button>
            </div>
          </Wrapper>
        )

      case 1:
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
            <div className="division btn-group btn-return">
              <button type="button" className="btn btn-outline-secondary" onClick={this.undo}>Retornar</button>
              <button type="button" className="btn btn-secondary" onClick={this.next}>OK</button>
            </div>
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
                Marque os acertos
              </span>
            </div>
            <div className="division list">
              {this.state.users.map((user) => (

                <div key={user.key}>
                  <span className="list-user">
                    {user.name} apostou {user.betted}
                  </span>
                  <div className="list-action">
                    <input type="checkbox" className="form-control" ref={(element) => this.references[user.key] = element} />
                  </div>
                </div>

              ))}
            </div>
            <div className="division btn-group btn-return">
              <button type="button" className="btn btn-outline-secondary" onClick={this.undo}>Retornar</button>
              <button type="button" className="btn btn-secondary" onClick={this.next}>OK</button>
            </div>
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
            <div className="division btn-group btn-return">
              <button type="button" className="btn btn-outline-secondary" onClick={this.undo}>Retornar</button>
              <button type="button" className="btn btn-secondary" onClick={this.next}>OK</button>
            </div>
          </Wrapper>
        )

    }
  }

}

export default Game
