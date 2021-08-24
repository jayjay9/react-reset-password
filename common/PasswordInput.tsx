import React, { useState } from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { InputField } from './formFieldTypes';
import { useField } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PasswordInput: React.FC<InputField> = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props });
  const [show, setShow] = useState<boolean>(false);

  const type = show ? 'text' : 'password';

  return (
    <Form.Group as={Col} lg={props.lg}>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control {...field} type={type} isInvalid={meta.touched && !!meta.error} />
        <InputGroup.Append>
          <InputGroup.Text>
            {show && (
              <span
                onClick={() => {
                  setShow(false);
                }}
              >
                <FontAwesomeIcon icon={['far', 'eye-slash']} />
              </span>
            )}
            {!show && (
              <span
                onClick={() => {
                  setShow(true);
                }}
              >
                <FontAwesomeIcon icon={['far', 'eye']} />
              </span>
            )}
          </InputGroup.Text>
        </InputGroup.Append>
        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export default PasswordInput;
