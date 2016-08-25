/* ES6 syntax */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import * as helperModule from './helper';

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

/****************************
 * The form
 ****************************/
export class InvitationForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.userInputsValidated = this.userInputsValidated.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.sendBtnClickedHandler = this.sendBtnClickedHandler.bind(this);

        this._requestUrl = "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

        this._triggerPopUpComponentMethod = this.props.triggerPopUpComponentMethod;

        this._inputs = { name : null, email : null, confirmEmail : null };
        this._submitBtn = null;
        this._errMsg = null;
        this._triggerSubmission = false;

        this._fieldEmptyErrMsg = "All fields are required.";
        this._alphabeticalOnlyErrMsg = "Name can only contain alphabet char.";
        this._confirmEmailErrMsg = "Email address is not confirmed.";
        this._emailErrMsg = "Not a valid email address format.";
        this._nameLengthErrMsg = "Name must be at least 3 chars long.";
        // the error msg below can be replaced with "Email address is not available" to
        // address the used email address case (e.g usedemail@airwallex.com).
        this._400ErrMsg = "Error 400 - Bad Request.";
        this._checkNetConnErrMsg = "Please check your network connection."
    }
    componentDidMount() {
        this._submitBtn = document.getElementById("requestInvitationSendBtn");
        this._errMsg = document.getElementById("requestInvitationErrMsg");
        this._inputs = { name : document.getElementById("inputName"),
                         email : document.getElementById("inputEmail"),
                         confirmEmail : document.getElementById("inputConfirmEmail") };

        helperModule.crossBrowserAddEventListener(this._submitBtn, "click", this.sendBtnClickedHandler);
    }
    sendBtnClickedHandler() {
        /* hint :
         * in order for removeEventListener to work, the specified callback function in removeEventListener
         * must be the same as in the addEventListener. For this reason, the callback function can't be
         * anonymous.
         */
        if (this.userInputsValidated()) {
            helperModule.crossBrowserRemoveEventListener(this._submitBtn, "click", this.sendBtnClickedHandler);
            this._submitBtn.className = "activeInvitationBtn";
            this._submitBtn.innerHTML = "Sending, please wait...";
            this.handleSubmission();
        }
    }
    userInputsValidated() {
        let testCaseVerdicts = [false, false, false, false, false, false, false];
        let finalVerdict = true;

        this._errorColour = "red";
        this._defaultColour = "#777";
        this._borderErrorAppearance = "1px solid " + this._errorColour;
        this._borderDefaultAppearance = "1px solid " + this._defaultColour;

        this._errMsg.innerHTML = "";
        this._inputs.name.style.border = this._borderDefaultAppearance;
        this._inputs.name.style.color = this._defaultColour;
        this._inputs.email.style.border = this._borderDefaultAppearance;
        this._inputs.email.style.color = this._defaultColour;
        this._inputs.confirmEmail.style.border = this._borderDefaultAppearance;
        this._inputs.confirmEmail.style.color = this._defaultColour;

        // test 1 - is this._inputs.name empty?
        if ( !this._inputs.name.value.trim() ) {
            this._inputs.name.style.border = this._borderErrorAppearance;
            this._errMsg.innerHTML = this._fieldEmptyErrMsg;
        } else {
            testCaseVerdicts[0] = true;
        }
        // test 2 - is this._inputs.email empty?
        if ( !this._inputs.email.value.trim() ) {
            this._inputs.email.style.border = this._borderErrorAppearance;
            this._errMsg.innerHTML = this._fieldEmptyErrMsg;
        } else {
            testCaseVerdicts[1] = true;
        }
        // test 3 - is this._inputs.confirmEmail empty?
        if ( !this._inputs.confirmEmail.value.trim() ) {
            this._inputs.confirmEmail.style.border = this._borderErrorAppearance;
            this._errMsg.innerHTML = this._fieldEmptyErrMsg;
        } else {
            testCaseVerdicts[2] = true;
        }

        if ( testCaseVerdicts[0] && testCaseVerdicts[1] && testCaseVerdicts[2] ) {
            // test 4 - is this._inputs.name contains alphabetical char only & at least 3 chars long ?
            if ( !helperModule.isAlphabeticalOnly( this._inputs.name.value.trim().replace(/ /g,"") ) ) {
                this._inputs.name.style.border = this._borderErrorAppearance;
                this._inputs.name.style.color = this._errorColour;
                this._errMsg.innerHTML = this._alphabeticalOnlyErrMsg;
            } else {
                testCaseVerdicts[3] = true;
            }

            // test 5 - is this._inputs.confirmEmail === this._inputs.email?
            if ( this._inputs.confirmEmail.value !== this._inputs.email.value ) {
                this._inputs.confirmEmail.style.border = this._borderErrorAppearance;
                this._inputs.confirmEmail.style.color = this._errorColour;
                this._errMsg.innerHTML = this._confirmEmailErrMsg;
            } else {
                testCaseVerdicts[4] = true;
            }

            // test 6 - is this._inputs.email has a valid format?
            if ( !helperModule.isValidEmailFormat(this._inputs.email.value) ) {
                this._inputs.email.style.border = this._borderErrorAppearance;
                this._inputs.email.style.color = this._errorColour;
                this._errMsg.innerHTML = this._emailErrMsg;
            } else {
                testCaseVerdicts[5] = true;
            }

            // test 7 - is this._inputs.name contains at least 3 chars?
            if ( this._inputs.name.value.trim().length < 3 ) {
                this._inputs.name.style.border = this._borderErrorAppearance;
                this._inputs.name.style.color = this._errorColour;
                this._errMsg.innerHTML = this._nameLengthErrMsg;
            } else {
                testCaseVerdicts[6] = true;
            }
        }

        for (let i=0; i<testCaseVerdicts.length; i++) {
          if (!testCaseVerdicts[i]) { finalVerdict = false; break; }
        }

        return finalVerdict;
    }
    handleSubmission() {
        /************************* Attention! **************************
         * Read the 1st point of the "Technical Consideration" comments
         * in the main.js for an explanation of the AJAX request approach
         * below.
         */
        /***************************** End *****************************/
        // construct the payload
        let payload = JSON.stringify({ "name" : this._inputs.name.value, "email" : this._inputs.email.value });

        // perform AJAX request to the server
        jQuery.ajax({
            url: this._requestUrl, type: "POST",
            dataType: "json", contentType: "json",
            //dataType: "text", contentType: "text",
            data: payload,
            success: function(data) {
                if (data.length > 0) {
                  this._inputs.email.style.border = this._borderDefaultAppearance;
                  this._inputs.email.style.color = this._defaultColour;
                  this._errMsg.innerHTML = "";
                  this._triggerPopUpComponentMethod("InvitationForm", false);
                  this._triggerPopUpComponentMethod("ConfirmationMessage", true);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr.status.toString() + "-" + status + "-" + err);
                switch(xhr.status.toString()) {
                  case "0" :
                      this._errMsg.innerHTML = this._checkNetConnErrMsg;
                      // re-enable the send button
                      helperModule.crossBrowserAddEventListener(this._submitBtn, "click", this.sendBtnClickedHandler);
                      this._submitBtn.className = "invitationBtn";
                      this._submitBtn.innerHTML = "Send";
                      break;
                  case "400" :
                      console.error(err);
                      this._inputs.email.style.border = this._borderErrorAppearance;
                      this._inputs.email.style.color = this._errorColour;
                      this._errMsg.innerHTML = this._400ErrMsg;
                      break;
                }
            }.bind(this),
        });
    }
    render() {
        return(
          <div>
              <ReactCSSTransitionGroup transitionName="fadeAnim"
                                       transitionAppear={true} transitionAppearTimeout={150}
                                       transitionEnter={false} transitionLeave={false}>
                  <div id="invitationForm" className="invitationFormPlaceholder">
                      <div>
                          <div>Request an invite</div>
                          <hr/>
                          <form role="form">
                              <input type="text" id="inputName" className="form-control" placeholder="Full name"/>
                              <input type="text" id="inputEmail" className="form-control" placeholder="Email"/>
                              <input type="text" id="inputConfirmEmail" className="form-control" placeholder="Confirm Email"/>
                              <div id="requestInvitationSendBtn" className="invitationBtn">Send</div>
                              <div id="requestInvitationErrMsg"></div>
                          </form>
                      </div>
                  </div>
              </ReactCSSTransitionGroup>
          </div>
        );
    }
}

/****************************
 * The confirmation message
 ****************************/
export class ConfirmationMessage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this._siteTitle = this.props.siteTitle;
        this._headlineText = "All done!";
        this._bodyText1 = "You will be one of the first to experience";
        this._bodyText2 = this._siteTitle + " when we launch.";
        this._btnLabel = "Ok";
        this._confirmMsgBtn = null;
    }
    componentDidMount() {
        this._confirmMsgBtn = document.getElementById("confirmMsgBtn");

        let triggerPopUpComponentMethod = this.props.triggerPopUpComponentMethod;
        helperModule.crossBrowserAddEventListener(this._confirmMsgBtn, "click", function() {
            triggerPopUpComponentMethod("ConfirmationMessage", false);
        });
    }
    render() {
        return(
          <div id="invitationFormConfirmationMsg" className="invitationFormPlaceholder">
              <div>
                  <div>{ this._headlineText }</div>
                  <hr/>
                  <div>{ this._bodyText1 }</div>
                  <div>{ this._bodyText2 }</div>
                  <div id="confirmMsgBtn" className="invitationBtn">{ this._btnLabel }</div>
              </div>
          </div>
        );
    }
}
