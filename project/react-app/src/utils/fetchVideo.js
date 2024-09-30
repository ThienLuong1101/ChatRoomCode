import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const getOptions = (ids) => ({
  params: {
    part: 'contentDetails,snippet,statistics',
    id: ids.join(',')
  },
  headers: {
    'x-rapidapi-key': '2587f28469msh781e90bb6c5fdafp127ab8jsn3e71f1e2c209',
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
  }
});

export const fetchVideo = async (ids = []) => {
  if (ids.length === 0) return { items: [] };

  const options = getOptions(ids);
  const { data } = await axios.get(`${BASE_URL}/videos`, options);
  return data;
};
