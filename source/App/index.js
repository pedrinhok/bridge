import React from "react"

import Welcome from "./Welcome"
import SetUsers from "./SetUsers"
import SetCards from "./SetCards"
import Game from "./Game"
import Classification from "./Classification"

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = { action: 1 }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.componentCleanup.bind(this))
  }

  componentCleanup(event) {
    event.preventDefault()
    event.returnValue = ""
  }

  undo() {
    const { action } = this.state

    if (action == 2) {
      this.setState({ action: 1, users: undefined })
    } else {
      this.setState({ action: action - 1 })
    }
  }

  returnWelcome() { this.setState({ action: 2 }) }

  returnSetUsers(users) { this.setState({ action: 3, users }) }

  returnSetCards(cards) { this.setState({ action: 4, cards }) }

  returnGame(users) { this.setState({ action: 5, users }) }

  returnClassification() { this.setState({ action: 1, users: undefined }) }

  renderWelcome() {
    return <Welcome return={this.returnWelcome.bind(this)} />
  }

  renderSetUsers() {
    return <SetUsers users={this.state.users} return={this.returnSetUsers.bind(this)} undo={this.undo.bind(this)} />
  }

  renderSetCards() {
    return <SetCards users={this.state.users} return={this.returnSetCards.bind(this)} undo={this.undo.bind(this)} />
  }

  renderGame() {
    return <Game users={this.state.users} cards={this.state.cards} return={this.returnGame.bind(this)} undo={this.undo.bind(this)} />
  }

  renderClassification() {
    return <Classification users={this.state.users} return={this.returnClassification.bind(this)} undo={this.undo.bind(this)} />
  }

  render() {
    switch (this.state.action) {
      case 1:
        return this.renderWelcome()
      case 2:
        return this.renderSetUsers()
      case 3:
        return this.renderSetCards()
      case 4:
        return this.renderGame()
      case 5:
        return this.renderClassification()
      default:
        return this.renderWelcome()
    }
  }

}

export default App
