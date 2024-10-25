export const buildApiGetRequest = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const buildApiPostRequest = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const buildApiPutRequest = async (url, data) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const buildApiDeleteRequest = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};
