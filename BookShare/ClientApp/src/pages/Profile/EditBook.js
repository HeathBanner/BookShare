import React from 'react';
import Landing from '../../pages/Post/index';

export default ({ match }) => <Landing editId={match.params.id} />;