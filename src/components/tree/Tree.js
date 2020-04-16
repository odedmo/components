import _ from 'lodash';

export default class Tree {
  constructor(state = {}) {
    this.appState = state;
    this.parent = null;
    this.state = {
      tree: {},
      selectedIndex: null,
      components: []
    };
  }

  buildStructures(tree) {
    if (tree.length === 0) {
      return;
    }
    if (Object.keys(this.state.tree).length === 0) {
      // populate roots
      let index = tree.length;
      while (index--) {
        if (!('parent' in tree[index])) {
          this.state.tree[tree[index].name] = tree[index];
          tree.splice(index, 1);
        }
      }
    } else {
      // populate children
      const findParent = component => {
        let parentFound = false;

        const findInStructure = currentLevel => {
          if (Array.isArray(currentLevel)) {
            return currentLevel.some(comp => findInStructure(comp));
          } else if (currentLevel.name === component.parent) {
            if (!currentLevel.children) {
              currentLevel.children = [];
            }
            currentLevel.children.push(component);
            return true;
          } else if (currentLevel.children) {
            return findInStructure(currentLevel.children);
          }
          return false;
        };

        for (const root in this.state.tree) {
          if (findInStructure(this.state.tree[root])) {
            parentFound = true;
            break;
          }
        }

        return parentFound;
      }

      let index = tree.length;
      while (index--) {
        if (findParent(tree[index])) {
          tree.splice(index, 1);
        }
      }
    };
    this.buildStructures(tree);
  }

  renderStructures() {
    let output = ``;

    const renderTree = (obj, level) => {
      let lines = ``;
      for (let i = 0; i < level; i++) {
        lines += '--';
      }
      if (Array.isArray(obj)) {
        let output = ``
        obj.forEach((component) => {
          output += `${renderTree(component, level)}`;
        });
        output += ``;
        return output;
      }
      return `<div>${lines} <span>${obj.name}</span></div>` + `${obj.children ? `${renderTree(obj.children, level + 1)}` : ''}`;
    }

    Object.values(this.state.tree).forEach(tree => {
      output += `<div class="tree">${renderTree(tree, 0)}</div>`;
    });

    this.parent.innerHTML = output;
    const trees = [...this.parent.getElementsByClassName('tree')];
    trees.forEach(tree => {
      tree.addEventListener('click', e => {
        e.stopPropagation();
        if (!(e.target.tagName === 'SPAN')) {
          return;
        }
        const selectedIndex = this.appState.state.components.findIndex(component => component.name === e.target.innerText);
        this.state = {...this.state, selectedIndex};
        this.appState.setState({...this.appState.state, selectedIndex: this.state.selectedIndex});
      })
    })
  }

  render(parent) {
    if (parent) {
      this.parent = parent;
    }
    if (!this.parent) {
      return;
    }
    this.renderStructures();
  }

  update(appState) {
    // should render condition
    if (JSON.stringify(appState.components) === JSON.stringify(this.state.components)) {
      return;
    }
    this.state.tree = {};
    this.state.components = _.cloneDeep(appState.components);
    this.buildStructures(_.cloneDeep(this.state.components));
    this.render();
  }
}