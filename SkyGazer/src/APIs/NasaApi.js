//https://api.nasa.gov/
import axios from 'axios';
const apiKey = import.meta.env.VITE_NASA_API_KEY;

const picOfDay = 'https://api.nasa.gov/planetary/apod';

async function getAPOD() {
  try {
    const response = await axios.get(picOfDay, {
      params: {
        api_key: apiKey,
        thumbs: true,
        
      }
    }); 
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


const donki = 'https://api.nasa.gov/DONKI/notifications?startDate=2014-05-01&endDate=2014-05-08&type=all&';

async function getDonki() {
  try {
    const response = await axios.get(donki, {
      params: {
        api_key: apiKey,
          
      }
    }); 
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export {getDonki, getAPOD};
