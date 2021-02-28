import React, { Component } from 'react'

import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

export default class App extends Component {

  constructor () {
    super();

    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      model: 'Example text'
    };
  }

  handleModelChange=model=> {
    this.setState({
      model: model
    });
  }
  


  render() {
    return (
      <div style={{width:800,height:500,margin:"auto"}}>
        	<FroalaEditor 
                model={this.state.model}
                onModelChange={this.handleModelChange}
                config={{
                  placeholderText: 'Metin giriniz',
                  charCounterCount: "true",
                  
                  events : {
                    'focus' : function(e, editor) {
                      console.log("focus");
                    }
                  }

                  
                }}

				  />
      </div>
    )
  }
}
