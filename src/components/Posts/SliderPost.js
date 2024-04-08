import React, { useEffect } from "react";
import { Col, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postNewestSelector,
  fetchPostNewest,
} from "../../reducers/User/fetchPost";
import { loadUser } from "../../reducers/User/loginForm";
import { setShow } from "../../reducers/Comment/comment";
import bannerImg from "../../assets/banner.png";
import imageSlider5 from "../.././assets/slider-5.jfif";
import { useHistory } from "react-router-dom";

const SliderPost = () => {
  const dispatch = useDispatch();
  const postNewest = useSelector(postNewestSelector);
  const image = [imageSlider5, imageSlider5, imageSlider5, imageSlider5];

  let history = useHistory();

  function handleClick() {
    history.push("/newest");
  }

  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchPostNewest());
  }, [dispatch]);

  const sliders = () => {
    return postNewest.map((post, index) => {
      // const randomColor = color[Math.floor(Math.random() * color.length)]
      // const choose = randomColor
      return (
        <Carousel.Item key={index}>
          <img
            className="d-block"
            src={image[index]}
            alt="First slide"
            style={{ width: "100%", height: "450px" }}
          />
          <Carousel.Caption className="d-table-row mb-4">
            <h3>{post.post.title}</h3>
            <p>
              {post.post.content.length < 200
                ? post.post.content
                : post.post.content.substring(0, 200) + " ..."}
            </p>
            <Button
              className="mt-2"
              variant="success"
              as={Link}
              to={`/p/post/${post.post.id_post}`}
              onClick={() => dispatch(setShow())}
            >
              See now
            </Button>
            <div style={{ marginTop: "100px" }}></div>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });
  };
  return (
    <>
      <Col
        xl={12}
        lg={12}
        sm={12}
        md={12}
        style={{ backgroundColor: "#F0F8FF" }}
      >
        <div className="banner-container">
          <div className="banner">
            <div className="banner-content">
              <h1 className="banner-heading">MONKEY NEWS</h1>
              <p className="banner-desc">
                Nơi chia sẻ kiến thức lập trình. Học mọi lúc, mọi nơi
              </p>
              <Button className="banner-button" onClick={handleClick}>
                Get started
              </Button>
            </div>
            <div className="banner-image">
              <img src={bannerImg} alt="banner" className="img" />
            </div>
          </div>
        </div>
        <div style={{ margin: "30px 0" }}>
          <Carousel>{sliders()}</Carousel>
        </div>
      </Col>
    </>
  );
};

export default SliderPost;
