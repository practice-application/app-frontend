import React from 'react';

import { Skeleton } from '@material-ui/core';
import Box from '@material-ui/core/Box';

export const Outline = ({ variant, visible }) => {

	if (!visible) {
		return <></>;
	}

	switch (variant) {
		case "page":
			return <WaitSkeleton visible={visible} />;
		case "list":
			return <ListOutline visible={visible} />;
		case "graph":
			return <GraphOutline visible={visible} />;
		default:
			return <WaitSkeleton visible={visible} />;
	}
};

export const WaitSkeleton = () => {

	return (
		<Box sx={{ padding: 4 }}>
			<Skeleton height="5rem" />
			<Skeleton variant="rect" height="20rem" />
			<Skeleton height="5rem" />
		</Box>
	);
};

export const ListOutline = ({ visible }) => {
	if (!visible) {
		return <></>;
	}
	return (
		<Box sx={{ margin: 1, borderRadius: 0.5 }} data-cy="customers-list-placeholder">
			<Skeleton variant="rect" height={4} />
			<Skeleton variant="rect" height={4} />
			<Skeleton variant="rect" height={4} />
			<Skeleton variant="rect" height={4} />
			<Skeleton variant="rect" height={4} />
			<Skeleton variant="rect" height={4} />
			<Skeleton variant="rect" height={4} />
			<Skeleton variant="rect" height={4} />
			<Skeleton variant="rect" height={4} />
		</Box>
	);
};

export const GraphOutline = ({ visible }) => {

	if (!visible) {
		return <></>;
	}
	return (
		<Box sx={{ margin: 1, borderRadius: 0.5 }} display="flex" justifyContent="center" alignItems="flex-end"  >
			<Skeleton variant="rect" height={5} width={3} />
			<Skeleton variant="rect" height={10} width={3} />
			<Skeleton variant="rect" height={15} width={3} />
			<Skeleton variant="rect" height={20} width={3} />
			<Skeleton variant="rect" height={25} width={3} />
			<Skeleton variant="rect" height={20} width={3} />
			<Skeleton variant="rect" height={15} width={3} />
			<Skeleton variant="rect" height={5} width={3} />
		</Box>
	)
}
