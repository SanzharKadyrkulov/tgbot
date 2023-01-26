const axios = require('axios');
require('dotenv').config();

const URL = 'https://api.telegram.org/bot';
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
async function sendRequest(method, body) {
	let res;
	if (body) {
		res = await axios.post(`${URL}${TOKEN}/${method}`, body);
		return res.data;
	} else {
		res = await axios.get(`${URL}${TOKEN}/${method}`);
		return res.data;
	}
}

const getMe = async () => {
	const data = await sendRequest('getMe');
	console.log(data, 'data');
};

const sendMessage = async (chat_id, text) => {
	const data = await sendRequest('sendMessage', { chat_id, text });
};

const count = 10;

// 845726305 - Polina
let i = 0;
const interval = setInterval(() => {
	sendMessage(1173328729, 'idi nahui');
	console.log(i);
	if (++i >= count) {
		clearInterval(interval);
	}
}, 5000);
