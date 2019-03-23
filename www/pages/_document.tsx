import React, { ComponentType } from 'react';
import Document, { AnyPageProps, Head, Main, NextScript, PageProps } from 'next/document';
import { Theme } from '@material-ui/core';
import { ThemeProviderProps } from '@material-ui/styles/ThemeProvider';
import flush from 'styled-jsx/server';
import { PageContext } from '../getPageContext';

class MyDocument extends Document<{
  pageContext: ThemeProviderProps<Theme>;
}> {

  render() {
    const { pageContext } = this.props;

    const theme = pageContext && typeof pageContext.theme === 'function' ? pageContext.theme(null) : pageContext && pageContext.theme as Theme;
    const themeColor = theme && theme.palette.primary.main;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta name="theme-color" content={themeColor} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="//cdn.materialdesignicons.com/3.5.95/css/materialdesignicons.min.css"></link>
          {/* <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

interface PagePropsWithPageContext extends AnyPageProps {
  pageContext: PageContext;
}

MyDocument.getInitialProps = ctx => {

  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // save serverHost
  process.serverHost = ctx.req.headers.host;

  // Render app and page and get the context of the page with collected side effects.
  let pageContext: PageContext | undefined;
  const page = ctx.renderPage((Component: ComponentType<PagePropsWithPageContext>) => {
    const WrappedComponent: ComponentType<{ pageContext: PageContext } & PageProps> = props => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    };

    return WrappedComponent;
  });

  let css: string;
  // It might be undefined, e.g. after an error.
  if (pageContext) {
    css = (pageContext as PageContext).sheetsRegistry.toString();
  }

  return {
    ...page,
    pageContext,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          dangerouslySetInnerHTML={{ __html: css }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
