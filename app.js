class Model {
	constructor() {
		this.currValue = "";  // value to display/last value calculated
		this.lhs = "";  // Left-hand-side of expression
		this.rhs = "";  // right-hand-side of expression
		this.op = ""  // operation to perform on values
		this.opSet = false
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
		this.#checkOp();
		this.op = val;
		this.opSet = true;
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
						case "+":
							this.currValue = parseFloat(this.lhs) + parseFloat(this.rhs);
							this.#evalHelper();
							return this.currValue;
						case "-":
							this.currValue = parseFloat(this.lhs) - parseFloat(this.rhs);
							this.#evalHelper();
							return this.currValue;
						case "/":
							if (this.rhs == 0) {
								return "#ERR";
							}
							this.currValue = parseFloat(this.lhs) / parseFloat(this.rhs);
							this.#evalHelper()
							return this.currValue;
						case "x":
							this.currValue = parseFloat(this.lhs) * parseFloat(this.rhs);
							this.#evalHelper();
							return this.currValue;
						default:
							throw new Error("Error: unrecognized operation.")
					}
				}
				throw new Error("No op literal!")
			}
			throw new Error("No RHS literal!")
		}
		throw new Error("No LHS literal!")
	}

	delete() {
		if (this.rhs) {
			this.rhs = this.rhs.slice(0, -1);
		} else if (this.op) {
			this.op = this.op = ""
		} else {
			this.lhs = this.lhs.slice(0, -1);
		}
	}

	allClear() {
		this.rhs = "";
		this.op = "";
		this.lhs = "";
		this.currValue = "";
	}

	toString() {
		return this.lhs + " " + this.op + " " + this.rhs;
	}

	#checkOp() {
		if (this.op && this.rhs) {
			this.eval();
			this.op = "";
		}
	}

	#evalHelper() {
		this.lhs = this.currValue;
		this.rhs = "";
		this.opSet = false;
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
		this.keys = [
			["7", "8", "9", "/"],
			["4", "5", "6", "x"],
			["1", "2", "3", "-"],
			[".", "0", "=", "+"]]

		this.keyNodes = [];

		this.wideKeys = ["<-", "AC"]
		for (let c = 0; c < this.wideKeys.length; c++) {
			let key = document.createElement("button");
			key.classList.add("wideKey");
			this.keyNodes.push(key);
			key.textContent = this.wideKeys[c];
			this.calcBody.append(key);
		}


		for (let r = 0; r < this.keys.length; r++) {
			for (let c = 0; c < this.keys[0].length; c++) {
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
			key.addEventListener("click", event => {
				event.preventDefault();

				handler(key.textContent);
			})
		}
	}

	#createKey() {

	}

}

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.nonNumerics = ["-", "=", "+", "x", "/", "<-", "AC"];

		this.view.bindKeys(this.handleKey.bind(this));
	}

	handleKey(val) {
		console.log(this);
		if (this.nonNumerics.includes(val)) {
			switch (val) {
				case "<-":
					this.model.delete();
					this.view.display(this.model.toString());
					break;
				case "AC":
					this.model.allClear();
					this.view.display("");
					break;
				case "=":
					this.view.display(this.model.eval());
					break;
				default:
					this.model.setop = val;
					this.view.display(this.model.getlhs + " " + this.model.getop)
					break;
			}
		} else {
			// The logic below basically just checks where we are in the expression
			// and then sets the view/model accordingly. This should probably be
			// decoupled to the model and just accessed by overriding the toString of
			// the model and accessing that or something:
			if (!this.model.op) {
				// put input in lhs of literal
				this.model.setlhs = this.model.getlhs + val;
				this.view.display(this.model.getlhs)
			} else if (!model.opSet) {
				// if we already have a value stored and enter a number, override that
				// value and start a new expression
				model.allClear();
				this.model.setlhs = this.model.getlhs + val;
				this.view.display(this.model.getlhs)
			} else {
				// put input in rhs of expression
				this.model.setrhs = this.model.getrhs + val;
				this.view.display(this.model.getlhs + " " + this.model.getop + " "
					+ this.model.getrhs)
			}
		}
	}
}

const model = new Model();
const view = new View();
const app = new Controller(model, view);