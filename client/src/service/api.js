import apiClient from "./apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";

const fetchMessages = async (id) => {
  const response = await apiClient.get(`/chat/${id}`);
  return response.data;
};

const sendMessage = async (data) => {
  const response = await apiClient.post("/chat", data);
  return response.data;
};

export const useGetChat = (id) => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: () => fetchMessages(id),
    enabled: false,
  });
};

export const useSendMessage = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: onSuccess,
    onError: onError,
  });
};
