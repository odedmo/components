export default class Search {
  constructor(state = {}) {
    this.appState = state;
    this.parent = null;
    this.state = { search: null };
  }

  render(parent) {
    if (parent) {
      this.parent = parent;
    }
    this.parent.innerHTML = `<input type="text" />`;
    const input = this.parent.getElementsByTagName('input')[0];

    input.addEventListener('input', (e) => {
      this.state = {...this.state, search: e.target.value}
      this.appState.setState(this.state);
    });
  }

  update(appState) {
    if (appState.search === this.state.search) {
      return;
    }
    this.parent && this.render();
  }
}