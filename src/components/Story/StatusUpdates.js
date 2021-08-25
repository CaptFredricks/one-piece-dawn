import React, { Component } from 'react';

class StatusUpdates extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			turn: props.output[0][0],
			output: props.output[0][1]
		};
		
		this.output = props.output;
		this.i = 0;
		this.j = 2;
	}
	
	componentDidMount() {
		console.log(this.output); // Log the output in the console
		this.interval = setInterval(() => {
			if(this.i < this.output.length) {
				if(this.j < this.output[this.i].length) {
					this.setState({ turn: this.output[this.i][0], output: this.output[this.i][this.j] });
					this.j++;
				} else {
					this.i++;
					this.j = 1;
				}
			} else {
				this.setState({ turn: null, output: this.output[this.output.length - 1][0] });
				clearInterval(this.interval);
			}
		}, 5000);
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	render() {
		return (
			<div className="status-updates">
				<div className="turn">
					{this.state.turn}
				</div>
				<div className="output">
					{this.state.output}
				</div>
			</div>
		);
	}
}

export default StatusUpdates;