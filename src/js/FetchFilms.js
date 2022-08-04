import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '34dbf9d1a3fd74b10bf7ab9eec59866f';

export default class FetchFilms {
    #query = '';
    constructor() {
        this.page = 1;
        this.genre = '';
        this.year = '';
    }
    //какдый раз когда идет новй запрос то меняем страничку на первую
    set query(newQuery) {
        this.page = 1;
        this.#query = newQuery;
    }
    get query() {
        return this.#query;
    }
    async fetch(typeRequest) {
        const response = await axios.get(typeRequest, {
            params: {
                api_key: API_KEY,
                query: this.#query,
                page: this.page,
                primary_release_year: this.year,
                with_genres: this.genre,
            },
        });
        return response.data;
    }
    //дожидается выполнения работы ф. fetch и передает в параметрах тип запроса
    async fetchFilms() {
        return await this.fetch('search/movie');
    }
    async fetchPopular() {
        return await this.fetch('trending/movie/week');
    }
    async fetchTrailer(id) {
        return await this.fetch(`movie/${id}/videos`);
    }
    async fetchFilter() {
        return await this.fetch(`discover/movie`);
    }
}
