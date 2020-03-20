'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Segment, Grid, Header, Message, Icon } from 'semantic-ui-react';

class PlayerView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isInitializing: true,
			isLoading: true,
			player: []
		};
	}

	componentDidMount() {
		this.intervalID = setInterval(() => this.getPlayerInfo(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	getPlayerInfo() {
		const { playerId } = this.props;

		if (playerId) {
			fetch(`/api/Prototype/player/${playerId}`).then((res) => res.json()).then((json) => {
				if (json.success) {
					this.setState({ isInitializing: false, isLoading: false, player: json.data });
				}
			});
		}
	}

	getIfPlayerOnline() {
		const { player } = this.state;
		const lastUpdateTime = Math.round(new Date(player.lastUpdate).getTime() / 1000);
		const currentTime = Math.round(new Date().getTime() / 1000);

		if (currentTime - lastUpdateTime < 5) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const { playerId } = this.props;
		const { isInitializing, isLoading, player } = this.state;

		return (
			<Segment loading={isLoading} color={this.getIfPlayerOnline() ? 'green' : 'red'}>
				<Header as="h3" icon="user" content={player.name} subheader={player._id} />
			</Segment>
		);
	}
}

export default withRouter(PlayerView);
