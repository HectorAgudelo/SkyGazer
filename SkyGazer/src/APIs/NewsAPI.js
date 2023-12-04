//https://newsapi.org/docs/get-started
// 100 a day
import axios from 'axios';

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const url = 'https://newsapi.org/v2/everything';

async function getNews() {
    try {
        const response = await axios.get(url, {
            params: {
                apiKey: apiKey,
                sortBy: 'popularity',
                language: 'en',
                q: 'cosmology OR astrophotography OR astrophysics OR NASA',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default getNews;
