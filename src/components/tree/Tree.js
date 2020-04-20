import _ from 'lodash/lang';

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

  buildStructures(componentsClone) {
    const buildTree = parents => {
      if (parents.length === 0) {
        return;
      }
      const children = [];
      parents.forEach(parent => {
        componentsClone.forEach(component => {
          if (component.parent === parent.name) {
            if (!('children' in parent)) {
              parent.children = [];
            }
            parent.children.push({...component});
            children.push(parent.children[parent.children.length - 1]);
          }
        })
      });
      buildTree(children);
    };
    let roots = [];
    if (this.appState.state.searchIndex) {
      let root = componentsClone[this.appState.state.searchIndex]; 
      if (root.parent) {
        const parent = componentsClone.find(component => component.name === root.parent);
        parent.children = [{...root}];
        this.state.tree[parent.name] = {...parent};
        roots.push(this.state.tree[parent.name].children[0]);
      } else {
        this.state.tree[root.name] = {...root};
        roots.push(this.state.tree[root.name]);
      }
    } else {
      componentsClone.forEach(component => {
        if (!component.parent) {
          this.state.tree[component.name] = {...component};
          roots.push(this.state.tree[component.name]);
        }
      });
    }
    buildTree(roots);
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
    // if (JSON.stringify(appState.components) === JSON.stringify(this.state.components)) {
    //   return;
    // }
    this.state.tree = {};
    this.state.components = _.cloneDeep(appState.components);
    this.buildStructures(_.cloneDeep(this.state.components));
    this.render();
  }
}