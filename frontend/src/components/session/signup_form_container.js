import React from 'react';
import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { withRouter } from 'react-router-dom';
import { signup } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    signup: user => dispatch(signup(user))
  }
}

class SignupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: props.errors || {},
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidUpdate() {
  //   this.setState({
  //     errors: this.props.errors
  //   });
  // }

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

  handleSubmit(event) {
    event.preventDefault();
    // console.log('hello');
    const user = { email: this.state.email, password: this.state.password }
    this.props.signup(user);
  }

  render() {
    return (
      <SignupForm
        email={this.state.email}
        password={this.state.password}
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
)(withRouter(SignupContainer));