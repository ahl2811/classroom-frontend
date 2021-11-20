import React, { useState } from "react";
import {
  Form,
  FormControl,
  Modal,
  Button,
  Spinner,
  FloatingLabel,
  ModalProps,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const ModalInviteMembers = (props: ModalProps) => {
  const [email, setEmail] = useState<string>("");
  const loading = false;

  return (
    <Modal {...props}>
      <ToastContainer />
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Invite student</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-3">
          <FloatingLabel label="Email">
            <FormControl
              placeholder="Input email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            // disabled={loading || email === ""}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Please wait...
              </>
            ) : (
              <>Invite</>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalInviteMembers;
