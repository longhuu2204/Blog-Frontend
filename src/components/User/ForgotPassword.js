import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toastError, toastSuccess } from "../../Toast/Toast";
import { enterCodePass, forgotPassword } from "../../utils/callerAPI";
import { useHistory, Link } from "react-router-dom";
import * as types from "../.././contains/types";

const ForgotPassword = () => {
  const history = useHistory();
  const [account_name, setAccount_name] = useState("");
  const [id_account, setId_account] = useState("");
  const [code, setCode] = useState("");

  const onSubmitForgotPassword = async (event) => {
    event.preventDefault();
    const response = await forgotPassword(account_name);
    if (response.status === 200) {
      toastSuccess(response.message);
      localStorage.setItem(types.LOCAL_STORAGE_USER, response.data?.id_account);
      setId_account(response.id_account);
      history.push("/forgot/password");
    } else {
      toastError(response.message);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await enterCodePass(id_account, code);
    if (response.status === 200) {
      toastSuccess(response.message);
    } else {
      toastError(response.message);
    }
  };

  return (
    <>
      <div className="landing">
        <div className="dark-overlay">
          <div className="landing-container">
            <Link to="/">
              <img
                srcSet="/logo.png 2x"
                alt="monkey-blogging"
                className="logo"
              />
            </Link>
            <h1 className="heading">MONKEY NEWS</h1>
          </div>
          <div className="landing-inner">
            <h1>Chào mừng bạn đến với website ITNEWS</h1>
            <h4>Lấy lại mật khẩu</h4>
            <Form className="my-4" onSubmit={onSubmitForgotPassword}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Tên đăng nhập"
                  name="account_name"
                  require="true"
                  value={account_name}
                  onChange={(e) => setAccount_name(e.target.value)}
                />
              </Form.Group>
              <Button
                className="mt-3"
                variant="success"
                type="submit"
                style={{ marginBottom: "20px" }}
              >
                Lấy mã
              </Button>
            </Form>
            <Form className="my-4" onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Nhập mã xác nhận"
                  require="true"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Form.Group>
              <Button className="mt-3" variant="success" type="submit">
                Xác nhận
              </Button>
            </Form>
            <p>
              Bạn đã nhớ mật khẩu? &nbsp;
              <Link to="/login">
                <Button
                  style={{ color: "white" }}
                  variant="info"
                  className="ml-2"
                >
                  Đăng nhập
                </Button>
              </Link>
              &nbsp;
              <Link to="/">
                <Button style={{ color: "white" }} variant="info">
                  Trang chủ
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
