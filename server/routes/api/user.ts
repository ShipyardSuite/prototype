import SHA256 = require('crypto-js/sha256');

import User, { IUser } from './../../models/User';
import UserSession from './../../models/UserSession';

import express = require('express');

const serviceName: string = process.env.SERVICE_NAME || 'undefined';

module.exports = (app: express.Application) => {
	// Register new User
	app.post(`/api/${serviceName}/user/register`, (req, res, next) => {
		const { body } = req;
		const { email, password } = body;

		let userEmail: string = email.toLowerCase();
		userEmail.trim();

		if (!email) {
			return res.send({
				success: false,
				message: 'Error: Email cannot be blank.'
			});
		}

		if (!password) {
			return res.send({
				success: false,
				message: 'Error: Password cannot be blank.'
			});
		}

		User.find({ email: userEmail }, (err, previousUsers) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server error'
				});
			} else if (previousUsers.length > 0) {
				return res.send({
					success: false,
					message: 'Error: Account already exist.'
				});
			}

			const newUser = new User();
			newUser.email = userEmail;
			newUser.password = newUser.generateHash(password);
			newUser.verificationToken = SHA256(email).toString();

			newUser.save((err, user) => {
				if (err) {
					return res.send({
						success: false,
						message: 'Error: Server error'
					});
				}

				return res.send({
					success: true,
					data: {
						email: userEmail,
						password
					}
				});
			});
		});
	});

	// Log-In User
	app.post(`/api/${serviceName}/user/login`, (req, res, next) => {
		return res.send({
			success: true
		});
	});

	// Verify User
	app.get(`/api/${serviceName}/user/verify`, (req, res, next) => {
		return res.send({
			success: true
		});
	});

	// Log-Out User
	app.get(`/api/${serviceName}/user/logout`, (req, res, next) => {
		return res.send({
			success: true
		});
	});

	// Get User-Data by email
	app.get(`/api/${serviceName}/user/:email`, (req, res, next) => {
		const email: string = req.params.email;

		User.find({ email }, (err, user: IUser) => {
			if (err) {
				console.log(err);

				return res.send({
					success: false,
					message: err
				});
			}

			return res.send({
				success: true,
				user
			});
		});
	});

	// Get User-Data by id
	app.get(`/api/${serviceName}/user/:id`, (req, res, next) => {
		return res.send({
			success: true,
			user: req.params.id
		});
	});

	// Update User
	app.put(`/api/${serviceName}/user`, (req, res, next) => {
		return res.send({
			success: true
		});
	});

	// Get all Users
	app.get(`/api/${serviceName}/users`, (req, res, next) => {
		User.find((err, users) => {
			if (err) {
				console.log('error:', err);
				return res.send({
					success: false,
					message: err
				});
			}

			return res.send({
				success: true,
				users
			});
		});
	});
};
