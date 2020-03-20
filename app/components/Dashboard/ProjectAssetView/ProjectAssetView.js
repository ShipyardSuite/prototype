'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

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

import AssetTemplate from '../AssetTemplate/AssetTemplate';

class ProjectAssetView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeIndex: 0,
			newAssetName: '',
			newAssetId: '',
			isLoading: true,
			assets: {}
		};
	}

	componentDidMount() {
		this.getAssets();
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleTabChange(e, { activeIndex }) {
		this.setState({ activeIndex });
	}

	createAsset() {
		const { projectId } = this.props;
		const { newAssetName, newAssetId } = this.state;

		fetch(`/api/Prototype/project/${projectId}/asset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				projectId: projectId,
				name: newAssetName,
				identifier: newAssetId
			})
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.success) {
					if (json.success) {
						this.setState(
							{
								newAssetName: '',
								newAssetId: ''
							},
							() => {
								this.getAssets();
							}
						);
					}
				} else {
					console.log(json.message);
				}
			});
	}

	getAssets() {
		const { projectId } = this.props;
		fetch(`/api/Prototype/project/${projectId}/assets`).then((res) => res.json()).then((json) => {
			if (json.success) {
				this.setState({ isLoading: false, assets: json.data, activeIndex: 0 });
			}
		});
	}

	render() {
		const { assets, isLoading, activeIndex, newAssetName, newAssetId } = this.state;

		return (
			<div>
				<Header as="h3">Assets</Header>
				<Tab
					menu={{ secondary: true }}
					activeIndex={activeIndex}
					onTabChange={this.handleTabChange.bind(this)}
					panes={[
						{
							menuItem: 'Assets',
							render: () => (
								<Tab.Pane loading={isLoading} attached={false} basic>
									{assets.length > 0 ? (
										<div>
											{assets.map((asset, i) => {
												return <div key={i}>{asset.identifier}</div>;
											})}
										</div>
									) : (
										<Message icon="info" info content="No Assets yet." />
									)}
								</Tab.Pane>
							)
						},
						{
							menuItem: 'Create Asset',
							render: () => (
								<Tab.Pane attached={false} basic>
									<Form>
										<Form.Field>
											<label>Name</label>
											<Input
												placeholder="Asset Name"
												value={newAssetName}
												name="newAssetName"
												onChange={this.handleInputChange.bind(this)}
											/>
										</Form.Field>
										<Form.Field>
											<Input
												placeholder="Asset Identifier"
												value={newAssetId}
												name="newAssetId"
												onChange={this.handleInputChange.bind(this)}
											/>
										</Form.Field>
										<Button onClick={this.createAsset.bind(this)}>Create Asset</Button>
									</Form>
								</Tab.Pane>
							)
						},
						{
							menuItem: 'Asset Templates',
							render: () => (
								<Tab.Pane attached={false} basic>
									<h3>Create Template</h3>
									<AssetTemplate />
								</Tab.Pane>
							)
						}
					]}
				/>
			</div>
		);
	}
}

export default withRouter(ProjectAssetView);
