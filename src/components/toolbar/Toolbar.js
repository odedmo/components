import componentsSchema from "../../utils/componentsSchema";
import { hasDuplicates } from '../../utils/validations';

export default class Toolbar {
  constructor(state = {}) {
    this.appState = state;
    this.parent = null;
    this.state = {};
  }

  onClick(action) {

    const removeChildren = (parentNames) => {
      const arr = this.state.components;
      let names = [];
      parentNames.forEach(parentName => {
        let index = arr.length;
        while (index--) {
          if (arr[index].parent && arr[index].parent === parentName) {
            names.push(arr[index].name)
            arr.splice(index, 1);
          }
        }
      })
      if (names.length === 0) {
        return;
      }
      removeChildren(names);
    };

    this.state.components = [...this.appState.state.components];
    let index = null;
    if (action === 'add') {
      // add component
      index = this.appState.state.selectedIndex != null ? this.appState.state.selectedIndex + 1 : 0;
      const newComponent = {...componentsSchema['container']};
      if (index > 0) {
        newComponent.parent = this.state.components[this.appState.state.selectedIndex].name;
      }
      while(hasDuplicates(this.state.components, newComponent.name)) {
        newComponent.name += '_';
      }
      this.state.components.splice(index, 0, newComponent)
    } else {
      // remove component
      index = this.appState.state.selectedIndex;
      const parentName = this.state.components[this.appState.state.selectedIndex].name;
      this.state.components.splice(index, 1);
      removeChildren([parentName]);
      index = null;
    }
    this.state.selectedIndex = index;
    this.appState.setState({...this.appState.state, ...this.state});
  }

  render(parent) {
    if (parent) {
      this.parent = parent;
    }
    this.parent.innerHTML = `
        <button>+</button>
        <button ${this.appState.state.selectedIndex == null ? 'disabled="disabled"' : ''}>-</button>
      `;
    const plusBtn = this.parent.getElementsByTagName('button')[0];
    const minusBtn = this.parent.getElementsByTagName('button')[1];

    plusBtn.addEventListener('click', () => {
      this.onClick('add');
    });

    minusBtn.addEventListener('click', () => {
      this.onClick('remove');
    });
  }

  update(appState) {
    if (!this.parent) {
      return;
    }
    this.render();
  }
}