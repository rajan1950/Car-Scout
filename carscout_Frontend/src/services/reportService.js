import API from "../utils/api";
import { readAuthSession } from "../utils/auth";

const REPORT_BASE_URL = "/report";

const getAuthHeaders = () => {
  const token = readAuthSession()?.token;

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const createReportApi = async (payload) => {
  const response = await API.post(`${REPORT_BASE_URL}/add`, payload, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const getUserReportsApi = async (userId) => {
  const response = await API.get(`${REPORT_BASE_URL}/user/${userId}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const getAllReportsApi = async () => {
  const response = await API.get(`${REPORT_BASE_URL}/all`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const updateReportStatusApi = async (id, status) => {
  const response = await API.patch(
    `${REPORT_BASE_URL}/${id}/status`,
    { status },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const deleteReportApi = async (id) => {
  const response = await API.delete(`${REPORT_BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};
