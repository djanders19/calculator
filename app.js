class Model {
	constructor() {

	}

}

class View {
	constructor() {
		this.calcBody = document.querySelector(".controls-grid")

		// Start by adding the screen:
		this.screen = document.createElement("div");
		this.screen.classList.add("screen");
		this.calcBody.append(this.screen);

		// Now add all the buttons:
		this.keys = [['Clear', 'Clear', 'Delete', 'Delete'],
		['7', '8', '9', '/'],
		['4', '5', '6', 'X'],
		['1', '2', '3', '-'],
		['.', '0', '=', '+']]

		for (let r = 0; r < 5; r++) {
			for (let c = 0; c < 4; c++) {
				let key = document.createElement("button");
				key.classList.add("key");
				key.textContent = this.keys[r][c];
				this.calcBody.append(key);
			}
		}
	}


}

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}
}


const app = new Controller(new Model(), new View());