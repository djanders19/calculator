class Model {
	constructor() {
		this.currValue = '';  // value to display/last value calculated
		this.lhs = '';  // Left-hand-side of expression
		this.rhs = '';  // right-hand-side of expression
		this.op = ''  // operation to perform on values
	}

	/**
	 * @param {string} val
	 */
	set setlhs(val) {
		this.lhs = val;
	}

	/**
	* @param {string} val
	*/
	set setrhs(val) {
		this.rhs = val;
	}

	/**
	* @param {string} val
	*/
	set setop(val) {
		this.rhs = val;
	}

	eval() {
		if (this.lhs) {
			if (this.rhs) {
				if (this.op) {
					switch (this.op) {
						case '+':
							this.currValue = parseFloat(this.lhs) + parseFloat(this.rhs);
							this.clear();
							this.lhs = this.currValue;
							return this.currValue;
						case '-':
							this.currValue = parseFloat(this.lhs) - parseFloat(this.rhs);
							this.clear();
							this.lhs = this.currValue;
							return this.currValue;
						case '/':
							this.currValue = parseFloat(this.lhs) / parseFloat(this.rhs);
							this.clear();
							this.lhs = this.currValue;
							return this.currValue;
						case '*':
							this.currValue = parseFloat(this.lhs) * parseFloat(this.rhs);
							this.clear();
							this.lhs = this.currValue;
							return this.currValue;
						default:
							throw new Error('Error: unrecognized operation.')
					}
				}
				throw new Error('No op literal!')
			}
			throw new Error('No RHS literal!')
		}
		throw new Error('No LHS literal!')
	}

	clear() {
		this.lhs = '';
		this.rhs = '';
		this.op = '';
	}

	allClear() {
		this.clear();
		this.currValue = '';
	}

	toString() {

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
		this.keys = [['Clear', 'Clear', 'allClear', 'allClear'],
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
		this.nonNumerics = ["-", "=", "+", "*", "/", "Clear", "allClear"];
	}

	handleKey(val) {
		if (this.nonNumerics.includes(val)) {
			switch (val) {
				case 'Clear':
					this.model.clear();
					break;
				case 'Delete':
					this.model.allClear();
					break;
				case '=':
					this.view.display(this.model.eval());
					break;
				default:
					this.model.setop = val;
					break;
			}
		}
	}
}


const app = new Controller(new Model(), new View());