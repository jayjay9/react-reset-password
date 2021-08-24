import React from 'react';
import logo from 'assets/images/logoWhite.png';

// components
import ResetPasswordForm from 'features/auth/ResetPasswordForm';

interface ResetPasswordProps {
  match: any;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ match }) => {
  return (
    <div className="container">
      <div className="auth-form">
        <div className="logo">
          <img src={logo} alt="Reframe Group Logo" />
        </div>
        <ResetPasswordForm match={match} />
      </div>
    </div>
  );
};

export default ResetPassword;
