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
		this.checkOp();
		this.op = val;
	}

	/**
	 * @param {string} val
	 */
	get getlhs() {
		return this.lhs;
	}

	/**
	* @param {string} val
	*/
	get getrhs() {
		return this.rhs;
	}

	/**
	* @param {string} val
	*/
	get getop() {
		return this.op;
	}

	eval() {
		if (this.lhs) {
			if (this.rhs) {
				if (this.op) {
					switch (this.op) {
						case '+':
							this.currValue = parseFloat(this.lhs) + parseFloat(this.rhs);
							this.lhs = this.currValue;
							this.rhs = '';
							return this.currValue;
						case '-':
							this.currValue = parseFloat(this.lhs) - parseFloat(this.rhs);
							this.lhs = this.currValue;
							this.rhs = '';
							return this.currValue;
						case '/':
							this.currValue = parseFloat(this.lhs) / parseFloat(this.rhs);
							this.lhs = this.currValue;
							this.rhs = '';
							return this.currValue;
						case 'x':
							this.currValue = parseFloat(this.lhs) * parseFloat(this.rhs);
							this.lhs = this.currValue;
							this.rhs = '';
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

	checkOp() {
		if (this.op && this.rhs) {
			this.eval();
			this.op = '';
		}
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
		this.keys = [['Clear', 'Clear', 'AC', 'AC'],
		['7', '8', '9', '/'],
		['4', '5', '6', 'x'],
		['1', '2', '3', '-'],
		['.', '0', '=', '+']]

		this.keyNodes = [];

		for (let r = 0; r < 5; r++) {
			for (let c = 0; c < 4; c++) {
				let key = document.createElement("button");
				key.classList.add("key");
				this.keyNodes.push(key);
				key.textContent = this.keys[r][c];
				this.calcBody.append(key);
			}
		}
	}

	display(val) {
		this.screen.textContent = val;
	}

	bindKeys(handler) {
		for (let i = 0; i < this.keyNodes.length; i++) {
			let key = this.keyNodes[i];
			key.addEventListener('click', event => {
				event.preventDefault();

				handler(key.textContent);
			})
		}
	}

}

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.nonNumerics = ["-", "=", "+", "x", "/", "Clear", "AC"];

		this.view.bindKeys(this.handleKey.bind(this));
	}

	handleKey(val) {
		console.log(this);
		if (this.nonNumerics.includes(val)) {
			switch (val) {
				case 'Clear':
					this.model.clear();
					this.view.display('');
					break;
				case 'AC':
					this.model.allClear();
					this.view.display('');
					break;
				case '=':
					this.view.display(this.model.eval());
					break;
				default:
					this.model.setop = val;
					this.view.display(this.model.getlhs + ' ' + this.model.getop)
					break;
			}
		} else {
			if (!this.model.op) {
				this.model.setlhs = this.model.getlhs + val;
				console.log(this.model.getlhs);
				this.view.display(this.model.getlhs)
			} else {
				this.model.setrhs = this.model.getrhs + val;
				this.view.display(this.model.getlhs + ' ' + this.model.getop + ' ' + this.model.getrhs)
			}
		}
	}
}

const model = new Model();
const view = new View();

const app = new Controller(model, view);