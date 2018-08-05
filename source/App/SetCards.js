import React from "react"

import Wrapper from "./Wrapper"

class SetCards extends React.Component {

  constructor(props) {
    super(props)

    this.state = { cards: Math.round(52 / props.users.length) }

    this.next = this.next.bind(this)
  }

  next() {
    if (this.reference.value == "") { return }

    this.props.return(this.reference.value)
  }

  render() {
    return (
      <Wrapper>
        <div className="division text-center">
          <span>Qual o limite de cartas para partida?</span>
        </div>
        <div className="division text-center">
          <input type="number" className="form-control" defaultValue={this.state.cards} ref={(element) => this.reference = element} />
        </div>
        <div className="division btn-group btn-return">
          <button type="button" className="btn btn-outline-secondary" onClick={this.props.undo}>Retornar</button>
          <button type="button" className="btn btn-secondary" onClick={this.next}>OK</button>
        </div>
      </Wrapper>
    )
  }

}

export default SetCards
