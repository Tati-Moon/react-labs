import { Component } from 'react';

class ErrorButton extends Component {
  state = {
    buttonText: {
      message: 'Click to Throw Error',
    },
  };

  handleClick = () => {
    this.setState({ buttonText: null });
  };

  render() {
    return (
      <button onClick={this.handleClick} className="error-button">
        {this.state.buttonText.message}
      </button>
    );
  }
}

export default ErrorButton;
