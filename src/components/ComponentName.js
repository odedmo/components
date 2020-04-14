export default class ComponentName {
  constructor() {
    this.parent = null;
    this.state = {
      selectedComponent: {}
    }
  }

  render(parent) {
    if (parent) {
      this.parent = parent;
    }
    if (!this.parent) return;

    this.parent.innerHTML = `<h2>${this.state.selectedComponent.name || ''}</h2>`
  }

  update(appState) {
    if (JSON.stringify(appState.selectedComponent) === JSON.stringify(this.state.selectedComponent)) {
      return;
    }
    this.state.selectedComponent = {...appState.selectedComponent};
    this.render();
  }
}