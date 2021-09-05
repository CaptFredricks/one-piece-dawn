const StatusUpdates = (props) => {
	return (
		<div className="status-updates">
			<div className="turn">
				{props.turn}
			</div>
			<div className="output">
				{props.output}
			</div>
		</div>
	);
}

export default StatusUpdates;