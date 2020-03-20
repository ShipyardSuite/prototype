'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Container, Menu, Segment, Grid, Header, Tab } from 'semantic-ui-react';

import {
	ProjectInfoView,
	ProjectPlayerView,
	MassageOfTheDayView,
	ProjectAssetView
} from './../../../components/Dashboard';

class ProjectView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			activeIndex: 0,
			project: [],
			projectToken: ''
		};
	}

	componentDidMount() {
		this.getProjectInfo();
	}

	getProjectInfo() {
		fetch(`/api/Prototype/project/${this.props.match.params.id}`).then((res) => res.json()).then((json) => {
			if (json.success) {
				this.setState({ project: json.project, isLoading: false }, () => {});
			}
		});
	}

	handleTabChange(e, { activeIndex }) {
		this.setState({ activeIndex });
	}

	render() {
		const { isLoading, project, activeIndex } = this.state;

		return (
			<Container className="content">
				<Menu pointing secondary>
					<Menu.Item as={NavLink} exact to="/dashboard">
						Dashboard
					</Menu.Item>
				</Menu>
				<Segment basic loading={isLoading}>
					<Header as="h2">
						{project.title}
						<Header.Subheader>({project._id})</Header.Subheader>
					</Header>
					{isLoading === false && (
						<Tab
							onTabChange={this.handleTabChange.bind(this)}
							activeIndex={activeIndex}
							menu={{ secondary: true }}
							panes={[
								{
									menuItem: 'Overview',
									render: () => (
										<Tab.Pane attached={false} basic>
											<ProjectInfoView projectId={project._id} />
										</Tab.Pane>
									)
								},
								{
									menuItem: 'Players',
									render: () => (
										<Tab.Pane attached={false} basic>
											<ProjectPlayerView projectId={project._id} />
										</Tab.Pane>
									)
								},
								{
									menuItem: 'Message Of The Day',
									render: () => (
										<Tab.Pane attached={false} basic>
											<MassageOfTheDayView projectId={project._id} />
										</Tab.Pane>
									)
								},
								{
									menuItem: 'Assets',
									render: () => (
										<Tab.Pane attached={false} basic>
											<ProjectAssetView projectId={project._id} />
										</Tab.Pane>
									)
								},
								{
									menuItem: 'Settings',
									render: () => (
										<Tab.Pane attached={false} basic>
											<p>Settings...</p>
										</Tab.Pane>
									)
								}
							]}
						/>
					)}
				</Segment>
			</Container>
		);
	}
}

export default withRouter(ProjectView);
