import express from 'express';

const app = express();

app.post('/home', function (req, res) {
	return res.json({ msg: 'Hello World!' });
});

app.listen(5000);
