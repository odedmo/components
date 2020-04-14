export default class Editor {
  constructor(state = {}) {
    this.appState = state;
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

    let output = `<form>`;
    Object.keys(this.state.selectedComponent).forEach(prop => {
      if (prop === 'parent' || prop === 'children') {
        return;
      }
      output += `<div><label for="${prop}">${prop}:</label>`;
      if (prop.includes('sql')) {
        output += `<textarea name="${prop}">${this.state.selectedComponent[prop] || ''}</textarea>`;
      } else if (prop === 'type') {
        output += `
            <select name="${prop}">
              <option value="container">container</option>
              <option value="category">category</option>
              <option value="grid">grid</option>
              <option value="chart">chart</option>
            </select>
          `;
      } else {
        output += `<input name="${prop}" value="${this.state.selectedComponent[prop] || ''}"/>`;
      }
      output += `</div>`;
    });
    output += `${Object.keys(this.state.selectedComponent).length > 0 ? '<button type="submit">update</button>' : ''}</form>`;
    this.parent.innerHTML = output;
    const form = this.parent.getElementsByTagName('form')[0];

    form.addEventListener('submit', e => {
      e.preventDefault();
      const fields = [...form.elements];
    });
  }

  update(appState) {
    if (JSON.stringify(appState.selectedComponent) === JSON.stringify(this.state.selectedComponent)) {
      return;
    }
    this.state.selectedComponent = {...appState.selectedComponent};
    this.render();
  }
}