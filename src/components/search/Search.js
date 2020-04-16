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
    this.parent.innerHTML = `
      <form>
        <input type="text" />
        <button>search</button>
      </form>
    `;
    const form = this.parent.getElementsByTagName('form')[0];

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = [...form.elements];
      const searchTerm = fields[0].value;

      // this.state = {...this.state, search: e.target.value}
      // this.appState.setState(this.state);
    });
  }

  update(appState) {
    if (appState.search === this.state.search) {
      return;
    }
    this.parent && this.render();
  }
}