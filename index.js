const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const smsSchema = new mongoose.Schema({
	name: String,
	contact: String
})



// app.post(`/insert`,(req,res)=>{
// 	const data = new test(req.body);
// 	data.save().then(result=>{
// 		res.send(result)
// 	})
// 	.catch((err)=>{
// 		res.send(err);ß
// 	})
// })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// const test = mongoose.model('test', smsSchema);

app.post('/send_sms', (req, res) => {
	let phone_number = req.body.phone_number;
	let message = req.body.message;
	console.log(phone_number, message);
	const options = {
		username: 'nyatindopatrick',
		apiKey: 'e6e3841614997d2e6e87e29d1f0bfad4fe3e937c5317f9ad11b5effabde21bdc'
	};

	// initialize africastalking gateway
	const africastalking = require('africastalking')(options);

	// sms object of africastalking package
	const sms = africastalking.SMS;

	// sending parameters
	const sending_options = {
		to: phone_number,
		message: message,
		// from: 'Parto'
	};

	// send sms
	sms.send(sending_options)
	.then(response => {
		console.log(response);
		res.send(response);
	})
	.catch(error => {
		console.log(error);
		res.send(error);
	});
});
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).then(()=>{
        app.listen(port, () => console.log(`Academy app running on port ${port}`))
}).catch(error=>console.log(error));



