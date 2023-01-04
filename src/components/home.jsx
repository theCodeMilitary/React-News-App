import "../App.css";
import { Container, Col, CardGroup, Row, Card } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import Typical from "react-typical";
import { useEffect, useState } from "react";
import Navabr from "./Navbar";

export default function Home() {
  let apikey = "5f04224be3ff49f5a9cb382c4a7e7a88";
  let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apikey}`;
  const [news, setNews] = useState([]);
  let searchKeyword;

  let handleSubmit = (event) => {
    event.preventDefault();
    searchKeyword = event.target[0].value;
    url = `https://newsapi.org/v2/everything?q=${searchKeyword}&apikey=${apikey}`;
    fetchTodos();
    console.log("url is ", url);
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Navabr />
      <Container fluid>
        <Row>
          <div className="search-row">
            <form onSubmit={handleSubmit} className="form-css">
              <div className="text-center welcm-text ">
                <h4>
                  Welcome to{" "}
                  <Typical
                    steps={["OnenewsApp", 1000, "Best News Website", 1000]}
                    loop={Infinity}
                    wrapper="b"
                  />
                </h4>
              </div>
              <div class="input-group">
                <input
                  className="form-control border-secondary py-2"
                  type="search"
                  name="searchValue"
                />
                <div class="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Row>
        <Row className="news-row">
          <CardGroup className="pb-5 d-flex justify-content-center news-tray">
            {console.log(news)}
            {news.length > 0 ? (
              news.map((data) => {
                return (
                  <Col className="pt-3">
                    <Card style={{ width: "15rem" }}>
                      <Card.Img src={data.urlToImage} />
                      <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Text>
                          {data.description.substring(0, 100)}
                        </Card.Text>
                        <a href={data.url}> Read more..</a>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col className="pt-3">
                <Card style={{ width: "15rem" }}>
                  <Card.Img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Inquisitive_cat.jpg" />
                  <Card.Body>
                    <Card.Title>Sorry ! No News Found</Card.Title>
                    <Card.Text>
                      Try Searching for some other news keywords
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </CardGroup>
        </Row>
      </Container>
    </>
  );
}
