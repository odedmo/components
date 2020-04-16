export default class ComponentName {
  constructor() {
    this.parent = null;
    this.state = {
      name: null
    }
  }

  render(parent) {
    if (parent) {
      this.parent = parent;
    }
    if (!this.parent) return;

    this.parent.innerHTML = `<h2>${this.state.name || ''}</h2>`
  }

  update(appState) {
    if (!appState.selectedIndex || this.state.name === appState.components[appState.selectedIndex].name) {
      return;
    }
    this.state.name = appState.components[appState.selectedIndex].name;
    this.render();
  }
}