import axios from 'axios';
// function to fetch data from the node server
const url = 'http://localhost:3000';

async function fetchData() {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default fetchData;
// Usage example:

