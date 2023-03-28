const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const lastNameInput = document.querySelector("#last-name");
const birthDate = document.querySelector("#birth-date");
const socialNumber = document.querySelector("#social-number");
const modalElement = document.querySelector("#modal");
const closeElement = document.querySelector("#close");

const sendDatatoLocalStorage = () => {
	const personalInfo = JSON.stringify({
		name: nameInput.value,
		lastName: lastNameInput.value,
		socialNumber: socialNumber.value,
		birthDate: birthDate.value,
	});
	localStorage.setItem(socialNumber.value, personalInfo);
};

const nameAndLastNameValidation = () => {
	if (nameInput.value.length !== 20 || lastNameInput.value.length !== 30) {
		alert(
			"Name must contains at least 20 characters and Last Name must contains at least 30 characters!"
		);
	} else {
		sendDatatoLocalStorage();
		modalElement.classList.remove("modal-invisible");
		modalElement.classList.add("modal-visible");
		form.reset();
	}
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	nameAndLastNameValidation();
});

closeElement.addEventListener("click", () => {
	modalElement.classList.remove("modal-visible");
	modalElement.classList.add("modal-invisible");
});

const setYear = (event) => {
	let year = event.target.value.slice(0, 2);
	if (year <= 10) {
		year = 20 + year;
	} else {
		year = 19 + year;
	}
	return year;
};

const setMonth = (event, year) => {
	let month = event.target.value.slice(2, 4);
	month = Number(month);
	if (year > 1999 && month > 20) {
		month = month - 20;
		if (month < 10) {
			month = "0" + month;
		}
	} else if (month < 10) {
		month = "0" + month;
	} else if (year > 1999 && month < 21) {
		alert(
			"You passed a wrong social number. If you were born after 1999 you must add number 20 to the month of your birth."
		);
	} else if (year < 1999 && month > 12) {
		alert(
			"You passed a wrong social number. If you were born before 1999 your month of birth can not be higher then 12."
		);
	}
	return month;
};

const setDay = (event) => {
	const day = event.target.value.slice(4, 6);
	return day;
};

const fillUpBirthDateFromSocialNumber = (event) => {
	setYear(event);

	setMonth(event, setYear(event));

	setDay(event);
	birthDate.value = `${
		setYear(event) + "-" + setMonth(event, setYear(event)) + "-" + setDay(event)
	}`;
};

socialNumber.addEventListener("change", fillUpBirthDateFromSocialNumber);
