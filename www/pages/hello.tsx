import { Theme, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Link from 'next/link';
import { useState } from 'react';
import MainLayout from '../layouts/main/main';
import { helloRequest } from '../lib/api/public';

const styles = (theme: Theme) => ({
  root: {
    margin: '1.0rem', // 10px
    color: theme.palette.primary.main
  }
});

const Hello = ({ classes, data }) => {
  const [text, setText] = useState(data);

  return (
    <MainLayout>
      <div className={classes.root}>
        <Typography variant='h1'>{text}</Typography>
        <Typography variant='h2'>{text}</Typography>
        <Typography variant='h3'>{text}</Typography>
        <Link href='/'>
          <a>back</a>
        </Link>
      </div>
    </MainLayout>
  );
};

Hello.getInitialProps = async function({ req }) {
  return await helloRequest();
};

export default withStyles(styles)(Hello);
