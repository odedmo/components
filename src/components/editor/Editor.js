import componentsSchema from "../../utils/componentsSchema";

export default class Editor {
  constructor(state = {}) {
    this.appState = state;
    this.parent = null;
    this.state = {
      selectedIndex: null,
      selectedComponent: {}
    }
  }

  render(parent) {
    if (parent) {
      this.parent = parent;
    }
    if (!this.parent || !this.state.selectedComponent.type) return;

    let output = `<form>`;
    Object.keys(componentsSchema[this.state.selectedComponent.type]).forEach(prop => {
      output += `<div><label for="${prop}">${prop}:</label>`;
      if (prop.includes('sql')) {
        output += `<textarea name="${prop}">${this.state.selectedComponent[prop] || ''}</textarea>`;
      } else if (prop === 'type') {
        output += `
            <select name="${prop}">
              <option value="container" ${this.state.selectedComponent[prop] === 'container' ? 'selected' : ''}>container</option>
              <option value="category" ${this.state.selectedComponent[prop] === 'category' ? 'selected' : ''}>category</option>
              <option value="grid" ${this.state.selectedComponent[prop] === 'grid' ? 'selected' : ''}>grid</option>
              <option value="chart" ${this.state.selectedComponent[prop] === 'chart' ? 'selected' : ''}>chart</option>
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
      let previousName = null;
      fields.pop();
      fields.forEach(field => {
        if (field.name === 'name' && this.state.selectedComponent.name !== field.value) {
          previousName = this.state.selectedComponent.name;
        }
        this.state.selectedComponent[field.name] = field.value;
      });
      const filtered = [...this.appState.state.components];
      filtered.splice(this.state.selectedIndex, 1);
      const duplicatedName = filtered.some(component => component.name === this.state.selectedComponent.name);
      if (duplicatedName) {
        alert('duplicated component name');
        return;
      }
      const clonedComponents = [...this.appState.state.components];
      previousName && clonedComponents.forEach(component => {
        if (component.parent === previousName) {
          component.parent = this.state.selectedComponent.name;
        }
      })
      clonedComponents[this.state.selectedIndex] = this.state.selectedComponent;
      this.appState.setState({...this.appState.state, components: clonedComponents});
    });
    const select = this.parent.getElementsByTagName('select')[0];
    select && select.addEventListener('change', e => {
      this.state.selectedComponent['type'] = e.target.value;
      this.render();
    })
  }

  update(appState) {
    this.state.selectedIndex = appState.selectedIndex;
    this.state.selectedComponent = {...appState.components[this.state.selectedIndex]};
    this.render();
  }
}