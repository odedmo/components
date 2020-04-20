export default class Search {
  constructor(state = {}) {
    this.appState = state;
    this.parent = null;
    this.state = { 
      searchIndex: null
    };
  }

  onSubmit(e, form) {
    e.preventDefault();
    const fields = [...form.elements];
    const searchTerm = fields[0].value;
    if (searchTerm === '') {
      this.state.searchIndex = this.state.selectedIndex = null;
    } else {
      const index = this.appState.state.components.findIndex(component => {
        return component.name === searchTerm;
      });
      if (index < 0) {
        return;
      }
      this.state.searchIndex = this.state.selectedIndex = index;
    }
    this.appState.setState({...this.appState.state, ...this.state});
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
      this.onSubmit(e, form);
    });
  }

  update(appState) {
    if (typeof appState.searchIndex !== typeof this.state.searchIndex || appState.searchIndex === this.state.searchIndex) {
      return;
    }
    this.render();
  }
}