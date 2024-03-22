import { Container, Row, Col } from "react-bootstrap";

const Foooter = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>TrendifyMarket &copy; 2024</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Foooter;
