/* ES6 syntax */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { InvitationForm, ConfirmationMessage } from './invitationForm';
import * as helperModule from './helper';

/****************************
 * Main Content
 ****************************/
export class Content extends React.Component {
    constructor(props, context) {
        super(props, context);

        this._siteTitle = this.props.siteTitle;
        this._row1 = "A Better Way";
        this._row2 = "To Enjoy Everyday";
        this._row3 = "Be the first to know when we launch";
        this._btnLabel = "Request an invite";
        this._popUpPlaceholder = null;
        this._requestInviteBtn = null;

        this.popUpComponent = this.popUpComponent.bind(this);
    }
    componentDidMount() {
        this._popUpPlaceholder = document.getElementById("popUpPlaceholder");
        this._requestInviteBtn = document.getElementById("requestInviteBtn");

        let popUpComponent = this.popUpComponent;
        helperModule.crossBrowserAddEventListener(this._requestInviteBtn, "click", function() {
            popUpComponent("InvitationForm", true);
        });
    }
    popUpComponent(whichComponent, mount) {
        switch(whichComponent) {
            case "InvitationForm":
                if(mount) {
                    ReactDOM.render(<InvitationForm triggerPopUpComponentMethod={ this.popUpComponent }/>,
                                    this._popUpPlaceholder);
                } else {
                    ReactDOM.unmountComponentAtNode(this._popUpPlaceholder);
                }
                break;
            case "ConfirmationMessage":
                if(mount) {
                  ReactDOM.render(<ConfirmationMessage siteTitle={ this._siteTitle }
                                                       triggerPopUpComponentMethod={ this.popUpComponent }/>,
                                  this._popUpPlaceholder);
                } else {
                  ReactDOM.unmountComponentAtNode(this._popUpPlaceholder);
                }
                break;
        }
    }
    render() {
        return (
          <section>
            <div id="mainContentContainer" className="container">
                <br/>
                <div>{ this._row1 }</div>
                <div>{ this._row2 }</div>
                <div>{ this._row3 }</div>
                <div id="requestInviteBtn">{ this._btnLabel }</div>
                <div id="popUpPlaceholder"></div>
            </div>
          </section>
        );
    }
}
