import axios, { ApiResponse } from 'utils/apiClient';

const passwordAPI = {
  editPassword: async (oldPassword: string, newPassword: string) => {
    const request = {
      pass: oldPassword,
      newpass: newPassword,
    };

    const response = await axios.post<ApiResponse>('/password', request);
    return response;
  },

  createPassword: async (newPassword: string) => {
    const request = {
      newpass: newPassword,
    };

    const response = await axios.post<ApiResponse>('/create-password', request);
    return response;
  },

  requestResetPassword: async (email: string) => {
    const request = {
      email: email,
    };

    const response = await axios.post<ApiResponse>('/request-password-reset', request);
    return response;
  },

  accessResetPassword: async (resetToken: string) => {
    const response = await axios.get<ApiResponse>('/reset-password/' + resetToken);
    return response;
  },

  resetPassword: async (resetToken: string, newPassword: string) => {
    const request = {
      newpass: newPassword,
    };
    const response = await axios.post<ApiResponse>('/reset-password/' + resetToken, request);
    return response;
  },
};

export default passwordAPI;
