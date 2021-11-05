import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Alert, Button, Form, Row, Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { register } from '../api/user';
import { USER } from '../common/constants';
import { LocationState } from '../common/types';
import {
  GradientBackground,
  StyledContainer,
} from '../components/styled/CommonStyle';
import { store } from '../store/store';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {
    state: { user },
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
    mutateAsync: Register,
  } = useMutation(USER.REGISTER, register);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không đúng');
      return;
    }
    const res = await Register({ email, name, password });
    if (res.message) {
      setTimeout(() => history.push('/login'), 900);
    }
  };

  return (
    <GradientBackground>
      <StyledContainer className="border rounded-3 px-4 py-5 position-absolute top-50 start-50 translate-middle shadow bg-body">
        <Row className="text-center mb-1">
          <h2>Đăng ký</h2>
        </Row>
        <Row className="px-2">
          {data?.message ? (
            <Alert variant="success">{data?.message}</Alert>
          ) : (
            data?.error && <Alert variant="danger">{data?.error}</Alert>
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

export default RegisterPage;
