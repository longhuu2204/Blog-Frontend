import React, { useEffect, useState } from "react";
import Menu from ".././home/Menu";
import Header from ".././home/Header";
import Footer from ".././home/Footer";
import ReactPaginate from "react-paginate";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Image,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, userSelector } from "../../reducers/User/loginForm";
import { Link } from "react-router-dom";
import InformationPost from "../Posts/InformationPost";
import {
  fetchPNews,
  pNewsSelector,
} from "../../reducers/Posts/changeStatusPost";

const PostNews = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const postNews = useSelector(pNewsSelector);

  const [pageNumber, setPageNumber] = useState(0);
  const todoPerPage = 4;
  const pagesVisited = pageNumber * todoPerPage;

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPNews());
  }, [dispatch]);

  const pageCount = Math.ceil(postNews.length / todoPerPage);
  const displayTodo = postNews
    .slice(pagesVisited, pagesVisited + todoPerPage)
    .map((post, index) => {
      return (
        <Card
          className="bg-light post-of-bookmark"
          style={{ flexDirection: "row" }}
          key={index}
        >
          <Link to={`/authors/${post.author.id_account}`}>
            <Image
              src={post.author.avatar}
              roundedCircle
              style={{
                width: "4rem",
                height: "4rem",
                margin: "15px 5px",
              }}
            />
          </Link>
          <Card.Body>
            <span>
              <Link
                to={`/authors/${post.author.id_account}`}
                style={{
                  color: "#5488c7",
                  fontSize: "18px",
                }}
              >
                {post.author.real_name}
              </Link>
              &ensp;
              <i
                style={{
                  fontSize: "16px",
                }}
              >
                {post.post.day_created} - {post.post.time_created}
              </i>
            </span>
            <Card.Title>
              <Link to={`/p/post/${post.post.id_post}`}>{post.post.title}</Link>
            </Card.Title>
            <ListGroup horizontal>
              {post.tags.map((tag, tagIndex) => {
                return (
                  <ListGroup.Item
                    key={tagIndex}
                    as={Link}
                    action
                    to={`/tags/${tag.id_tag}`}
                    style={{ color: "black" }}
                  >
                    <b>{tag.name}</b>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <Card.Text>{post.post.content.substring(0, 200) + "..."}</Card.Text>
            <div className="footer-card">
              <Button variant="none">
                <i className="fas fa-eye">&nbsp;{post.post.view}</i>
              </Button>
              <Button variant="none">
                <i className="fas fa-bookmark">
                  &nbsp;{post.post.total_bookmark}
                </i>
              </Button>
              <Button variant="none">
                <i className="fas fa-comments">
                  &nbsp;{post.post.total_comment}
                </i>
              </Button>
              <Button variant="none">
                <i className="fas fa-sort">
                  &nbsp;
                  {post.post.total_vote_up - post.post.total_vote_down}
                </i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      );
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Header
        real_name={user.real_name}
        id_role={user.id_role}
        gender={user.gender}
        company={user.company}
        phone={user.phone}
        avatar={user.avatar}
        birth={user.birth}
      />
      <Container
        fluid
        style={{
          marginTop: "95px",
          minHeight: "85vh",
          backgroundColor: "#F0F8FF",
        }}
      >
        <Row>
          <Menu />
          <Col xl={10} lg={9} md={12} sm={12}>
            <Row>
              <Col xl={9} lg={12} md={12} sm={12}>
                <h4
                  className="letter"
                  style={{ marginTop: "20px", fontSize: "32px" }}
                >
                  <b>Các bài viết mới nhất</b>
                </h4>
                <div>{displayTodo}</div>

                <div className="list-page">
                  <ReactPaginate
                    previousLabel={<i className="fa fa-chevron-left "></i>}
                    nextLabel={<i className="fa fa-chevron-right"></i>}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item me-2"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item me-2"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item me-2"}
                    breakLinkClassName={"page-link"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"active"}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                  />
                </div>
              </Col>
              <InformationPost />
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PostNews;
