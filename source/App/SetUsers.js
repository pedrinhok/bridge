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

    this.add = this.add.bind(this)
    this.enter = this.enter.bind(this)
    this.next = this.next.bind(this)
    this.remove = this.remove.bind(this)
  }

  add() {
    if (this.reference.value == "") { return }

    const { users } = this.copy(this.state)
    users.push(this.reference.value)

    this.reference.value = ""

    this.setState({ users })
  }

  copy(data) {
    return JSON.parse(JSON.stringify(data))
  }

  enter(event) {
    if (event.which === 27) {
      this.reference.value = ""
    }
    if (event.which === 13) {
      this.add()
    }
  }

  next() {
    const users = this.state.users.map((user, key) => ({ key, name: user, score: 0 }))

    if (users.length == 0) { return }

    this.props.return(users)
  }

  remove(key) {
    const users = this.state.users.map((user) => user)

    users.splice(key, 1)

    this.setState({ users })
  }

  render() {
    return (
      <Wrapper>
        <div className="division text-center">
          <span>Quem participará da partida?</span>
        </div>
        <div className="division">
          <div className="input-group">
            <input type="text" className="form-control" ref={(element) => this.reference = element} onKeyUp={this.enter} />
            <div className="input-group-append">
              <button type="button" className="btn btn-outline-secondary" onClick={this.add}>OK</button>
            </div>
          </div>
          <div className="list">
            {this.state.users.map((user, key) => (

              <div key={key}>
                <span className="list-user">
                  {user}
                </span>
                <span className="list-action">
                  <button type="button" onClick={() => this.remove(key)}>&times;</button>
                </span>
              </div>

            ))}
          </div>
        </div>
        <div className="division btn-group btn-return">
          <button type="button" className="btn btn-outline-secondary" onClick={this.props.undo}>Retornar</button>
          <button type="button" className="btn btn-secondary" onClick={this.next}>OK</button>
        </div>
      </Wrapper>
    )
  }

}

export default SetUsers
