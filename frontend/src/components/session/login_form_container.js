import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './login_form';
import { withRouter } from 'react-router-dom';

// const mapStateToProps = (state) => {
//   return {
//     errors: state.errors.session
//   };
// }

const mapDispatchToProps = (dispatch) => {
  return {
    // login: user => dispatch(login(user))
  }
}

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoginForm />
    )
  }
}


export default connect(
  null,
  mapDispatchToProps
)(withRouter(LoginContainer));