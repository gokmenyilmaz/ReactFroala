(this.webpackJsonpf1=this.webpackJsonpf1||[]).push([[0],{113:function(e,t,n){},120:function(e,t){},122:function(e,t){},132:function(e,t){},134:function(e,t){},161:function(e,t){},163:function(e,t){},164:function(e,t){},169:function(e,t){},171:function(e,t){},190:function(e,t){},202:function(e,t){},205:function(e,t){},212:function(e,t,n){"use strict";n.r(t);var o=n(11),i=n.n(o),a=n(103),r=n.n(a),s=(n(113),n(104)),c=n(105),l=n(30),u=n(108),d=n(107),f=(n(114),n(208),n(209),n(210),n(106)),h=n.n(f),g=(n(102),n(9)),p=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(s.a)(this,n),(o=t.call(this)).config={placeholderText:"Metin giriniz",toolbarButtons:[["undo","redo","bold"],["alert","clear"]],events:{keyup:function(e){var t=o.getCaretCoordinates();o.setState({top:t.y})},click:function(e,t){var n=o.getCaretCoordinates();o.setState({top:n.y})}}},o.handleModelChange=function(e){o.setState({model:e})},o.getCaretCoordinates=function(){var e=0,t=0;if("undefined"!==typeof window.getSelection){var n=window.getSelection();if(0!==n.rangeCount){var i=n.getRangeAt(0).cloneRange();i.collapse(!0);var a=o.rangeRect(i);a&&(e=a.left,t=a.top)}}return{x:e,y:t}},o.rangeRect=function(e){var t=e.getBoundingClientRect();if(e.collapsed&&0===t.top&&0===t.left){var n=document.createTextNode("\ufeff");e.insertNode(n),t=e.getBoundingClientRect(),n.remove()}return t},o.ekle=function(){var e="<a href='www.saglik.gov.tr'>"+prompt("EkNo giriniz","")+"</a>";o.myRef.current.editor.html.insert(" "+e)},o.handleModelChange=o.handleModelChange.bind(Object(l.a)(o)),o.state={model:"",top:50},o.myRef=i.a.createRef(),o.state.model="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",o}return Object(c.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return Object(g.jsx)("div",{style:{width:800,height:500,margin:"auto"},children:Object(g.jsxs)("div",{style:{position:"relative"},children:[Object(g.jsx)("button",{id:"btn",ref:this.myBtnRef,accesskey:"h",style:{position:"absolute",top:this.state.top,right:0,borderColor:"coral",zIndex:300,boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",background:"red",color:"white"},onClick:function(){return e.ekle()},children:"--\u0130li\u015fik Ekle (alt+h)"}),Object(g.jsx)(h.a,{ref:this.myRef,model:this.state.model,onModelChange:this.handleModelChange,config:this.config})]})})}}]),n}(o.Component),m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,213)).then((function(t){var n=t.getCLS,o=t.getFID,i=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),o(e),i(e),a(e),r(e)}))};r.a.render(Object(g.jsx)(i.a.StrictMode,{children:Object(g.jsx)(p,{})}),document.getElementById("root")),m()}},[[212,1,2]]]);
//# sourceMappingURL=main.d811468f.chunk.js.map