import componentsSchema from "../../utils/componentsSchema";
import { hasDuplicates } from '../../utils/validations';

export default class Editor {
  constructor(state = {}) {
    this.appState = state;
    this.parent = null;
    this.state = {
      selectedIndex: null,
      selectedComponent: {}
    }
  }

  onSubmit(e, form) {
    e.preventDefault();
    const fields = [...form.elements];
    fields.pop();
    // validate name
    let previousName = null;
    if (fields[0].value !== this.state.selectedComponent.name) {
      previousName = this.state.selectedComponent.name;
      if (hasDuplicates(this.appState.state.components, fields[0].value)) {
        alert('duplicated component name');
        return;
      }
    }

    fields.forEach(field => {
      this.state.selectedComponent[field.name] = field.value;
    });

    this.state.components = [...this.appState.state.components];
    this.state.components[this.state.selectedIndex] = {...this.state.selectedComponent};

    previousName && this.state.components.forEach(component => {
      if (component.parent === previousName) {
        component.parent = this.state.selectedComponent.name;
      }
    });

    this.appState.setState({...this.appState.state, components: this.state.components});
  }

  render(parent) {
    if (parent) {
      this.parent = parent;
    }
    if (!this.parent) return;

    if (!this.state.selectedComponent.type) {
      this.parent.innerHTML = '';
      return;
    }

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
      this.onSubmit(e, form)
    });
    const select = this.parent.getElementsByTagName('select')[0];
    select && select.addEventListener('change', e => {
      this.state.selectedComponent['type'] = e.target.value;
      this.render();
    })
  }

  update(appState) {
    if (isNaN(appState.selectedIndex) || appState.selectedIndex === this.state.selectedIndex) {
      return;
    }
    this.state.selectedIndex = appState.selectedIndex;
    this.state.selectedComponent = this.state.selectedIndex != null ? {...appState.components[this.state.selectedIndex]} : {};
    this.render();
  }
}