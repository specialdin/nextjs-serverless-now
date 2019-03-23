import { Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { StyleRules } from '@material-ui/core/styles';
import Link from 'next/link'

const styles = (theme: Theme) => ({
  '@global': {
    html: {
      fontSize: '62.5% !important'
    }
  },
  root: {
    margin: '1.0rem',
    color: theme.palette.primary.main
  }
} as StyleRules);

const Index = ({ classes }) => {

  return (
    <div className={classes.root}>
      <Link href="/hello"><a>Link To Another Page</a></Link>
    </div>
  )
}

export default withStyles(styles)(Index);
