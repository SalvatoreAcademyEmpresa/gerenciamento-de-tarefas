const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_PRODUCTION
    : process.env.REACT_APP_API_URL;

const buildApiGetRequest = async (url) => {
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw new Error("Erro ao carregar dados: " + url);
  }

  return await response.json();
};

const buildApiPostRequest = async (url, body) => {
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

const buildApiPutRequest = async (url, body) => {
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

const buildApiDeleteRequest = async (url) => {
  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Erro ao remover dados: " + url);
  }

  return await response.json();
};

export {
  API_URL,
  buildApiGetRequest,
  buildApiPostRequest,
  buildApiPutRequest,
  buildApiDeleteRequest,
};
