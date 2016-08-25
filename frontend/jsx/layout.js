/* ES6 syntax */
import React from 'react';
import ReactDOM from 'react-dom';

import { Content } from './content';

/****************************
 * Main Layout
 ****************************/
class Layout extends React.Component {
    render() {
        return (
          <article>
              <Header siteTitle={ this.props.siteTitle } />
              <Content siteTitle={ this.props.siteTitle } />
              <Footer siteTitle={ this.props.siteTitle } />
          </article>
        );
    }
}

/****************************
 * Header
 ****************************/
class Header extends React.Component {
    constructor(props, context) {
        super(props, context);

        this._siteTitle = this.props.siteTitle;
    }
    render() {
        return (
          <header>
              <nav id="fixed-navbar" className="navbar navbar-default navbar-fixed-top" role="navigation">
                  <div className="container">
                      <div className="navbar-header">
                          <a className="navbar-brand" href="#">{ this._siteTitle }</a>
                      </div>
                  </div>
              </nav>
              <div className="container">
                <div className="masthead">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2 className="text-muted">{ this._siteTitle }</h2>
                            <hr/>
                        </div>
                    </div>
                </div>
              </div>
          </header>
        );
    }
}

/****************************
 * Sticky Footer
 ****************************/
class Footer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this._siteTitle = this.props.siteTitle;
        this._year = new Date().getFullYear();
    }
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div id="footerMsg" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            Made with <span className="glyphicon glyphicon-heart"></span> in Melbourne.
                            <br/>
                            &#169; { this._year } { this._siteTitle } All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

ReactDOM.render(<Layout siteTitle={ "Broccoli & Co." }/>, document.getElementById('bodyPlaceholder'));
