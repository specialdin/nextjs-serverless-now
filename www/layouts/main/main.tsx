import GlobalStyles from '../globalStyles';
import Footer from './footer';
import Header from './header';

const MainLayout = ({ children }) => {
  return (
    <GlobalStyles>
      <Header />
      {children}
      <Footer />
    </GlobalStyles>
  );
};

export default MainLayout;
