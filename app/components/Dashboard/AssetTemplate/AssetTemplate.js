'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Segment, Input, Form, Button, Label, Select } from 'semantic-ui-react';

class AssetTemplate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			variables: []
		};
	}

	componentDidMount() {}

	addRow() {
		this.setState({
			variables: [
				...this.state.variables,
				{
					name: '',
					type: 'String'
				}
			]
		});
	}

	render() {
		const { variables } = this.state;

		console.log(variables);

		const options = [
			{ key: 'string', text: 'String', value: 'string' },
			{ key: 'bool', text: 'Bool', value: 'bool' },
			{ key: 'float', text: 'Float', value: 'float' },
			{ key: 'int', text: 'Int', value: 'int' }
		];

		return (
			<Segment.Group>
				<Segment>
					<Form>
						<Form.Field>
							<Input placeholder="Template Name" />
						</Form.Field>
					</Form>
				</Segment>
				<Segment>
					<Form>
						<Form.Field>
							<Input label="Number" labelPosition="right" readOnly value="identifier" />
						</Form.Field>
						<Form.Field>
							<Input label="String" labelPosition="right" readOnly value="name" />
						</Form.Field>
						{variables &&
							variables.map((variable, i) => {
								return (
									<Form.Field key={i}>
										<Input type="text" placeholder="Search..." action>
											<input />
											<Select compact options={options} defaultValue="string" />
											<Button type="submit">✕</Button>
										</Input>
									</Form.Field>
								);
							})}
						<Button fluid onClick={this.addRow.bind(this)}>
							➕
						</Button>
						<br />
						<Button primary fluid onClick={this.addRow.bind(this)}>
							Save Template
						</Button>
					</Form>
				</Segment>
			</Segment.Group>
		);
	}
}

export default withRouter(AssetTemplate);
