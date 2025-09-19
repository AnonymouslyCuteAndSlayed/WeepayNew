import axios from "axios";
import { useCallback } from "react";

// Change this to match your .NET API base URL
const API_BASE_URL = "http://localhost:5087/api/User";

export function useAdminApi() {
  // Create new user
  const createAccount = useCallback(async (data) => {
    const res = await axios.post(`${API_BASE_URL}/CreateUser`, data);
    return res.data;
  }, []);

  // Login
  const initiateLogin = useCallback(async (data) => {
    const res = await axios.post(`${API_BASE_URL}/InitiateLogin`, data);
    return res.data;
  }, []);

  // Forgot password
  const forgotPassword = useCallback(async (data) => {
    const res = await axios.post(`${API_BASE_URL}/ForgotPassword`, data);
    return res.data;
  }, []);

  // Verify OTP
  const verifyOtp = useCallback(async (data) => {
    const res = await axios.post(`${API_BASE_URL}/VerifyOtp`, data);
    return res.data;
  }, []);

  // Reset password
  const resetPassword = useCallback(async (data) => {
    const res = await axios.post(`${API_BASE_URL}/ResetPassword`, data);
    return res.data;
  }, []);

  // ChangeProfile
  const changeProfile = useCallback(async (data) => {
    const res = await axios.post(`${API_BASE_URL}/ChangeProfile`, data);
    return res.data;
  })

  // Get user by username
  const getUserByUsername = useCallback(async (username) => {
    const res = await axios.get(`${API_BASE_URL}/GetUserByUsername`, {
      params: { Username: username },
    });
    return res.data;
  }, []);

  // Get all users
  const getAllUsers = useCallback(async () => {
    const res = await axios.get(`${API_BASE_URL}/GetAllUsers`);
    return res.data;
  }, []);

  // Update user
  const updateUser = useCallback(async (userId, data) => {
    const res = await axios.put(`${API_BASE_URL}/UpdateUser`, data, {
      params: { UserId: userId },
    });
    return res.data;
  }, []);

  // Delete user
  const deleteUser = useCallback(async (userId) => {
    const res = await axios.delete(`${API_BASE_URL}/DeleteUser`, {
      params: { UserId: userId },
    });
    return res.data;
  }, []);

  return {
    createAccount,
    initiateLogin,
    forgotPassword,
    verifyOtp,
    resetPassword,
    getUserByUsername,
    getAllUsers,
    changeProfile,
    updateUser,
    deleteUser,
  };
}
