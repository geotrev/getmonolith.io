import {
  introductionPath,
  downloadPath,
  cssPath,
  javascriptPath,
  gridPath,
  typographyPath,
  buttonsPath,
  formsPath,
  modalsPath,
  collapsiblesPath,
  accordionsPath,
  dropdownsPath,
  tooltipsPath,
  alignmentPath,
  offsetOrderPath,
  textPath,
  displayPath,
  colorPath,
  spacingPath,
} from "app/routes"

export const NAV_DATA = [
  {
    header: "Overview",
    links: [
      { name: "Introduction", url: introductionPath },
      { name: "Download", url: downloadPath },
      { name: "CSS", url: cssPath },
      { name: "JavaScript", url: javascriptPath },
    ],
  },
  {
    header: "Layout",
    links: [
      { name: "Flex Grid", url: gridPath },
      { name: "Alignment", url: alignmentPath },
      { name: "Offset / Order", url: offsetOrderPath },
      { name: "Spacing", url: spacingPath },
    ],
  },
  {
    header: "Elements",
    links: [
      { name: "Buttons", url: buttonsPath },
      { name: "Forms", url: formsPath },
      { name: "Typography", url: typographyPath },
    ],
  },
  {
    header: "Components",
    links: [
      { name: "Collapsibles", url: collapsiblesPath },
      { name: "Accordions", url: accordionsPath },
      { name: "Dropdowns", url: dropdownsPath },
      { name: "Modals", url: modalsPath },
      { name: "Tooltips", url: tooltipsPath },
    ],
  },
  {
    header: "Utilities",
    links: [
      { name: "Color", url: colorPath },
      { name: "Display", url: displayPath },
      { name: "Text", url: textPath },
    ],
  },
]
