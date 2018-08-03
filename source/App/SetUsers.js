import React from "react"

import Wrapper from "./Wrapper"

class SetUsers extends React.Component {

  constructor(props) {
    super(props)

    const { users } = props

    if (users && users.length > 0) {
      this.state = { users: users.map((user) => user.name) }
    } else {
      this.state = { users: [] }
    }
  }

  copy(data) {
    return JSON.parse(JSON.stringify(data))
  }

  add() {
    if (this.reference.value == "") { return }

    const { users } = this.copy(this.state)
    users.push(this.reference.value)

    this.reference.value = ""

    this.setState({ users })
  }

  next() {
    const users = this.state.users.map((user, key) => ({ key, name: user, score: 0 }))

    if (users.length == 0) { return }

    this.props.return(users)
  }

  render() {
    const { users } = this.state

    return (
      <Wrapper>
        <div className="division text-center">
          <span>Quem participará da partida?</span>
        </div>
        <div className="division">
          <div className="input-group">
            <input type="text" className="form-control" ref={(element) => this.reference = element} />
            <div className="input-group-append">
              <button type="button" className="btn btn-outline-secondary" onClick={this.add.bind(this)}>OK</button>
            </div>
          </div>
          <div className="list">
            {users.map((user, key) => <div key={key}>{user}</div>)}
          </div>
        </div>
        <div className="division btn-group btn-return">
          <button type="button" className="btn btn-outline-secondary" onClick={this.props.undo}>Retornar</button>
          <button type="button" className="btn btn-secondary" onClick={this.next.bind(this)}>OK</button>
        </div>
      </Wrapper>
    )
  }

}

export default SetUsers
