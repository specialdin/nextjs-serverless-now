import { Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { StyleRules } from '@material-ui/core/styles';
import Link from 'next/link'
import { useState } from 'react';
import { helloRequest } from '../lib/api/public';

const styles = (theme: Theme) => ({
  '@global': {
    html: {
      fontSize: '62.5% !important'
    }
  },
  root: {
    margin: '1.0rem', // 10px
    color: theme.palette.primary.main
  }
} as StyleRules);

const Hello = ({ classes, data }) => {

  const [text, setText] = useState(data);

  return (
    <div className={classes.root}>
      <h3>{text}</h3>
      <Link href="/"><a>back</a></Link>
    </div>
  )
}

Hello.getInitialProps = async function ({ req }) {
  return await helloRequest();
}

export default withStyles(styles)(Hello);
