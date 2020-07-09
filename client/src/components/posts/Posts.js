import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';

const Posts = ({ getPost, post: { posts, loading } }) => {
	useEffect(() => {
		getPost();
	}, [getPost]);

	return <div></div>;
};

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPost })(Posts);
