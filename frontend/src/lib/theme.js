import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[600] },
    secondary: { main: grey[600] },
    type: 'light',
  },
  
});

export default responsiveFontSizes(theme);
