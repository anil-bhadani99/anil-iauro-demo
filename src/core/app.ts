import cors from 'cors'
import express from 'express'
import { MongoHelper } from '../helpers/mongoHelpers';
import { Config } from '../config/config';

const app = express()

const mHelper = new MongoHelper();
mHelper.initiateMongoConnection();

app.use(function (req, res, next) {
	// res.header('Access-Control-Allow-Origin', 'YOUR-DOMAIN.TLD') // update to match the domain you will make the request from
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

if (Config.NODE_ENV === 'development') {
	app.use(cors({ origin: 'http://localhost:3001' }))
}

export default app
