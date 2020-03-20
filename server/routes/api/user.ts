import SHA256 = require('crypto-js/sha256');

import User, { IUser } from './../../models/User';
import UserSession from './../../models/UserSession';
import UserProfile from './../../models/UserProfile';

import express = require('express');

const serviceName: string = process.env.SERVICE_NAME || 'undefined';

module.exports = (app: express.Application) => {
	// Register new User
	app.post(`/api/${serviceName}/user/register`, (req, res, next) => {
		const { body } = req;
		const { email, password } = body;

		let userEmail: string = email.toLowerCase();
		userEmail.trim();

		if (!userEmail) {
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
			newUser.profile = new UserProfile();

			newUser.save((err, user) => {
				if (err) {
					return res.send({
						success: false,
						message: err.message
					});
				}
				return res.send({
					success: true,
					data: {
						email: userEmail
					}
				});
			});
		});
	});

	// Log-In User
	app.post(`/api/${serviceName}/user/login`, (req, res, next) => {
		const { body } = req;
		const { email, password } = body;

		let userEmail: string = email.toLowerCase();
		userEmail.trim();

		if (!userEmail) {
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

		User.findOne(
			{
				email: email
			},
			(err, user: IUser) => {
				if (err) {
					console.log(err);
					return res.send({
						success: false,
						message: 'Error: server error'
					});
				}

				if (!user.validPassword(password)) {
					return res.send({
						success: false,
						message: 'Error: Invalid'
					});
				}

				user.lastLogin = new Date();
				user.save((err, user) => {
					const userSession = new UserSession();
					userSession.userId = user._id;

					userSession.save((err, doc) => {
						if (err) {
							console.log(err);
							return res.send({
								success: false,
								message: 'Error: server error'
							});
						}
						return res.send({
							success: true,
							message: 'Valid sign in',
							token: doc._id
						});
					});
				});
			}
		);
	});

	// Verify User
	app.get(`/api/${serviceName}/user/verify`, (req, res, next) => {
		const { query } = req;
		const { token } = query;

		UserSession.find(
			{
				_id: token,
				isDeleted: false
			},
			(err, sessions) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false,
						message: 'Error: Server error'
					});
				}

				if (sessions.length != 1) {
					return res.send({
						success: false,
						message: 'Error: Invalid'
					});
				} else {
					return res.send({
						success: true,
						message: 'Verification successful'
					});
				}
			}
		);
	});

	// Log-Out User
	app.get(`/api/${serviceName}/user/logout`, (req, res, next) => {
		const { query } = req;
		const { token } = query;

		UserSession.findOneAndUpdate(
			{
				_id: token,
				isDeleted: false
			},
			{
				$set: {
					isDeleted: true
				}
			},
			(err, session) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false,
						message: 'Error: Server error'
					});
				}

				return res.send({
					success: true,
					message: 'Logout successful'
				});
			}
		);
	});

	// Get user by Token
	app.get(`/api/${serviceName}/user/`, (req, res, next) => {
		const { query } = req;

		UserSession.findById(query.id, (err, data: any) => {
			User.findById(data.userId, (err, user: any) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false
					});
				}

				return res.send({
					success: true,
					data: {
						user
					}
				});
			});
		});
	});

	// Get User-Data by id
	app.get(`/api/${serviceName}/user/:id`, (req, res, next) => {
		User.find(
			{
				_id: req.params.id
			},
			(err, user: any) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false
					});
				}

				return res.send({
					success: true,
					user
				});
			}
		);
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
