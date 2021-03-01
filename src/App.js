import React, { Component } from 'react'

import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';


import Froalaeditor from 'froala-editor';


export default class App extends Component {

  config= {
    placeholderText: 'Metin giriniz',
    toolbarButtons: [['undo', 'redo' , 'bold'], ['alert', 'clear']],
    events: {
      'keyup': (keydownEvent)=> {
        const f = this.myRef.current;
        const { offsetTop: spanY } = f.editor.selection.element();
        if(spanY==0) return;
        
        this.setState({ top: spanY+45 })
      },
      'click' : (e, editor)=> {
        const f = this.myRef.current;
        const { offsetTop: spanY } = f.editor.selection.element();
        if(spanY==0) return;
        
        this.setState({ top: spanY+45 })
      }

    }
 }

  
 

  constructor (props) {
    super();

    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      model: '',
      top:50
    };

    this.myRef = React.createRef();

    this.state.model="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  }

  componentDidMount()
  {
  

  }

  handleModelChange=model=> {
    this.setState({
      model: model,
    
    });
  }
  
  ekle=()=>
  {
 
    var ek = prompt("EkNo giriniz", "");

    const f = this.myRef.current;

    let metin="<a href='www.saglik.gov.tr'>" + ek + "</a>";

    f.editor.html.insert(" " +  metin);



  }


  render() {
    return (
      <div style={{width:800,height:500,margin:"auto"}}>

       

        <div style={{position:"relative"}}>

          <button id="btn"  ref={this.myBtnRef} 
          style={{position:"absolute", top:this.state.top,right:0, borderColor:"coral", zIndex:300,
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          background:"red",color:"white" }} 
          onClick={()=>this.ekle()}>--İlişik Ekle</button>
          <FroalaEditor ref={this.myRef}
                  model={this.state.model}
                  onModelChange={this.handleModelChange}
                  config={this.config}
              
            />
        </div>
        
      </div>
    )
  }
}
