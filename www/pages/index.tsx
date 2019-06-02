import { Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Link from 'next/link';
import MainLayout from '../layouts/main/main';

const styles = (theme: Theme) =>
  ({
    root: {
      margin: '1.0rem',
      color: theme.palette.primary.main
    }
  } as StyleRules);

const Index = ({ classes }) => {
  return (
    <MainLayout>
      <div className={classes.root}>
        <Link href='/hello'>
          <a>Link To Another Page</a>
        </Link>
      </div>
    </MainLayout>
  );
};

export default withStyles(styles)(Index);
