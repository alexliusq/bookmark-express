import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MainGrid from '../main_grid';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListItemLink from '../shared/list_item_link';


const mapStateToProps = (state) => {
  return {
    user: state.session.user
  }
}

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dense = false;
    return (
    <MainGrid>
      <Typography variant="h2">
        Welcome, {this.props.user.email}
      </Typography>
      <List dense={dense}>
      {/* <ListItemLink to="/inbox" primary="Inbox" icon={<InboxIcon />} /> */}
        <ListItemLink to="/books" primary="Books" icon={<MenuBookIcon />} />
      </List>
    </MainGrid>
    )
  }
}

export default connect(
  mapStateToProps, null
)(withRouter(DashBoard));