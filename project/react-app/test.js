const request = require('request');

const videoId = 'FHTbsZEJspU';

const options = {
  method: 'GET',
  url: 'https://youtube-v31.p.rapidapi.com/videos',
  qs: {
    part: 'contentDetails,snippet,statistics',
    id: videoId
  },
  headers: {
    'x-rapidapi-key': '488a23d67bmshe057a5bbea346b8p174a97jsn724cad02ced7',
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});
