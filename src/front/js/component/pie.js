import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";

export const PieGraph = props => {
	const data = {
		labels: props.labels,
		datasets: [
			{
				label: "Expenses",
				data: props.datos,
				backgroundColor: props.colors,
				borderColor: props.colors,
				borderWidth: 1
			}
		]
	};
	return (
		<div className="row mt-3 ">
			<div className="col graficos">
				<Pie data={data} height={props.height} width={200} />
			</div>
		</div>
	);
};

PieGraph.propTypes = {
	datos: PropTypes.any,
	labels: PropTypes.any,
	colors: PropTypes.any,
	height: PropTypes.integer
};
