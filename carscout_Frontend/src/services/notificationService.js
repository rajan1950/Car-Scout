import API from "../utils/api";
import { readAuthSession } from "../utils/auth";

const NOTIFICATION_BASE_URL = "/notification";

const getAuthHeaders = () => {
  const token = readAuthSession()?.token;

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getMyNotifications = async ({ page = 1, limit = 20 } = {}) => {
  const response = await API.get(`${NOTIFICATION_BASE_URL}/my`, {
    params: { page, limit },
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const getUnreadNotificationCount = async () => {
  const response = await API.get(`${NOTIFICATION_BASE_URL}/unread-count`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const markNotificationAsRead = async (id) => {
  const response = await API.patch(
    `${NOTIFICATION_BASE_URL}/${id}/read`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await API.patch(`${NOTIFICATION_BASE_URL}/read-all`, {}, { headers: getAuthHeaders() });

  return response.data;
};

export const deleteNotificationById = async (id) => {
  const response = await API.delete(`${NOTIFICATION_BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const createNotificationForUser = async (payload) => {
  const response = await API.post(`${NOTIFICATION_BASE_URL}/create`, payload, {
    headers: getAuthHeaders(),
  });

  return response.data;
};
