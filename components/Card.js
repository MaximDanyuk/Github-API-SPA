export default class Card {
  /// Pass an array object, template and functions
  constructor(
    { data, handleClickDelete, handleClickAddToSave },
    templateSelector
  ) {
    this._name = data.name;
    this._owner = data.owner.login;
    this._stars = data.id;
    this._templateSelector = templateSelector;
    this.handleClickDelete = handleClickDelete;
    this.handleClickAddToSave = handleClickAddToSave;
  }

  /// A function that looks for the base of the card in the html document
  _getTemplate() {
    const cardElemenet = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElemenet;
  }

  /// A function that fill this database with the passed data
  generateCard() {
    this._elem = this._getTemplate();

    const removeBtn = this._elem.querySelector(".card__clodeBtn");
    this.name = this._elem.querySelector(".card__name");
    this.owner = this._elem.querySelector(".card__owner");
    this.start = this._elem.querySelector(".card__stars");

    this.start.textContent = `Stars: ${this._stars}`;
    this.name.textContent = `Name: ${this._name}`;
    this.owner.textContent = `Owner: ${this._owner}`;

    if (removeBtn) {
      removeBtn.addEventListener("click", () => this.handleClickDelete(this));
    }

    this._elem.addEventListener("click", () =>
      this.handleClickAddToSave(this._elem)
    );

    return this._elem;
  }

  /// Deleting a card
  removeCard() {
    this._elem.remove();
    this._elem = "";
  }
}
