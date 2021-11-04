import Axios from 'axios';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Alert, Button, Form, Row, Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../common/constants';
import { IUserResponse } from '../common/types';
import {
  GradientBackground,
  StyledContainer,
} from '../components/styled/CommonStyle';
import {
  RegisterError,
  RegisterRequest,
  RegisterSuccess,
  RegisterReset,
} from '../store/actions';
import { store } from '../store/store';

interface LocationState {
  from: {
    pathname: string;
  };
}

const LoginPage: React.FC<{}> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {
    state: {
      userState: { user },
      userRegisterState: { loading, error, message },
    },
    dispatch,
  } = useContext(store);
  const history = useHistory();
  const location = useLocation<LocationState>();
  let { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (user) {
      history.replace(from);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(RegisterReset()), []);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(RegisterError('Mật khẩu xác nhận không chính xác'));
      return;
    }
    dispatch(RegisterRequest());
    try {
      const { data } = await Axios.post<IUserResponse>(
        `${SERVER_URL}/users/register`,
        {
          email,
          password,
          name,
        }
      );
      if (data.error) {
        dispatch(RegisterError(data.error));
        return;
      }
      if (data.message) {
        dispatch(RegisterSuccess(data.message));
        setTimeout(() => history.push('/login'), 800);
        return;
      }
    } catch (err) {
      dispatch(RegisterError(String(err)));
    }
  };

  return (
    <GradientBackground>
      <StyledContainer className="border rounded-3 px-4 py-5 position-absolute top-50 start-50 translate-middle shadow bg-body">
        <Row className="text-center mb-1">
          <h2>Đăng ký</h2>
        </Row>
        <Row className="px-2">
          {message ? (
            <Alert variant="success">{message}</Alert>
          ) : (
            error && <Alert variant="danger">{error}</Alert>
          )}
        </Row>
        <Row>
          <Form onSubmit={(e) => handleRegister(e)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="nguyenvana@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Link to="/login">Quay về trang Đăng nhập</Link>
            </Form.Group>
            <Row className="d-grid gap-2 col-6 mx-auto mt-4">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Vui lòng chờ...
                  </>
                ) : (
                  <>Đăng ký</>
                )}
              </Button>
            </Row>
          </Form>
        </Row>
      </StyledContainer>
    </GradientBackground>
  );
};

export default LoginPage;
