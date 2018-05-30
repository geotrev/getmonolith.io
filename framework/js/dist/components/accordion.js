"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keyCodes = {
  SPACE: 32
};

var selectors = {
  ACCORDION_CONTAINER: "data-accordion",
  ACCORDION_EXPANDED: "data-accordion-expanded",
  ACCORDION_BUTTON: "data-accordion-button",
  ACCORDION_CONTENT: "data-accordion-content",
  ACCORDION_MULTIPLE: "data-accordion-toggle-multiple"
};

var events = {
  CLICK: "click",
  KEYDOWN: "keydown"
};

var messages = {
  MISSING_ACCORDION_CONTENT: "You have an accordion button that is missing its content block or its [data-accordion-content] attribute.",
  MISSING_ACCORDION_BUTTONS: "You have an accordion component with no [data-accordion-button] children."
};

var Accordion = function (_Utils) {
  _inherits(Accordion, _Utils);

  function Accordion() {
    _classCallCheck(this, Accordion);

    var _this = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this));

    _this.accordionContainers = _this.getElements("[" + selectors.ACCORDION_CONTAINER + "]");
    _this.accordionButtons = _this.getElements("[" + selectors.ACCORDION_BUTTON + "]");
    _this.accordionContents = _this.getElements("[" + selectors.ACCORDION_CONTENT + "]");
    _this.activeContainer = null;

    // bind events to calss
    _this.getAccordion = _this.getAccordion.bind(_this);
    _this.handleSpaceKeyPress = _this.handleSpaceKeyPress.bind(_this);
    return _this;
  }

  _createClass(Accordion, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      if (this.accordionButtons.length) {
        this.accordionButtons.forEach(function (button) {
          button.setAttribute("role", "heading");

          var buttonExpandState = button.parentNode.getAttribute("data-accordion-expanded") === "true" ? "true" : "false";
          button.setAttribute("aria-expanded", buttonExpandState);

          button.addEventListener(events.CLICK, _this2.getAccordion);
          button.addEventListener(events.KEYDOWN, _this2.handleSpaceKeyPress);
        });
      }

      if (this.accordionContents.length) {
        this.accordionContents.forEach(function (content) {
          content.setAttribute("role", "region");
          var contentHiddenState = content.parentNode.getAttribute("data-accordion-expanded");
          var toggleContentHiddenState = contentHiddenState === "true" ? "false" : "true";
          content.setAttribute("aria-hidden", toggleContentHiddenState);
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this.accordionButtons.forEach(function (button) {
        button.removeEventListener(events.CLICK, _this3.getAccordion);
        button.removeEventListener(events.KEYDOWN, _this3.handleSpaceKeyPress);
      });
    }
  }, {
    key: "getAccordion",
    value: function getAccordion(event) {
      event.preventDefault();
      this.renderAccordionContent(event);
    }
  }, {
    key: "renderAccordionContent",
    value: function renderAccordionContent(event) {
      this.activeButton = event.target;
      this.activeRow = this.activeButton.parentNode;
      this.activeContainer = this.activeRow.parentNode;
      this.activeContent = this.activeButton.nextElementSibling;
      var accordionContentHasAttr = this.activeContent.hasAttribute(selectors.ACCORDION_CONTENT);

      if (!accordionContentHasAttr) {
        throw messages.MISSING_ACCORDION_CONTENT;
        return;
      }

      var accordionButtonState = this.activeRow.getAttribute(selectors.ACCORDION_EXPANDED);
      var accordionContentState = this.activeContent.getAttribute(selectors.ACCORDION_CONTENT);
      var accordionContentAriaHiddenState = this.activeContent.getAttribute("aria-hidden");

      this.toggleExpandState = accordionButtonState === "true" ? "false" : "true";
      this.toggleContentState = accordionContentState === "visible" ? "hidden" : "visible";
      this.toggleHiddenState = this.toggleExpandState === "false" ? "true" : "false";

      this.closeAllIfToggleable();
      this.toggleSelectedAccordionRow();
    }
  }, {
    key: "handleSpaceKeyPress",
    value: function handleSpaceKeyPress(event) {
      if (event.which === keyCodes.SPACE) this.getAccordion(event);
    }
  }, {
    key: "closeAllIfToggleable",
    value: function closeAllIfToggleable() {
      if (this.activeContainer.hasAttribute(selectors.ACCORDION_MULTIPLE)) return;

      var containerId = this.activeContainer.getAttribute(selectors.ACCORDION_CONTAINER);
      var containerAttr = "[" + selectors.ACCORDION_CONTAINER + "='" + containerId + "']";
      var allContentsAttr = containerAttr + " [" + selectors.ACCORDION_CONTENT + "]";
      var allRows = this.getElements(containerAttr + " [" + selectors.ACCORDION_EXPANDED + "]");
      var allContent = this.getElements(allContentsAttr);
      var allButtons = this.getElements(containerAttr + " [" + selectors.ACCORDION_BUTTON + "]");

      this.toggleAttributeInCollection(allRows, selectors.ACCORDION_EXPANDED, "true", "false");
      this.toggleAttributeInCollection(allButtons, "aria-expanded", "true", "false");
      this.toggleAttributeInCollection(allContent, "aria-hidden", "false", "true");
      this.toggleAttributeInCollection(allContent, selectors.ACCORDION_CONTENT, "visible", "hidden");
    }
  }, {
    key: "toggleSelectedAccordionRow",
    value: function toggleSelectedAccordionRow() {
      this.activeRow.setAttribute(selectors.ACCORDION_EXPANDED, this.toggleExpandState);
      this.activeContent.setAttribute(selectors.ACCORDION_CONTENT, this.toggleContentState);
      this.activeButton.setAttribute("aria-expanded", this.toggleExpandState);
      this.activeContent.setAttribute("aria-hidden", this.toggleHiddenState);
    }
  }, {
    key: "toggleAttributeInCollection",
    value: function toggleAttributeInCollection(elements, selector, firstAttr, secondAttr) {
      elements.forEach(function (element) {
        if (element.hasAttribute(selector, firstAttr)) {
          element.setAttribute(selector, secondAttr);
        }
      });
    }
  }]);

  return Accordion;
}(_utils2.default);

exports.default = Accordion;