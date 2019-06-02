import { withStyles } from '@material-ui/styles';

const styles = () => ({
  '@global': {
    html: {
      fontSize: '62.5%'
    }
  }
});

const GlobalStyles = ({ children }) => {
  return <div>{children}</div>;
};

export default withStyles(styles)(GlobalStyles);
