import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../.././utils/callerAPI";
import { toastError, toastSuccess } from "../.././Toast/Toast";
import { useHistory } from "react-router-dom";
import { Form, Button, FormLabel } from "react-bootstrap";

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    account_name: "",
    password: "",
  });

  const history = useHistory();

  const onChangeLogin = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.status === 200) {
        toastSuccess(loginData.message);
        // localStorage.setItem(types.LOCAL_STORAGE_USER, JSON.stringify(loginData.data))
        // localStorage.setItem(types.LOCAL_STORAGE_isAuthenticated, true)
        // dispatch(setUser({
        //     user: loginData.data,
        //     isAuthenticated: true
        // }))
        history.push("/");
      } else {
        toastError(loginData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { account_name, password } = loginForm;
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-container">
          <Link to="/">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
          </Link>
          <h1 className="heading">MONKEY NEWS</h1>
        </div>
        <div className="landing-inner">
          <h4>Chào mừng bạn đến với Monkey news</h4>
          <Form className="my-4" onSubmit={onSubmitLogin}>
            <Form.Group className="mb-3 field-styles">
              <FormLabel>Tên đăng nhập</FormLabel>
              <Form.Control
                type="text"
                placeholder="Vui lòng nhập tên đăng nhập"
                require="true"
                name="account_name"
                value={account_name}
                onChange={onChangeLogin}
              />
            </Form.Group>
            <Form.Group className="field-styles">
              <FormLabel>Mật khẩu</FormLabel>
              <Form.Control
                type="password"
                placeholder="Vui lòng nhập mật khẩu"
                require="true"
                name="password"
                value={password}
                onChange={onChangeLogin}
              />
            </Form.Group>
            <Button className="mt-3" variant="success" type="submit">
              Đăng nhập
            </Button>
          </Form>
          <div>
            <Link
              className="letter"
              style={{ fontSize: "20px" }}
              to="/forgot/password"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <p>
            Bạn chưa có tài khoản? &nbsp;
            <Link
              to="/register"
              className="letter"
              style={{ fontSize: "24px" }}
            >
              Đăng ký ngay
            </Link>
            &nbsp;
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
