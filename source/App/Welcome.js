import React from "react"

import Wrapper from "./Wrapper"

class Welcome extends React.Component {

  render() {
    return (
      <Wrapper>
        <div className="division text-center">
          <span>Pronto para uma partida de bridge?</span>
        </div>
        <div className="division">
          <button type="button" className="btn btn-secondary btn-return" onClick={this.props.return}>Começar</button>
        </div>
      </Wrapper>
    )
  }

}

export default Welcome
