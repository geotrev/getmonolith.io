import React, { Component } from "react"

export default class Modal extends Component {
  render() {
    return (
      <div
        className={`modal-overlay ${this.props.modalClass ? this.props.modalClass : ""}`}
        data-modal-id={this.props.id}
      >
        <div aria-labelledby={this.props.labelledby} data-modal className="modal-dialog">
          <header>
            <h2 id={this.props.labelledby}>{this.props.title}</h2>
            <a data-close href="#">
              <span aria-hidden="true">&times;</span>
            </a>
          </header>
          {this.props.children}
        </div>
      </div>
    )
  }
}
