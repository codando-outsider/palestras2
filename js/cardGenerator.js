// Build HTML fetching info from cardInfo.js
function generateEvent(container, date, title, tags, summary, eventLink, recordingLink) {
	var cardSection = document.createElement("div");
	cardSection.classList.add("card-section");

	var hiddenDate = document.createElement("input");
	hiddenDate.setAttribute("type", "hidden");
	hiddenDate.setAttribute("value", date);
	cardSection.appendChild(hiddenDate);

	var cardDate = document.createElement("div");
	cardDate.classList.add("card-date");

	var dateDay = document.createElement("div");
	dateDay.classList.add("card-day");
	dateDay.textContent = date.split("-")[2];
	var dateMonth = document.createElement("div");
	dateMonth.classList.add("card-month");
	dateMonth.textContent = date.split("-")[1];
	cardDate.appendChild(dateDay);
	cardDate.appendChild(dateMonth);

	var cardMain = document.createElement("div");
	cardMain.classList.add("card-main");

	var animRight = document.createElement("span");
	animRight.classList.add("animRight")
	var animDown = document.createElement("span");
	animDown.classList.add("animDown")
	var animLeft = document.createElement("span");
	animLeft.classList.add("animLeft")
	var animUp = document.createElement("span");
	animUp.classList.add("animUp")
	cardMain.appendChild(animRight);
	cardMain.appendChild(animDown);
	cardMain.appendChild(animLeft);
	cardMain.appendChild(animUp);

	var cardInfo = document.createElement("div");
	cardInfo.classList.add("card-block", "card-info");

	var cardTitle = document.createElement("div");
	cardTitle.classList.add("card-title");
	var titleText = document.createElement("h3");
	titleText.textContent = title;
	cardTitle.appendChild(titleText);
	var cardTags = document.createElement("div");
	cardTags.classList.add("card-tags");
	/*cardTags.textContent = tags;*/

		// Dummy tags
		var cardTag1 = document.createElement("div");
		cardTag1.classList.add("tag", "codando");
		cardTag1.textContent = "Codando";
		var cardTag2 = document.createElement("div");
		cardTag2.classList.add("tag", "negociando");
		cardTag2.textContent = "Negociando";
		cardTags.appendChild(cardTag1);
		cardTags.appendChild(cardTag2);

	cardInfo.appendChild(cardTitle);
	cardInfo.appendChild(cardTags);

	var cardAside = document.createElement("div");
	cardAside.classList.add("card-block", "card-aside");

	var guestPortrait = document.createElement("div");
	guestPortrait.classList.add("portrait");

	// Normalize vowels
	function removeDiacritics(str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	// Set portrait image path by matching filename with guest's name and surname extracted from the card summary
	// E.g. "John Doe, renowned professor at..." => Path must be "img/portrait/john_doe"
	// Extension must be .JPEG
	var guestName = summary.split(/[ ,]/).slice(0, 2).join("_");
	guestName = removeDiacritics(guestName).toLowerCase();
	var portraitSrc = ("url(img/portrait/") + guestName + (".jpeg");
	guestPortrait.style.backgroundImage = portraitSrc;

	var linkButton = document.createElement("a");
	var eventDate = new Date(date).setUTCHours(0, 0, 0, 0);
	var currentDate = new Date().setUTCHours(0, 0, 0, 0);

	if (eventDate >= currentDate) {
		linkButton.classList.add("card-button", "button-event");
		linkButton.href = eventLink;
		linkButton.textContent = "Acessar";
	} else {
		linkButton.classList.add("card-button", "button-recording");
		linkButton.href = recordingLink;
		linkButton.textContent = "Gravação";
	}

	cardAside.appendChild(guestPortrait);
	cardAside.appendChild(linkButton);

	var cardSummary = document.createElement("details");
	cardSummary.classList.add("card-block", "card-summary");

	var summaryHeader = document.createElement("summary");

	var summaryHeaderText = document.createElement("span");
	summaryHeaderText.textContent = "Descrição";

	var summaryContainer = document.createElement("div");
	var summaryText = document.createElement("p");
	summaryText.classList.add("summary-text");
	summaryText.textContent = summary;

	summaryHeader.appendChild(summaryHeaderText);
	summaryContainer.appendChild(summaryText);
	cardSummary.appendChild(summaryHeader);
	cardSummary.appendChild(summaryContainer);

	cardMain.appendChild(cardInfo);
	cardMain.appendChild(cardAside);
	cardMain.appendChild(cardSummary);

	if (eventDate < currentDate) {
		cardSection.classList.add("finished-event");
	} else if (eventDate === currentDate) {
		cardMain.classList.add("current-event");
	}

	cardSection.appendChild(cardDate);
	cardSection.appendChild(cardMain);

	insertEventsInOrder(container, cardSection, eventDate);
}

// Order events chronologically, highest at the top
function insertEventsInOrder(container, newEvent) {
	var events = container.querySelectorAll(".card-section");

	if (events.length === 0) {
		container.appendChild(newEvent);
		return;
	}

	var newEventDate = new Date(newEvent.querySelector("input[type='hidden']").value);

	for (var i = events.length - 1; i >= 0; i--) {
		var currentEvent = events[i];
		var currentEventDate = new Date(currentEvent.querySelector("input[type='hidden']").value);

		if (newEventDate < currentEventDate) {
			container.insertBefore(newEvent, currentEvent.nextSibling);
			return;
		}
	}

	container.insertBefore(newEvent, container.firstChild);
}
