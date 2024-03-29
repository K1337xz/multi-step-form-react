import React from "react";
import Finishpage from "../components/Finishpage";
import SideBar from "../components/SideBar";
import Thankyoupage from "../components/Thankyoupage";
import { useNavigate } from "react-router-dom";

export default function Summary() {
	const navigate = useNavigate();
	const [isShownFinal, setIsShownFinal] = React.useState(false);
	const [isShownFinish, setIsShownFinish] = React.useState(true);
	const [formData, setFormData] = React.useState({
		plan: "",
		billing: "",
		onlinePlan: false,
		largerPlan: false,
		profilePlan: false,
	});

	const handleClick = (event) => {
		setIsShownFinal((current) => !current);
		setIsShownFinish((current) => !current);
	};

	React.useEffect(() => {
		const items = JSON.parse(localStorage.getItem("name"));
		const addons = JSON.parse(localStorage.getItem("addons"));
		setFormData((prev) => {
			return {
				plan: items.selectedPlan,
				billing: items.monthly,
				planPrice: items.planPrice,
				onlinePlan: addons.online,
				largerPlan: addons.storage,
				profilePlan: addons.profile,
				onlinePrice: addons.onlinePrice,
				profilePrice: addons.profilePrice,
				storagePrice: addons.storagePrice,
			};
		});
	}, []);

	React.useEffect(() => {
		if (isShownFinal) {
			const timer = setTimeout(() => {
				localStorage.removeItem("name");
				localStorage.removeItem("addons");
				navigate("/multi-step-form-react");
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isShownFinal]);

	function goBack() {
		navigate("/multi-step-form-react/addons");
	}

	let totalPriceM =
		formData.storagePrice +
		formData.profilePrice +
		formData.onlinePrice +
		formData.planPrice;
	return (
		<>
			<SideBar
				stepNumber="stepNumber"
				first="step"
				second="step"
				third="step"
				fourth="step active"
			/>
			{isShownFinish && (
				<div className="rightContent">
					<h1>Finish up</h1>
					<p>Double check everything looks OK before confirming</p>
					<Finishpage
						selectedPlan={formData.plan}
						bilingPlan={formData.billing ? "Yearly" : "Monthly"}
						price={`$${formData.planPrice}/${
							formData.billing ? "yr" : "mo"
						}`}
						online={formData.onlinePlan ? "Online service" : ""}
						onlinePrice={
							formData.onlinePlan
								? `+$${formData.onlinePrice}/${
										formData.billing ? "yr" : "mo"
								  }`
								: ""
						}
						storagePrice={
							formData.largerPlan
								? `+$${formData.storagePrice}/${
										formData.billing ? "yr" : "mo"
								  }`
								: ""
						}
						profilePrice={
							formData.profilePlan
								? `+$${formData.profilePrice}/${
										formData.billing ? "yr" : "mo"
								  }`
								: ""
						}
						storage={formData.largerPlan ? "Larger storage" : ""}
						profile={
							formData.profilePlan ? "Customizable profile" : ""
						}
						totalBIlling={
							formData.billing ? "(per year)" : "(per month)"
						}
						totalPrice={`+$${totalPriceM}/${
							formData.billing ? "yr" : "mo"
						}`}
					/>
					<div className="lowerButtons">
						<button className="prevStp" onClick={goBack}>
							Go back!
						</button>
						<button className="confirm" onClick={handleClick}>
							Confirm
						</button>
					</div>
				</div>
			)}
			{isShownFinal && <Thankyoupage />}
		</>
	);
}
