'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

import {
	Segment,
	Grid,
	Header,
	Message,
	Image,
	Form,
	Button,
	Input,
	TextArea,
	Tab,
	Menu,
	Label
} from 'semantic-ui-react';

class MassageOfTheDayView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeIndex: 0,
			isLoading: true,
			messages: [],
			newMessageTitle: '',
			newMessageText: '',
			newMessageImage: '',
			newMessageDate: new Date()
		};
	}

	componentDidMount() {
		this.getMessages();
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleDateChange(date) {
		this.setState({ newMessageDate: date });
	}

	createNewMessage() {
		const { newMessageDate, newMessageTitle, newMessageText, newMessageImage } = this.state;
		const { projectId } = this.props;

		fetch(`/api/Prototype/project/${projectId}/messageOfTheDay`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				projectId: projectId,
				title: newMessageTitle,
				text: newMessageText,
				image: newMessageImage,
				date: newMessageDate
			})
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.success) {
					if (json.success) {
						this.setState(
							{
								isLoading: false,
								newMessageTitle: '',
								newMessageText: '',
								newMessageImage: '',
								newMessageDate: new Date()
							},
							() => {
								this.getMessages();
							}
						);
					}
				} else {
					console.log(json.message);
				}
			});
	}

	getMessages() {
		const { projectId } = this.props;
		fetch(`/api/Prototype/project/${projectId}/messageOfTheDay`).then((res) => res.json()).then((json) => {
			if (json.success) {
				this.setState({ isLoading: false, messages: json.data, activeIndex: 0 });
			}
		});
	}

	checkDate(message) {
		const startTime = Math.round(new Date(message.date[0]).getTime() / 1000);
		const endTime = Math.round(new Date(message.date[1]).getTime() / 1000);
		const currentTime = Math.round(new Date().getTime() / 1000);

		if ((currentTime > startTime && currentTime < endTime) || startTime <= currentTime) {
			return true;
		} else {
			return false;
		}
	}

	handleTabChange(e, { activeIndex }) {
		this.setState({ activeIndex });
	}

	render() {
		const {
			isLoading,
			messages,
			newMessageDate,
			newMessageTitle,
			newMessageText,
			newMessageImage,
			activeIndex
		} = this.state;

		return (
			<div>
				<Header as="h3">Message Of The Day</Header>
				<Tab
					activeIndex={activeIndex}
					onTabChange={this.handleTabChange.bind(this)}
					menu={{ secondary: true }}
					panes={[
						{
							menuItem: 'Messages',
							render: () => (
								<Tab.Pane loading={isLoading} attached={false} basic>
									{messages.length > 0 ? (
										<Grid>
											{messages.map((message, i) => {
												return (
													<Grid.Column mobile={16} tablet={16} computer={8} key={i}>
														<Segment.Group>
															<Segment
																color={
																	this.checkDate(message) === true ? 'green' : 'red'
																}
															>
																{message.image && <Image src={message.image} />}
																<Header>{message.title}</Header>
																<p>{message.text}</p>
															</Segment>
															<Segment
																inverted
																color={
																	this.checkDate(message) === true ? 'green' : 'red'
																}
															>
																{message.date[1] ? (
																	<span>
																		from: {moment(message.date[0]).format('l')} to:{' '}
																		{moment(message.date[1]).format('l')}
																	</span>
																) : (
																	<span>
																		on: {moment(message.date[0]).format('l')}
																	</span>
																)}
																<br />
															</Segment>
														</Segment.Group>
													</Grid.Column>
												);
											})}
										</Grid>
									) : (
										<Message icon="info" info content="No Messages yet." />
									)}
								</Tab.Pane>
							)
						},
						{
							menuItem: 'New Message',
							render: () => (
								<Tab.Pane attached={false} basic>
									<Form>
										<Form.Field>
											<label>Title</label>
											<Input
												placeholder="Message Title"
												value={newMessageTitle}
												name="newMessageTitle"
												onChange={this.handleInputChange.bind(this)}
											/>
										</Form.Field>
										<Form.Field>
											<label>Text</label>
											<TextArea
												placeholder="Text"
												value={newMessageText}
												name="newMessageText"
												onChange={this.handleInputChange.bind(this)}
											/>
										</Form.Field>
										<Form.Field>
											<label>Image URL</label>
											<Input
												placeholder="Image URL"
												value={newMessageImage}
												name="newMessageImage"
												onChange={this.handleInputChange.bind(this)}
											/>
										</Form.Field>
										<Form.Field>
											<label>Date</label>
											<Calendar
												minDate={new Date()}
												selectRange={true}
												onChange={this.handleDateChange.bind(this)}
												value={newMessageDate}
											/>
										</Form.Field>
										<Button onClick={this.createNewMessage.bind(this)}>Create Message</Button>
									</Form>
								</Tab.Pane>
							)
						}
					]}
				/>
			</div>
		);
	}
}

export default withRouter(MassageOfTheDayView);
