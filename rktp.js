const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const token = '669148001:AAG2rxvWByTl1Er7PHI78VIdI6gMKvXBPrA';

const bot = new TelegramBot(token, { polling: true });

bot.on('text', function(msg) {    
	const messageChatId = msg.chat.id;     
	const messageText = msg.text;  

		if (messageText === '/rkt8') {

			request('https://marketdata.wavesplatform.com/api/ticker/WAVES/USD', function(error, response, body) {
				const data = JSON.parse(body);
				const wavesusd = data['24h_close']

					request('https://matcher.wavesplatform.com/matcher/orderbook/8LjKWGxXsiLpMziWanFn117e97gNXShD1zwSLCGpSPfb/WAVES', function(error, response, body) {
						const data = JSON.parse(body);
						const lastbid = (data.bids[0].price / 100000000).toFixed(8);
						const lastask = (data.asks[0].price / 100000000).toFixed(8);
						const lastbidusd = lastbid * wavesusd;
						const lastaskusd = lastask * wavesusd;
						var rktusd = ((lastbidusd + lastaskusd)/2).toFixed(2);

						let md = `
							🚀  RKT8  /  WAVES  🌊
		
							Покупка: ${lastbid}
							Продажа: ${lastask}
							Цена в usd: ${rktusd}
						`;	
						bot.sendMessage(messageChatId, md);			
					})

			})
			

		}	else if (messageText === '/waves') {

			request('https://matcher.wavesplatform.com/matcher/orderbook/WAVES/Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck', function(error, response, body) {
				const data = JSON.parse(body);
				const lastbid = '0.' + data.bids[0].price;
				const lastask = '0.' + data.asks[0].price;
				let md = `
					🌊  WAVES  /  USD  💲
		
					Покупка: ${(lastbid * 10).toFixed(2)}
					Продажа: ${(lastask * 10).toFixed(2)}
				`;
				bot.sendMessage(messageChatId, md);
			})

		}

});    
 
