import './style.scss';
import components from "./utils/components";
import State from './lib/State';
import Search from './components/search/Search';
import Toolbar from './components/toolbar/Toolbar';
import Tree from './components/tree/Tree';
import ComponentName from './components/componentName/ComponentName';
import Editor from './components/editor/Editor';

const appState = new State();
const search = new Search(appState);
const toolbar = new Toolbar(appState);
const tree = new Tree(appState);
const componentName = new ComponentName(appState);
const editor = new Editor(appState);

appState.addObserver(search);
appState.addObserver(toolbar);
appState.addObserver(tree);
appState.addObserver(componentName);
appState.addObserver(editor);

appState.setState({components, selectedIndex: null});

document.addEventListener('DOMContentLoaded', () => {
  const searchParent = document.getElementsByClassName('search')[0];
  const toolbarParent = document.getElementsByClassName('toolbar')[0];
  const treeParent = document.getElementsByClassName('components-tree')[0];
  const componentNameParent = document.getElementsByClassName('component-name')[0];
  const editorParent = document.getElementsByClassName('editor')[0];
  search.render(searchParent);
  toolbar.render(toolbarParent);
  tree.render(treeParent);
  componentName.render(componentNameParent);
  editor.render(editorParent);

  const panel = document.getElementsByClassName('panel')[0];
  const togglePanel = document.getElementsByClassName('toggle-panel')[0];
  const openBtn = togglePanel.getElementsByTagName('button')[0];
  const closeBtn = togglePanel.getElementsByTagName('button')[1];

  openBtn.addEventListener('click', e => {
    panel.classList.remove('closed');
    openBtn.classList.add('hidden');
    closeBtn.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', e => {
    panel.classList.add('closed');
    openBtn.classList.remove('hidden');
    closeBtn.classList.add('hidden');
  });
});