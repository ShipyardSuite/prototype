'use strict';

import React, { Component } from 'react';

import { DBFetcher } from '@shipyardsuite/base-layout';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<DBFetcher url="/api/Prototype/test" />
			</div>
		);
	}
}

export default Home;
