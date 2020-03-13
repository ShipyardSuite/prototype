"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

class UserById extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: []
        };
    }

    componentDidMount() {
        const { userId } = this.props;

        if (userId) {
            fetch(`/api/Prototype/user/${userId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        console.log(data);
                        this.setState({ user: data, idFound: true });
                    }
                });
        }
    }

    render() {
        const { userId } = this.props;
        const { user } = this.state;

        return (
            <NavLink exact to={`/profile/${userId}`}>
                {user.email}
            </NavLink>
        );
    }
}

export default withRouter(UserById);
