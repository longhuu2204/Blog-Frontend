import React, { useState } from "react";
import { toastError, toastSuccess } from "../.././Toast/Toast";
import { registerUser } from "../.././utils/callerAPI";
import { useHistory, Link } from "react-router-dom";
import { Form, Button, FormLabel } from "react-bootstrap";

const RegisterForm = () => {
  const [registerForm, setRegisterForm] = useState({
    account_name: "",
    real_name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const history = useHistory();

  const onChangeRegister = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmitRegister = async (event) => {
    event.preventDefault();
    if (password !== confirm) {
      toastError("Mật khẩu và mật khẩu nhập lại không trùng khớp!");
    } else {
      try {
        const register = {
          account_name: account_name,
          real_name: real_name,
          email: email,
          password: password,
        };
        const registerData = await registerUser(register);
        if (registerData.status) {
          toastSuccess(registerData.message);
          history.push("/login");
        } else {
          toastError(registerData.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { account_name, real_name, email, password, confirm } = registerForm;
  return (
    <div className="landing-register">
      <div className="dark-overlay">
        <div className="landing-container">
          <Link to="/">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
          </Link>
          <h1 className="heading">MONKEY NEWS</h1>
        </div>
        <div className="landing-inner">
          <h4>Đăng ký tài khoản</h4>
          <Form className="my-4" onSubmit={onSubmitRegister}>
            <Form.Group className="mb-3 field-styles">
              <FormLabel>Tên đăng nhập</FormLabel>
              <Form.Control
                type="text"
                require="true"
                placeholder="Vui lòng nhập tên đăng nhập"
                name="account_name"
                value={account_name}
                onChange={onChangeRegister}
              />
            </Form.Group>
            <Form.Group className="mb-3 field-styles">
              <FormLabel>Tên hiển thị</FormLabel>
              <Form.Control
                type="text"
                require="true"
                placeholder="Vui lòng nhập tên hiển thị của bạn"
                name="real_name"
                value={real_name}
                onChange={onChangeRegister}
              />
            </Form.Group>
            <Form.Group className="mb-3 field-styles">
              <FormLabel>Email</FormLabel>
              <Form.Control
                type="text"
                require="true"
                placeholder="Vui lòng nhập email"
                name="email"
                value={email}
                onChange={onChangeRegister}
              />
            </Form.Group>
            <Form.Group className="mb-3 field-styles">
              <FormLabel>Mật khẩu</FormLabel>
              <Form.Control
                type="password"
                require="true"
                placeholder="Vui lòng nhập mật khẩu"
                name="password"
                value={password}
                onChange={onChangeRegister}
              />
            </Form.Group>
            <Form.Group className="mb-3 field-styles">
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <Form.Control
                type="password"
                require="true"
                placeholder="Vui lòng nhập lại mật khẩu"
                name="confirm"
                value={confirm}
                onChange={onChangeRegister}
              />
            </Form.Group>
            <Button className="mt-3" variant="success" type="submit">
              Đăng ký
            </Button>
          </Form>

          <p>
            Bạn đã có tài khoản? &nbsp;
            <Link
              to="/login"
              className="letter"
              style={{ fontSize: "24px", paddingBottom: "50px" }}
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
