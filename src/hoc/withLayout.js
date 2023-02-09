import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';

function withLayout(Comp) {
  return props => (
    <Container>
      <Header />
      <Comp {...props} />
      <Footer />
    </Container>
  );
}

export default withLayout;
