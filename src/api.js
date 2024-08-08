import axios from "axios";

const api = axios.create({
  baseURL: "https://raquel-illerias-be-nc-news.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const getIndividualArticle = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getCommentFromArticle = (article_id) => {
  return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const patchVoteInArticle = (article_id, votes) => {
  return api.patch(`/articles/${article_id}`, { inc_votes: votes });
};

export const postComment = (article_id, body) => {
  return api.post(`/articles/${article_id}/comments`, {
    username: localStorage.getItem("username"),
    body: body,
  });
};
