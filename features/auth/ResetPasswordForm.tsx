import React, { useEffect, useState } from 'react';
import passwordAPI from 'api/passwordAPI';
import { Redirect, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, Col, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// components
import PasswordInput from 'common/formFields/PasswordInput';

// styles
import 'scss/features/auth/resetPasswordForm.scss';

const PasswordSchema = Yup.object().shape({
  password: Yup.string().required('Please provide a valid password.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], "Passwords don't match")
    .required('Please confirm your chosen password.'),
});

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  match: any;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ match }) => {
  const [accessPasswordReset, setAccessPasswordReset] = useState<boolean>(true);
  const [resetFormToken, setResetFormToken] = useState<string>(decodeURIComponent(match.params.reset_token));
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);

  /**
   * On submit, call the api to reset their password.
   * @param values - values of the form
   */
  const handleSubmit = async (values: ResetPasswordFormValues) => {
    const response = await passwordAPI.resetPassword(resetFormToken, values.password);
    if (response.success) {
      toast.success('Password reset successfully.', { onOpen: () => setResetSuccess(true) });
    } else {
      toast.error(response.error);
    }
  };

  /**
   * Validates if the reset form token from the url is valid.
   */
  const checkAccess = async () => {
    const response = await passwordAPI.accessResetPassword(resetFormToken);
    if (response.success) {
      toast.success('Access Granted');
      setAccessPasswordReset(true);
    } else {
      toast.error(response.error);
      setAccessPasswordReset(false);
    }
  };

  useEffect(() => {
    checkAccess();
  }, [resetFormToken]);

  // When user successfully resets their password, redirect them to the login page.
  if (resetSuccess) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return (
    <div className="reset-password-form">
      {!accessPasswordReset ? (
        <div className="reset-password-invalid">
          <h1>Invalid Token</h1>
          <p>This token does not exist or may have expired. Please request another password reset.</p>
        </div>
      ) : (
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={PasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form id="reset-password">
              Enter a new password for your account
              <PasswordInput label="Password" name="password" />
              <PasswordInput label="Confirm Password" name="confirmPassword" />
              <Col className="form-action">
                <div className="reset-password-submit">
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner animation="border" variant="primary" /> : <span>Reset Password</span>}
                  </Button>
                </div>
              </Col>
            </Form>
          )}
        </Formik>
      )}
      <div className="back-to-login">
        <Link to={'/login'}>Back To Login</Link>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
