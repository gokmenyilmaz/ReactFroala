import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import { Button, Card, Modal, Form, Row, Col } from "react-bootstrap";

// Require Font Awesome.
import "font-awesome/css/font-awesome.css";

import FroalaEditor from "react-froala-wysiwyg";

import Froalaeditor from "froala-editor";

export default class App extends Component {
  config = {
    placeholderText: "Metin giriniz",
    toolbarButtons: [
      ["undo", "redo", "bold"],
      ["alert", "clear"],
    ],
    events: {
      keyup: (keydownEvent) => {
        let cev = this.getCaretCoordinates();
        this.setState({ top: cev.y - 40 });
      },
      click: (e, editor) => {
        let cev = this.getCaretCoordinates();
        this.setState({ top: cev.y - 40 });
      },
    },
  };

  constructor(props) {
    super();

    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      textMetin: "",
      top: 50,
      isShow: false,
      isShowEkForm: false,
      isShowRefForm: false,
      yukluDosyalar: [],
      ekListe: [],
      referansListe: [],
      ekFormModel: {},
    };

    this.myRef = React.createRef();
    this.hiddenFileInput = React.createRef();

    this.state.yukluDosyalar.push("1.pdf");
    this.state.yukluDosyalar.push("2.pdf");

    this.state.textMetin =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  }

  componentDidMount() {}

  handleModelChange = (model) => {
    this.setState({
      textMetin: model,
    });
  };

  dosyaYukle = () => {
    this.hiddenFileInput.current.click();
  };

  onFileChanged = (event) => {
    let dosyaAd = event.target.files[0].name;

    var tireVarMi = dosyaAd.includes("-");

    if (tireVarMi === false) {
      alert("Dosya Adında - olmalı");
      return;
    }


    var noListe=dosyaAd.split("-");

    let fark=parseInt(noListe[1])-parseInt(noListe[0]);

    if(fark<0)
    {
      alert("ikinci sayı birinciden büyük olmalı");
      return;
    }


    let dosyalar = this.state.yukluDosyalar;
    dosyalar.push(dosyaAd);

    // post işlemi sonra aktif edilecek
    //  const formData = new FormData();

    //  formData.append(
    //    "myFile",
    //    this.state.selectedFile,
    //    this.state.selectedFile.name
    //  );

    //  axios.post("sharepoint adres", formData);

    this.setState({ yukluDosyalar: dosyalar });
  };

  dosyaSil = (item) => {
    let dosyalar = this.state.yukluDosyalar;

    let index = dosyalar.indexOf(item);

    dosyalar.splice(index, 1);

    this.setState({ yukluDosyalar: dosyalar });
  };

  ekSil = (item) => {
    let liste = this.state.ekListe;

    let index = liste.indexOf(item);
    liste.splice(index, 1);
    this.setState({ ekListe: liste });
  };

  getCaretCoordinates = () => {
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
        if (!rects.length) {
          // probably new line buggy behavior
          if (range.startContainer && range.collapsed) {
            // explicitely select the contents
            range.selectNodeContents(range.startContainer);
          }
        }
        const rect = range.getBoundingClientRect();
        if (rect) {
          x = rect.left; // since the caret is only 1px wide, left == right
          y = rect.top + window.scrollY; // top edge of the caret
        }
      }
    }

    console.log(x, y);
    return { x, y };
  };

  dosyaEkle = () => {
    var ek = prompt("EkNo giriniz", "");

    const f = this.myRef.current;

    let metin = "<a href='www.saglik.gov.tr'>" + ek + "</a>";

    f.editor.html.insert(" " + metin);
  };

  handleClose = () => {
    let ek = "dddd";

    this.setState({ isShow: false });

    const f = this.myRef.current;

    let metin = "<a href='www.saglik.gov.tr'>" + ek + "</a>";

    f.editor.html.insert(" " + metin);

    console.log("kapatıldı");
  };

  handleShow = () => {
    this.setState({ isShow: true });
  };

  handleEkFormModelChange = (fieldName, value) => {
    console.log(fieldName, value);

    var ekFormModelData = this.state.ekFormModel;
    ekFormModelData[fieldName] = value;

    this.setState({
      ekFormModel: ekFormModelData,
    });
  };

  ekEkleShowForm = () => {
    this.setState({ isShowEkForm: true });
  };

  refEkleShowForm = () => {
    this.setState({ isShowRefForm: true });
  };

  referansSil = (item) => {
    let liste = this.state.referansListe;

    let index = liste.indexOf(item);
    liste.splice(index, 1);
    this.setState({ referansListe: liste });
  };

  handleCloseEkForm = (onayText) => {
    this.setState({ isShowEkForm: false });

    var formData = this.state.ekFormModel;

    console.log(formData);

    if (onayText !== "Ok") return;

    let liste = this.state.ekListe;

    let ekModel = {
      Sayi: formData.Sayi,
      SiraNo: formData.SiraNo,
      Mahiyeti: formData.Mahiyeti,
      yukluDosya: "",
    };
    liste.push(ekModel);

    this.setState({ ekListe: liste });
  };

  handleCloseRefForm = (onayText) => {
    this.setState({ isShowRefForm: false });

    var formData = this.state.ekFormModel;

    console.log("ref", formData);

    if (onayText !== "Ok") return;

    let liste = this.state.referansListe;

    let ekModel = {
      Sayi: formData.Sayi,
      SiraNo: formData.SiraNo,
      Mahiyeti: formData.Mahiyeti,
      yukluDosya: "",
    };
    liste.push(ekModel);

    this.setState({ referansListe: liste });
  };

  render() {
    return (
      <div
        style={{
          width: 800,
          height: 500,
          margin: "auto",
          position: "relative",
        }}
      >
        <Modal
          id="Ek"
          show={this.state.isShowEkForm}
          onHide={() => this.handleCloseEkForm("Cancel")}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Ek Formu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group inline controlId="exampleForm.ControlInput1">
                    <Form.Label>Sıra No</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        this.handleEkFormModelChange("SiraNo", e.target.value)
                      }
                      placeholder=""
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Dosya Seç</Form.Label>
                    <Form.Control as="select">
                      <option>1.pdf</option>
                      <option>2.pdf</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col />
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Tarihi</Form.Label>
                    <Form.Control type="date" placeholder="" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Sayı</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        this.handleEkFormModelChange("Sayi", e.target.value)
                      }
                      placeholder=""
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label>Sayfa Adedi</Form.Label>
                    <Form.Control inline type="number" placeholder="" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Label>Mahiyetixxx</Form.Label>

                <Form.Control
                  type="text"
                  as="textarea"
                  rows={2}
                  onChange={(e) =>
                    this.handleEkFormModelChange("Mahiyeti", e.target.value)
                  }
                  placeholder=""
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleCloseEkForm("Cancel")}
            >
              İptal
            </Button>
            <Button
              variant="primary"
              onClick={() => this.handleCloseEkForm("Ok")}
            >
              Tamam
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          id="Ref"
          show={this.state.isShowRefForm}
          onHide={() => this.handleCloseRefForm("Cancel")}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Referan Formu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Sayı</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        this.handleEkFormModelChange("SiraNo", e.target.value)
                      }
                      placeholder=""
                    />
                  </Form.Group>
                </Col>

                <Col />
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Mahiyeti</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={2}
                      onChange={(e) =>
                        this.handleEkFormModelChange("Mahiyeti", e.target.value)
                      }
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleCloseRefForm("Cancel")}
            >
              İptal
            </Button>
            <Button
              variant="primary"
              onClick={() => this.handleCloseRefForm("Ok")}
            >
              Tamam
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal size="lg" show={this.state.isShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ek ve Refereanslar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section style={{ display: "flex", margin: 4 }}>
              <nav
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  border: "1px solid gray",
                  padding: 8,
                  display: "flex",
                }}
              >
                {this.state.yukluDosyalar.map((item) => (
                  <article
                    style={{
                      display: "flex",
                      margin: 4,
                      padding: 4,
                      border: "1px solid gray",
                    }}
                  >
                    <Button
                      onClick={() => this.dosyaSil(item)}
                      variant="danger"
                      size="sm"
                    >
                      x
                    </Button>
                    <div style={{ marginLeft: 4 }}> {item}</div>
                  </article>
                ))}
              </nav>

              <div>
                <input
                  type="file"
                  ref={this.hiddenFileInput}
                  onChange={(e) => this.onFileChanged(e)}
                  style={{ display: "none" }}
                />

                <Button
                  variant="outline-primary"
                  style={{ width: "100px", marginLeft: 10 }}
                  onClick={() => this.dosyaYukle()}
                >
                  Dosya Yükle
                </Button>
              </div>
            </section>

            <section style={{ display: "flex" }}>
              <Card
                border="success"
                style={{ margin: 5, width: "50%", height: 300 }}
              >
                <Card.Header>
                  Ekler
                  <Button
                    onClick={() => this.ekEkleShowForm()}
                    size="sm"
                    style={{ float: "right", margin: 0 }}
                  >
                    + Ekle
                  </Button>
                </Card.Header>
                <Card.Body>
                  <ul
                    style={{
                      padding: 0,
                      display: "flex",
                      flexWrap: "wrap",
                      listStyle: "none",
                    }}
                  >
                    {this.state.ekListe.map((item) => (
                      <li style={{ display: "flex" }}>
                        <article style={{ display: "flex", margin: 10 }}>
                          <Button
                            onClick={() => this.ekSil(item)}
                            variant="danger"
                            size="sm"
                          >
                            x
                          </Button>
                          <div style={{ marginLeft: 4 }}> {item.SiraNo}</div>
                          <div style={{ marginLeft: 4 }}> {item.Mahiyeti}</div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>

              <Card border="success " style={{ margin: 5, width: "50%" }}>
                <Card.Header>
                  Referanslar
                  <Button
                    onClick={() => this.refEkleShowForm()}
                    size="sm"
                    style={{ float: "right", margin: 0 }}
                  >
                    + Ekle
                  </Button>
                </Card.Header>
                <Card.Body style={{ width: "50%" }}>
                  <ul
                    style={{
                      padding: 0,
                      display: "flex",
                      flexWrap: "wrap",
                      listStyle: "none",
                    }}
                  >
                    {this.state.referansListe.map((item) => (
                      <li style={{ display: "flex" }}>
                        <article style={{ display: "flex", margin: 10 }}>
                          <Button
                            onClick={() => this.referansSil(item)}
                            variant="danger"
                            size="sm"
                          >
                            x
                          </Button>
                          <div style={{ marginLeft: 4 }}> {item.SiraNo}</div>
                          <div style={{ marginLeft: 4 }}> {item.Mahiyeti}</div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </section>
          </Modal.Body>
        </Modal>

        <button
          id="btn"
          ref={this.myBtnRef}
          accesskey="h"
          style={{
            position: "absolute",
            top: this.state.top - 20,
            right: -20,
            borderColor: "coral",
            border: "0px",
            zIndex: 300,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            background: "rgba(255, 0, 0, 0.2)",
            color: "white",
          }}
          onClick={() => this.handleShow()}
        >
          İlişik Ekle <br /> (alt+h)
        </button>

        <FroalaEditor
          ref={this.myRef}
          model={this.state.textMetin}
          onModelChange={this.handleModelChange}
          config={this.config}
        />
      </div>
    );
  }
}
