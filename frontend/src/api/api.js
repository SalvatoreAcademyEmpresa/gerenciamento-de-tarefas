// src/api.js

const API_URL = "http://localhost:3000/tasks";

export const buildApiGetRequest = async (url) => {
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw new Error("Erro ao carregar dados: " + url);
  }

  return await response.json();
};

export const buildApiPostRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar dados: " + url);
  }

  return await response.json();
};

export const buildApiPutRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar dados: " + url);
  }

  return await response.json();
};

export const buildApiDeleteRequest = async (url) => {
  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Erro ao remover dados: " + url);
  }

  return await response.json();
};

export default API_URL;
