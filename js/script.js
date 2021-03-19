function list() {
	const listValue = document.querySelector(".add input");
	const btnAdd = document.querySelector(".add button");
	const select = document.querySelector("select");

	btnAdd.addEventListener("click", add);
	listValue.addEventListener("keyup", (e) => (e.keyCode == 13 ? add() : false));
	document.addEventListener("click", (e) => removeAndCompleted(e));
	select.addEventListener("click", (e) => fillter(e));

	const removeAndCompleted = (e) => {
		let target = e.target;
		if (target.classList.contains("remove")) {
			clickEffect(target);
			removeList(target);
			listValue.focus();
		} else if (target.classList.contains("done")) {
			clickEffect(target);
			doneList(target);
			listValue.focus();
		}
	};

	const fillter = (e) => {
		const todos = document.querySelectorAll(".list");
		todos.forEach((todo) => {
			switch (e.target.value) {
				case "all":
					todo.style.display = "flex";
					break;
				case "completed":
					todo.classList.contains("completed") ? (todo.style.display = "flex") : (todo.style.display = "none");
					break;
				case "uncompleted":
					!todo.classList.contains("completed") ? (todo.style.display = "flex") : (todo.style.display = "none");
					break;
			}
		});
	};

	function add() {
		if (listValue.value == "") return;
		createList();
		listValue.setAttribute("placeholder", "What next ?");
		listValue.value = "";
		listValue.focus();
	}

	const createList = () => {
		const listContainer = document.querySelector(".list-container");
		const div = document.createElement("div");
		div.classList.add("list", "loading");
		div.innerHTML = listElement();
		listContainer.appendChild(div);
		setTimeout(() => div.classList.remove("loading"), 600);
	};

	const removeList = (target) => {
		const list = target.parentElement.parentElement;
		list.classList.add("removed");
		list.classList.remove("completed");
		setTimeout(() => list.remove(), 600);
	};

	const doneList = (target) => {
		const list = target.parentElement.parentElement;
		list.classList.toggle("completed");
	};

	const listElement = () => {
		return `<p>${listValue.value}</p>
        <div class="button">
            <button class="done"><i class="fas fa-check"></i></button>
            <button class="remove"><i class="fas fa-trash"></i></button>
        </div>`;
	};

	const clickEffect = (target) => {
		target.style.opacity = ".7";
		setTimeout(() => (target.style.opacity = "1"), 100);
	};
}

list();
