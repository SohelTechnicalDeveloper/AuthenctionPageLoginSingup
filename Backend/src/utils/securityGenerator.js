import passGenerator from 'generate-password'

export const password = passGenerator.generate({
	length: 10,
	numbers: true
});

// 'uEyMTw32v9'
console.log(password);