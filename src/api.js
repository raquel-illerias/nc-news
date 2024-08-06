import axios from "axios";

const api = axios.create({
    baseURL: 'https://raquel-illerias-be-nc-news.onrender.com/api'
})

export const getArticles = () => {
    return api.get('/articles').then(({data}) => {
        return data.articles
    }
)}