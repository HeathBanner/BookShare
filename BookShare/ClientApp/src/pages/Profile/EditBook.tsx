import React from 'react';
import Landing from '../Post/index';

export default ({ match }: { match: any }) => <Landing editId={match.params.id} />;