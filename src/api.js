import axios from "axios";

// 기본설정 셋팅
const api = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    params: {
        "api_key": "4c8ee2268c210db27e8630bb8aef5ad1",
        "language":"en-US"
    }
})




export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: (id) => api.get(`movie/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get("/search/movie", {
        params: {
            query: encodeURIComponent(term)
        }
    })
};

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: (id) => api.get(`tv/${id}`),
    search: (term) => api.get("/search/tv", {
        params: {
            query: encodeURIComponent(term)
        }
    })
};

export const collectionApi = {
    collections: (id) => api.get(`collection/${id}`)
}