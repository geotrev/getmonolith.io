import React, { Component, Fragment } from "react"
import { Route } from "react-router-dom"
import "./Main.scss"

import { Nav, Footer } from "components"
import { Home, Docs, Examples } from "pages"

// favicons
import "assets/icons/favicon.ico"
import "assets/icons/favicon-32x32.png"
import "assets/icons/favicon-96x96.png"
// apple
import "assets/icons/apple-icon-57x57.png"
import "assets/icons/apple-icon-60x60.png"
import "assets/icons/apple-icon-72x72.png"
import "assets/icons/apple-icon-76x76.png"
import "assets/icons/apple-icon-114x114.png"
import "assets/icons/apple-icon-120x120.png"
import "assets/icons/apple-icon-144x144.png"
import "assets/icons/apple-icon-152x152.png"
import "assets/icons/apple-icon-180x180.png"
import "assets/icons/apple-icon-precomposed.png"
import "assets/icons/apple-icon.png"

// ms
import "assets/icons/ms-icon-70x70.png"
import "assets/icons/ms-icon-144x144.png"
import "assets/icons/ms-icon-150x150.png"
import "assets/icons/ms-icon-310x310.png"

// android
import "assets/icons/android-icon-36x36.png"
import "assets/icons/android-icon-48x48.png"
import "assets/icons/android-icon-72x72.png"
import "assets/icons/android-icon-96x96.png"
import "assets/icons/android-icon-144x144.png"
import "assets/icons/android-icon-192x192.png"

export default class Main extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <Nav />
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/docs" component={Docs} />
          <Route path="/examples/" component={Examples} />
        </main>
        <footer>
          <Footer />
        </footer>
      </Fragment>
    )
  }
}
