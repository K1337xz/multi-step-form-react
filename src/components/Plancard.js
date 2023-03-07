import React from "react";

export default function Plancard(props) {
	const [plan, setPlan] = React.useState({});
	const [formData, setFromData] = React.useState({});
	function toggleClick(e) {
		const allElements = document.querySelectorAll(".card");
		let id = e.currentTarget.id;
		for (let i = 0; i < allElements.length; i++) {
			if (allElements[i].classList.contains("active")) {
				allElements[i].classList.remove("active");
			}
			e.currentTarget.classList.add("active");
		}

		setPlan((prev) => {
			return {
				id: id,
			};
		});
	}
	React.useEffect(() => {
		const items = JSON.parse(localStorage.getItem("name"));
		let planId = plan.id;
		if (!planId) {
			console.log(undefined);
		} else if (planId.length > 0) {
			items.selectedPlan = planId;
			localStorage.setItem("name", JSON.stringify(items));
		}
	}, [plan]);

	return (
		<div
			className="card"
			onClick={(event) => {
				toggleClick(event);
			}}
			id={props.id}
		>
			<div className="cardImage">
				<img src={props.src} className="image" alt={props.altText} />
			</div>
			<div className="cardContent">
				<h2>{props.cardName}</h2>
				<p>{props.cardPrice}</p>
				<span>{props.freeMonths}</span>
			</div>
		</div>
	);
}
