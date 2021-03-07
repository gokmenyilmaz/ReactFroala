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

        console.log(this);
        let cev=this.getCaretCoordinates();
        this.setState({ top: cev.y-40 })
      },
      'click' : (e, editor)=> {
        let cev=this.getCaretCoordinates();
        this.setState({ top: cev.y-40 })
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


   
   getCaretCoordinates=()=> {
     
    let x = 0,
      y = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      // Check if there is a selection (i.e. cursor in place)
      if (selection.rangeCount !== 0) {
        // Clone the range
        const range = selection.getRangeAt(0).cloneRange();
        // Collapse the range to the start, so there are not multiple chars selected
        range.collapse(true);
        // getCientRects returns all the positioning information we need
         const rects = range.getClientRects();
        if(!rects.length) {
          // probably new line buggy behavior
          if(range.startContainer && range.collapsed) {
            // explicitely select the contents
            range.selectNodeContents(range.startContainer);
          }
        }
        const rect = range.getBoundingClientRect();
        if (rect) {
          x = rect.left; // since the caret is only 1px wide, left == right
          y = rect.top +  window.scrollY; // top edge of the caret


        

        }
      }
    }

    console.log(x,y);
    return { x, y };
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
      <div style={{width:800,height:500,margin:"auto",position:"relative"}}>
          <button id="btn"  ref={this.myBtnRef} accesskey="h"
          style={{position:"absolute", top:this.state.top,right:0, borderColor:"coral", zIndex:300,
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          background:"red",color:"white" }} 
          onClick={()=>this.ekle()}>--İlişik Ekle (alt+h)</button>

          <FroalaEditor ref={this.myRef}
                  model={this.state.model}
                  onModelChange={this.handleModelChange}
                  config={this.config}
              
            />
    
      </div>
    )
  }
}
