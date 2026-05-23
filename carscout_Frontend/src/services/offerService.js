import API from "../utils/api";
import { readAuthSession } from "../utils/auth";

const OFFER_BASE_URL = "/offer";

const getAuthHeaders = () => {
  const token = readAuthSession()?.token;

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const createOfferApi = async (payload) => {
  const response = await API.post(`${OFFER_BASE_URL}/create`, payload, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const getMyOffersApi = async ({ type, status } = {}) => {
  const response = await API.get(`${OFFER_BASE_URL}/my`, {
    params: {
      ...(type ? { type } : {}),
      ...(status ? { status } : {}),
    },
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const updateOfferApi = async (offerId, payload) => {
  const response = await API.patch(`${OFFER_BASE_URL}/${offerId}`, payload, {
    headers: getAuthHeaders(),
  });

  return response.data;
};
