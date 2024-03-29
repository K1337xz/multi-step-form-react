import React from "react";
import SideBar from "../components/SideBar";
import Addonsinp from "../components/Addonsinp";
import { useNavigate } from "react-router-dom";

export default function Addons() {
	const navigate = useNavigate();
	const [bla, setBla] = React.useState({
		online: false,
		storage: false,
		profile: false,
	});
	const [biling, setBiling] = React.useState();
	const [isChecked, setIsChecked] = React.useState({
		online: false,
		storage: false,
		profile: false,
		onlinePrice: 0,
		storagePrice: 0,
		profilePrice: 0,
	});

	React.useEffect(() => {
		const items = JSON.parse(localStorage.getItem("name"));
		setBiling(items.monthly);
		if (isChecked.onlinePrice > 0 && items.monthly) {
			setIsChecked((prev) => {
				return {
					...prev,
					onlinePrice: 10,
				};
			});
			localStorage.setItem("addons", JSON.stringify(isChecked));
		}
		if (isChecked.storagePrice > 0 && items.monthly) {
			setIsChecked((prev) => {
				return {
					...prev,
					storagePrice: 20,
				};
			});

			localStorage.setItem("addons", JSON.stringify(isChecked));
		}
		if (isChecked.profilePrice > 0 && items.monthly) {
			setIsChecked((prev) => {
				return {
					...prev,
					profilePrice: 20,
				};
			});

			localStorage.setItem("addons", JSON.stringify(isChecked));
		}
	}, [bla]);

	React.useEffect(() => {
		localStorage.setItem("addons", JSON.stringify(isChecked));
	}, [isChecked]);

	function toggleChange(e) {
		let id = e.currentTarget.id;
		if (id === `onlineSerivces`) {
			setIsChecked((prev) => {
				return {
					...prev,
					online: !prev.online,
					onlinePrice: 1,
				};
			});
			setBla((prev) => {
				return {
					...prev,
					online: true,
				};
			});
		}
		if (id === `largerStorage`) {
			setIsChecked((prev) => {
				return {
					...prev,
					storage: !prev.storage,
					storagePrice: 2,
				};
			});
			setBla((prev) => {
				return {
					...prev,
					storage: true,
				};
			});
		}
		if (id === `customProfile`) {
			setIsChecked((prev) => {
				return {
					...prev,
					profile: !prev.profile,
					profilePrice: 2,
				};
			});
			setBla((prev) => {
				return {
					...prev,
					profile: true,
				};
			});
		}
	}

	function goBackButton() {
		navigate("/multi-step-form-react/select");
	}

	function nextStp() {
		navigate("/multi-step-form-react/summary");
	}

	return (
		<>
			<SideBar
				stepNumber="stepNumber"
				first="step"
				second="step"
				third="step active"
				fourth="step"
			/>
			<div className="rightContent">
				<h1>Pick add-ons</h1>
				<p>Add-ons help enhance your gaming experience</p>
				<div className="addonsWrapper">
					<div className="formAddons">
						<Addonsinp
							addonName="Online Services"
							addonDescribe="Access to multiplayer games"
							addonPrice={biling ? "+$10/yr" : "+$1/mo"}
							for="onlineSerivces"
							toggleChange={(e) => toggleChange(e)}
							checked={isChecked}
							classChecked={isChecked.online ? "checked" : ""}
							addonsClass={
								isChecked.online ? "addons checked" : "addons"
							}
						/>
						<Addonsinp
							addonName="Larger storage"
							addonDescribe="Extra 1TB of cloud save"
							addonPrice={biling ? "+$20/yr" : "+$2/mo"}
							for="largerStorage"
							toggleChange={(e) => toggleChange(e)}
							checked={isChecked}
							classChecked={isChecked.storage ? "checked" : ""}
							addonsClass={
								isChecked.storage ? "addons checked" : "addons"
							}
						/>
						<Addonsinp
							addonName="Customizable profile"
							addonDescribe="Custom theme on your profile"
							addonPrice={biling ? "+$20/yr" : "+$2/mo"}
							for="customProfile"
							toggleChange={(e) => toggleChange(e)}
							checked={isChecked}
							classChecked={isChecked.profile ? "checked" : ""}
							addonsClass={
								isChecked.profile ? "addons checked" : "addons"
							}
						/>
					</div>
					<div className="lowerButtons">
						<button className="prevStp" onClick={goBackButton}>
							Go back!
						</button>
						<button className="nextStp" onClick={nextStp}>
							Next Step
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
