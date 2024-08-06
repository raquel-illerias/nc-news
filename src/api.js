import axios from "axios";

const api = axios.create({
    baseURL: 'https://raquel-illerias-be-nc-news.onrender.com/api'
})

export const getArticles = () => {
    return api.get('/articles').then(({data}) => {
        return data.articles
    }
)}

export const getIndividualArticle = (article_id) => {
    return api.get(`/articles/${article_id}`).then(({data}) => {
       console.log(data.article, 'data article')
        return data.article
    })
}