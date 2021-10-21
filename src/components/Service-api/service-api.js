import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23103282-e7d496618b624ef4484ab3d5c';

const fetchApi = async (query, page) => {
        const searchParams = new URLSearchParams({
        q: query,
        page: page,
        per_page: '12',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true'
    })
    const url = `${BASE_URL}?key=${API_KEY}&${searchParams}`
    const { data } = await axios.get(url);
  return data;
};

export default fetchApi;
    

 