import React from 'react';
import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { withRouter } from 'react-router-dom';

// const mapStateToProps = (state) => {
//   return {
//     signedIn: state.session.isSignedIn,
//     errors: state.errors.session
//   };
// };


const mapDispatchToProps = (dispatch) => {
  return {
    // signup: user => dispatch(signup(user))
  }
}

class SignupContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SignupForm />
    )
  }
}


export default connect(
  null,
  mapDispatchToProps
)(withRouter(SignupContainer));