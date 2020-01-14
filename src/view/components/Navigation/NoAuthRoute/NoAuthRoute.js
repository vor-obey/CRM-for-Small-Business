import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Helpers from '../../../js/helpers';

import Header from '../../common/header/Header';

class NoAuthRoute extends Component {

    constructor(props) {
        super(props);
        Logger.init(this, 'NoAuthRoute');

    }

    render() {
        const { component: InnerComponent, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props => (
                    Helpers.isAuthenticated()
                        ? <Redirect to={config.defaultUrls.authenticated} />
                        : <div className="app-view"><Header authenticated={false} /><InnerComponent {...props} /></div>
                )}
            />
        );
    }
}

export default withRouter(NoAuthRoute);
