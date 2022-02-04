'use babel';

import AlgounareilView from './algounareil-view';
import { CompositeDisposable } from 'atom';

export default {

  algounareilView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.algounareilView = new AlgounareilView(state.algounareilViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.algounareilView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'algounareil:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.algounareilView.destroy();
  },

  serialize() {
    return {
      algounareilViewState: this.algounareilView.serialize()
    };
  },

  toggle() {
    console.log('Algounareil was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
