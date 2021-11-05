import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Alert, Button, Form, Row, Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { login } from '../api/user';
import { USER } from '../common/constants';
import { LocationState } from '../common/types';
import {
  GradientBackground,
  StyledContainer,
} from '../components/styled/CommonStyle';
import { LoginSuccess } from '../store/actions';
import { store } from '../store/store';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    state: { user },
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

  const {
    isLoading: loading,
    data,
    mutateAsync: Login,
  } = useMutation(USER.LOGIN, login);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await Login({ email, password });
    if (res.user) {
      dispatch(LoginSuccess(res.user));
    }
  };

  return (
    <GradientBackground>
      <StyledContainer className="border rounded-3 px-4 py-5 position-absolute top-50 start-50 translate-middle shadow bg-body">
        <Row className="text-center mb-1">
          <h2>Đăng nhập</h2>
        </Row>
        <Row className="px-2">
          {data?.error && <Alert variant="danger">{data?.error}</Alert>}
        </Row>
        <Row>
          <Form onSubmit={(e) => handleLogin(e)}>
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Link to="/register">Đăng ký tài khoản mới?</Link>
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
                  <>Đăng nhập</>
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
