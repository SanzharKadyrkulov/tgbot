const { default: axios } = require('axios');
const TeleBot = require('telebot');
require('dotenv').config();
const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);
const API = 'http://localhost:8000/users';

let users = [];
getUsers();
// bot.on('/start', (msg) => {
//   return msg.reply.text('Welcome!\nНапиши "Привет бот"');
// });

// bot.on([/hello*/i, /привет*/i], (msg) => {
//   console.log(msg);
//   return msg.reply.text('ПОШЛА НАХУЙ!');
// });

// bot.on(/(show\s)?kitty*/, (msg) => {
//   return msg.reply.photo('http://thecatapi.com/api/images/get');
// });

bot.on('/start', (msg) => {
	console.log(msg.chat);
	if (!users.some((user) => user.id === msg.chat.id)) {
		createUser(msg.chat);
	}
	return msg.reply.text(
		`Спасибо, ${msg.from.first_name}! Теперь я могу тебя спамить`
	);
});

bot.on('/start', (msg) => {
	return msg.reply.sticker('./sticker.webp');
});
bot.on('text', (msg) => {
	if (msg.text !== '/start')
		return msg.reply.text('Пошел нахуй! Я других команд не знаю');
});
bot.start();

// bot.sendMessage(845726305, 'че там?', { notification: true });

// 845726305 id Polina
// message_id: 250,
//   from: {
//     id: 845726305,
//     is_bot: false,
//     first_name: 'polina',
//     username: 'polina_qwe',
//     language_code: 'ru'
//   },
//   chat: {
//     id: 845726305,
//     first_name: 'polina',
//     username: 'polina_qwe',
//     type: 'private'
//   },

async function getUsers() {
	const { data } = await axios.get(API);
	users = data;
}

async function createUser(user) {
	await axios.post(API, user);
	getUsers();
}
