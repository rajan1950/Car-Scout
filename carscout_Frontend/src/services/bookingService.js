import API from "../utils/api";
import { readAuthSession } from "../utils/auth";

const BOOKING_BASE_URL = "/testdrive";

const getAuthHeaders = () => {
  const token = readAuthSession()?.token;

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const createBookingApi = async (payload) => {
  const normalizedPayload = {
    userId: payload?.userId,
    carId: payload?.carId,
    date: payload?.date || payload?.bookingDate,
    bookingDate: payload?.bookingDate || payload?.date,
    location: payload?.location,
    status: payload?.status || "pending",
  };

  const response = await API.post(`${BOOKING_BASE_URL}/add`, normalizedPayload, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const getUserBookingsApi = async (userId) => {
  const response = await API.get(`${BOOKING_BASE_URL}/user/${userId}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const getAllBookingsApi = async () => {
  const response = await API.get(`${BOOKING_BASE_URL}/all`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const updateBookingStatusApi = async (id, status) => {
  const response = await API.patch(
    `${BOOKING_BASE_URL}/${id}/status`,
    { status },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const deleteBookingApi = async (id) => {
  const response = await API.delete(`${BOOKING_BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};
