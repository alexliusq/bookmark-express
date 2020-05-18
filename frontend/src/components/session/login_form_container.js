import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './login_form';
import { withRouter } from 'react-router-dom';
import { login } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: user => dispatch(login(user))
  }
}

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: props.errors || {},
      rememberMe: true
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  handleRememberMe(event) {
    this.setState({
      rememberMe: event.target.checked
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('hello');
    const user = { email: this.state.email, password: this.state.password }
    this.props.login(user, this.state.rememberMe);
  }

  render() {
    return (
      <LoginForm
        email={this.state.email}
        password={this.state.password}
        rememberMe={this.state.rememberMe}
        handleEmailChange={this.handleEmailChange}
        handlePasswordChange={this.handlePasswordChange}
        handleSubmit={this.handleSubmit}
        errors={this.props.errors}
      />
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginContainer));