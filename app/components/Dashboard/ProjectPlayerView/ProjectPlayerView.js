'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Segment, Grid, Header, Message } from 'semantic-ui-react';

import { PlayerView } from './../index';

class ProjectPlayerView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			players: []
		};
	}

	componentDidMount() {
		this.intervalID = setInterval(() => this.getProjectInfo(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	getProjectInfo() {
		const { projectId } = this.props;

		fetch(`/api/Prototype/project/${projectId}`).then((res) => res.json()).then((json) => {
			if (json.success) {
				this.setState({ players: json.project.players, isLoading: false }, () => {});
			}
		});
	}

	render() {
		const { isLoading, players } = this.state;
		return (
			<div>
				<Header as="h3">Players {players && players.length > 0 ? `(${players.length})` : ''}</Header>
				<Segment basic loading={isLoading}>
					{isLoading === false && (
						<div>
							{players.length > 0 ? (
								<Grid>
									{players.map((player, i) => {
										return (
											<Grid.Column mobile={16} tablet={16} computer={4} key={i}>
												<PlayerView playerId={player} />
											</Grid.Column>
										);
									})}
								</Grid>
							) : (
								<Message icon="info" info content="No Players yet." />
							)}
						</div>
					)}
				</Segment>
			</div>
		);
	}
}

export default withRouter(ProjectPlayerView);
