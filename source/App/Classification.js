import React from "react"

import Wrapper from "./Wrapper"
import Icon from "./Icon"

class Classification extends React.Component {

  constructor(props) {
    super(props)

    this.state = { users: props.users }
  }

  render() {
    return (
      <Wrapper>
        <div className="division text-center">
          <h3>
            Partida encerrada
          </h3>
          <span>
            Classificação
          </span>
        </div>
        <div className="division list">
          {this.state.users
            .sort((x, y) => y.score - x.score)
            .map((user) => (
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
          <button type="button" className="btn btn-outline-secondary" onClick={this.props.undo}>
            <Icon icon="undo" />
          </button>
          <button type="button" className="btn btn-secondary" onClick={this.props.return}>
            <Icon icon="next" />
          </button>
        </div>
      </Wrapper>
    )
  }

}

export default Classification
