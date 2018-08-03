import React from "react"

class Wrapper extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

}

export default Wrapper
