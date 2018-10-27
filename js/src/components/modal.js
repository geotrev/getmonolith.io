"use strict"

import Utils from "../utils"

const keyCodes = {
  ESCAPE: 27,
}

const selectors = {
  // unique
  MODAL_CONTAINER: "data-modal",
  MODAL_ID: "data-modal-id",
  MODAL_BUTTON: "data-modal-button",
  NO_SCROLL: "no-scroll",
  // common
  VISIBLE: "data-visible",
  CLOSE: "data-close",
  TARGET: "data-target",
  DATA_PARENT: "data-parent",
  // accessibility
  ARIA_HIDDEN: "aria-hidden",
  ARIA_MODAL: "aria-modal",
  ROLE: "role",
  TAB_INDEX: "tabindex",
}

const events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize",
}

const messages = {
  MISSING_MODAL:
    "Your button is missing its corresponding modal. Check to make sure your modal is in the DOM, and that it has a [data-modal-id=*] attribute matchin its [data-modal-button] and [data-target] attributes. It's possible the modal script ran before the button appeared on the page!",
}

/**
 * Modal component class.
 * @module Modal
 * @requires Utils
 */
export default class Modal extends Utils {
  constructor() {
    super()
    // modal event methods
    this._render = this._render.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)
    this._handleOverlayClick = this._handleOverlayClick.bind(this)

    // all modals
    this.modals = []
    this.modalButtons = []

    // active modal
    this.activeModalButton = {}
    this.activeModalId = ""
    this.activeModalOverlayAttr = ""
    this.activeModalOverlay = {}
    this.activeModalSelector = ""
    this.activeModal = null
    this.activeModalCloseButtons = []

    // attribute helpers
    this.modalContainerAttr = `[${selectors.MODAL_CONTAINER}]`
    this.closeButtonAttr = `[${selectors.MODAL_CONTAINER}] [${selectors.CLOSE}]`
  }

  // public

  /**
   * Add accessible attributes to modal containers
   * Begin listening to elements with [data-modal-button]
   */
  start() {
    this.modals = this._getElements(this.modalContainerAttr)
    this.modalButtons = this._getElements(`[${selectors.MODAL_BUTTON}]`)

    this._getFocusableElements(this.modalContainerAttr).forEach(element => {
      element.setAttribute(selectors.TAB_INDEX, "-1")
    })

    if (this.modals.length) {
      this.modals.forEach(modal => {
        const modalId = modal.getAttribute(selectors.DATA_PARENT)
        const modalWrapper = document.getElementById(modalId)
        modalWrapper.setAttribute(selectors.ARIA_HIDDEN, "true")
        modalWrapper.setAttribute(selectors.VISIBLE, "false")
        modal.setAttribute(selectors.ARIA_MODAL, "true")
        modal.setAttribute(selectors.ROLE, "dialog")
      })
    }

    if (this.modalButtons.length) {
      this.modalButtons.forEach(button => {
        button.addEventListener(events.CLICK, this._render)
      })
    }
  }

  /**
   * Stop listening to modal buttons
   */
  stop() {
    this.modalButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this._render)
    })
  }

  // private

  /**
   * Find a button through event.target, then render the corresponding modal attribute via matching target id
   * @param {Object} event - The event object
   */
  _render(event) {
    event.preventDefault()

    this.activeModalButton = event.target
    this.activeModalId = this.activeModalButton.getAttribute(selectors.TARGET)
    this.activeModalOverlayAttr = `[${selectors.MODAL_ID}="${this.activeModalId}"]`
    this.activeModalOverlay = document.querySelector(this.activeModalOverlayAttr)

    if (!this.activeModalOverlay) {
      throw messages.MISSING_MODAL
      return
    }

    this.activeModalSelector = `${this.activeModalOverlayAttr} ${this.modalContainerAttr}`
    this.activeModal = document.querySelector(this.activeModalSelector)
    this.activeModalCloseButtons = this._getElements(
      `${this.activeModalOverlayAttr} ${this.closeButtonAttr}`,
    )

    this._getFocusableElements(this.activeModalSelector).forEach(element => {
      element.setAttribute(selectors.TAB_INDEX, "0")
    })

    this._handleScrollStop()
    this.captureFocus(this.activeModalSelector)
    this.activeModalOverlay.setAttribute(selectors.ARIA_HIDDEN, "false")
    this.activeModal.setAttribute(selectors.TAB_INDEX, "-1")
    this.activeModalOverlay.setAttribute(selectors.VISIBLE, "true")
    this.activeModal.focus()

    // offset slight scroll caused by this.activeModal.focus()
    this.activeModalOverlay.scrollTop = 0

    // begin listening to events
    document.addEventListener(events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(events.CLICK, this._handleOverlayClick)
    this.activeModalCloseButtons.forEach(button => {
      button.addEventListener(events.CLICK, this._handleClose)
    })
  }

  /**
   * Turn off event listeners and reset focus to last selected DOM node (button)
   * @param {Object} event - Event (keydown or click)
   */
  _handleClose(event) {
    event.preventDefault()
    this.activeModalOverlay.setAttribute(selectors.VISIBLE, "false")
    this._handleReturnFocus()
    this._handleScrollRestore()
    this.releaseFocus()
    this.activeModalOverlay.setAttribute(selectors.ARIA_HIDDEN, "true")
    this.activeModal.removeAttribute(selectors.TAB_INDEX)

    this._getFocusableElements(this.activeModalSelector).forEach(element => {
      element.setAttribute(selectors.TAB_INDEX, "-1")
    })

    // stop listening to events
    document.removeEventListener(events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(events.CLICK, this._handleOverlayClick)
    this.activeModalCloseButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this._handleClose)
    })
  }

  /**
   * Handles click event on the modal background to close it.
   * @param {Object} event - Event (keydown)
   */
  _handleOverlayClick(event) {
    if (event.target === this.activeModalOverlay) {
      this._handleClose(event)
    }
  }

  /**
   * Handles escape key event to close the current modal
   * @param {Object} event - Event (keydown)
   */
  _handleEscapeKeyPress(event) {
    if (event.which === keyCodes.ESCAPE) {
      this._handleClose(event)
    }
  }

  /**
   * Returns focus to the last focused element before the modal was called.
   * @param {Object} button - The current modal's corresponding button.
   */
  _handleReturnFocus() {
    this.activeModalButton.setAttribute(selectors.TAB_INDEX, "-1")
    this.activeModalButton.focus()
    this.activeModalButton.removeAttribute(selectors.TAB_INDEX)
  }

  /**
   * Restores scroll behavior to <html> and <body>
   */
  _handleScrollRestore() {
    document.body.classList.remove(selectors.NO_SCROLL)
    document.querySelector("html").classList.remove(selectors.NO_SCROLL)
  }

  /**
   * Prevents scroll behavior on <html> and <body>
   */
  _handleScrollStop() {
    document.body.classList.add(selectors.NO_SCROLL)
    document.querySelector("html").classList.add(selectors.NO_SCROLL)
  }
}
