export const loadCommentsFromLocalStorage = (taskId) => {
  const storedComments = localStorage.getItem(`comments_${taskId}`);
  return storedComments ? JSON.parse(storedComments) : [];
};

export const saveCommentsToLocalStorage = (taskId, comments) => {
  localStorage.setItem(`comments_${taskId}`, JSON.stringify(comments));
};
