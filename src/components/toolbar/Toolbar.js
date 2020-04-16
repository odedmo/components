export default class Toolbar {
  constructor(state = {}) {
    this.appState = state;
    this.parent = null;
    this.state = { toolbar: {} };
  }

  render(parent) {
    if (parent) {
      this.parent = parent;
    }
    this.parent.innerHTML = `<button/>+</button><button/>-</button>`;
    const plusBtn = this.parent.getElementsByTagName('button')[0];

    plusBtn.addEventListener('click', (e) => {
      // this.state = {...this.state, search: e.target.value}
      // this.appState.setState(this.state);
    });
  }

  update(appState) {
    if (appState.toolbar === this.state.search) {
      return;
    }
    this.render();
  }
}