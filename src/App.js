import React, { Component } from 'react'

import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';


import Froalaeditor from 'froala-editor';

const veri={data:"cccc"}

Froalaeditor.DefineIcon('insert', {NAME: 'plus', SVG_KEY: 'add'});
Froalaeditor.RegisterCommand('insert', {
  title: 'Insert HTML',
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {

    alert("veri");
    this.html.insert(veri.data);
  }
});


export default class App extends Component {

  config= {
    placeholderText: 'Metin giriniz',
    toolbarButtons: [['undo', 'redo' , 'bold'], ['alert', 'clear', 'insert']]
  }

  
 

  constructor (props) {
    super();

    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      model: ''
    };

    this.myRef = React.createRef();


  }

  componentDidMount()
  {
    const froala = this.myRef;

  }

  handleModelChange=model=> {
    this.setState({
      model: model
    });
  }
  


  render() {
    return (
      <div style={{width:800,height:500,margin:"auto"}}>



        	<FroalaEditor ref={this.myRef}
                model={this.state.model}
                onModelChange={this.handleModelChange}
                config={this.config}
            
				  />
      </div>
    )
  }
}
