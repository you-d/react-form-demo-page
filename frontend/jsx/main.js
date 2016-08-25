'use strict';

import Layout from './layout.js';

/*******************************
 * Unit Test Suites
 *******************************
 * Use Developer Tool's console log in order to see the test results.
 * Uncomment the lines below to see the unit testing demo.
 *******************************/
//import * as helperModule from './helper';
//import UtestHelperModule from '../../unit_test/frontend/ut_helper';
//new UtestHelperModule(helperModule).runTestSuites();

/******************************************************************************
 * Technical consideration + pressumptions :
 *
 * - The web page has been tested in both Chrome and Firefox, but not in Internet Explorer.
 *   Although I don't expect the webpage will break down spectacularly once its displayed in
 *   IE, I do expect there will be some minor glitches once its shown in IE.
 *   This is due to the fact I use Ubuntu Linux - running as a Virtual Machine on top of OSX.
 *   Of course as we all know, IE is only available in Windows machines.
 *
 * - By design, the XmlHttp Post request will return the xhr.status code 0 to indicates
 *   that a connection can't be established. This can occur due to client machine is
 *   not connected to the internet (which happens frequently in end users scenario)
 *   or CORS have failed or not set up properly (which should never happen in
 *   end users scenario). If the page is hosted in the same domain as the API endpoint,
 *   then we wouldn't have to worry about CORS issue.
 *   However, within the context of this test. It may happen in this source code due to
 *   the index.html of this webpage is served over file instead of localhost. Since this
 *   is a pure front end test, I see no reason to incorporate node.JS in my source code.
 *   The page can simply be shown by opening the index.html file in a web browser.
 *   Serving a web page over file doesn't guarantee that the CORS of the page will
 *   work properly.
 *
 * - Not using the "ref" string attribute.
 *   Based on the information provided in the React Guides, the string refs
 *   will be deprecated at some point in the future. Therefore, I've stopped
 *   using the "ref" string attribute to uniquely identify DOM elements. Instead
 *   I rely on the "id" attribute, and utilise the plain EcmaScript
 *   function of obtaining the DOM object (document.getElementById).
 *
 * - Instead of relying on the "display" css attribute to show/hide the popup
 *   window (the form, & the confirmation block), I utilise the ReactDOM
 *   render, and unmountComponentAtNode methods. With this approach, tech savvy
 *   users will not be able to utilise Firebug/Google Developer tool to show any
 *   popup windows on the page.
 *
 * - I minimise my reliance of jQuery. Whenever possible, I utilise the native
 *   javascript when performing DOM manipulations. The only exception is when
 *   the web app performs AJAX request to the server. It is much simpler to use
 *   jQuery Ajax method instead of the native XmlHttpRequest method.
 *
 * - It's possible to call the passed React properties (this.props.<prop name>)
 *   anywhere in a React component. However my personal coding style preference is
 *   to have a centralised place to obtain the passed React properties. This is
 *   the main reason every React component class in my source code has a JS
 *   constructor. The benefit of this approach is it will be easier for people
 *   (including myself) to find all React properties being passed into a specific
 *   React class.
 *
 * - If the Heart icon is not showing up in your Firefox browser :
 *   Firefox has a strict setting that prevents the HTML file from accessing
 *   web fonts from folders not on the root. This only happens if we work locally
 *   and not from files on the server. One solution is to obtain the bootstrap css
 *   from the CDN. However, since I would prefer for my page to looks nice even
 *   though when the client machine is offline, I can't settle with this solution.
 *   Hence in order to be able to see the icon if you are serving this webpage from
 *   file, a certain setting in the Firefox will need to be changed.
 *   step 1. open "about:config" in Firefox.
 *   step 2. Search for "security.fileuri.strict_origin_policy" property, and change
 *           it from true to false.
 *   Ref: http://www.stackoverflow/questions/19085942/boootstrap-glyphicons-firefox-issues
 *****************************************************************************/
