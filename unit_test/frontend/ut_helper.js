/**
 * Note :
 * This unit test mock is meant to demonstrate my knowledge in unit testing
 * principle, and not meant to be part of the core source code.
 * Therefore, I've decided not to spend extra time to make the source code to be
 * very organised. Expect plenty of repetitions in this source code.
 *
 */
export default class UtestHelperModule {
    constructor(helperModule) {
        this._helperModule = helperModule;

        console.log("******Performing Unit Test on the 'HelperModule'******");
    }
    runTestSuites() {
        let _testResultReport = null;
        console.log("******TEST RESULT******");

        _testResultReport = this.isAlphabeticalOnlyTestSuite();
        console.log("Function Name : 'isAlphabeticalOnly'");
        console.log("Total executed Test Cases : " + _testResultReport.total +
                    " - Pass : " + _testResultReport.pass +
                    " - Fail : " + _testResultReport.fail);
        if (_testResultReport.fail > 0) {
            console.log("Failed Test Cases : " + _testResultReport.failedTestCases);
        }
        console.log("**********************");
        _testResultReport = this.isValidEmailFormatTestSuite();
        console.log("Function Name : 'isValidEmailFormat'");
        console.log("Total executed Test Cases : " + _testResultReport.total +
                    " - Pass : " + _testResultReport.pass +
                    " - Fail : " + _testResultReport.fail);
        if (_testResultReport.fail > 0) {
            console.log("Failed Test Cases : " + _testResultReport.failedTestCases);
        }
        console.log("******End Unit Test Execution for the 'HelperModule'******");
    }
    isAlphabeticalOnlyTestSuite() {
        let _testResult = {
            "total" : 0, "pass" : 0, "fail" : 0, "failedTestCases" : []
        }

        // test case 1
        if (this.testCase1_1()) {
            _testResult.pass += 1;
        } else {
            _testResult.fail += 1;
            _testResult.failedTestCases.push("1");
        }
        _testResult.total += 1;
        // test case 2
        if (this.testCase1_2()) {
            _testResult.pass += 1;
        } else {
            _testResult.fail += 1;
            _testResult.failedTestCases.push("2");
        }
        _testResult.total += 1;
        // test case 3
        if (this.testCase1_3()) {
            _testResult.pass += 1;
        } else {
            _testResult.fail += 1;
            _testResult.failedTestCases.push("3");
        }
        _testResult.total += 1;
        // test case 4
        if (this.testCase1_4()) {
            _testResult.pass += 1;
        } else {
            _testResult.fail += 1;
            _testResult.failedTestCases.push("4");
        }
        _testResult.total += 1;

        return _testResult;
    }
    isValidEmailFormatTestSuite() {
        let _testResult = {
            "total" : 0, "pass" : 0, "fail" : 0, "failedTestCases" : []
        }

        // test case 1
        if (this.testCase2_1()) {
            _testResult.pass += 1;
        } else {
            _testResult.fail += 1;
            _testResult.failedTestCases.push("1");
        }
        _testResult.total += 1;
        // test case 2
        if (this.testCase2_2()) {
            _testResult.pass += 1;
        } else {
            _testResult.fail += 1;
            _testResult.failedTestCases.push("2");
        }
        _testResult.total += 1;
        // test case 3
        if (this.testCase2_3()) {
            _testResult.pass += 1;
        } else {
            _testResult.fail += 1;
            _testResult.failedTestCases.push("3");
        }
        _testResult.total += 1;

        return _testResult;
    }

    // isAlphabeticalOnlyTestSuite - test case 1
    testCase1_1() {
        let _verdict = false;
        let _tc1 = this._helperModule.isAlphabeticalOnly("yudiman");
        if (_tc1) {
            // passed the test
            _verdict = true;
        }

        return _verdict;
    }
    // isAlphabeticalOnlyTestSuite - test case 2
    testCase1_2() {
        let _verdict = false;
        let _tc2 = this._helperModule.isAlphabeticalOnly(" yudiman kwanmas ");
        if (!_tc2) {
            // passed the test
            _verdict = true;
        }

        return _verdict;
    }
    // isAlphabeticalOnlyTestSuite - test case 3
    testCase1_3() {
        let _verdict = false;
        let _tc3 = this._helperModule.isAlphabeticalOnly(" yudi 012 ");
        if (!_tc3) {
            // passed the test
            _verdict = true;
        }

        return _verdict;
    }
    // isAlphabeticalOnlyTestSuite - test case 4
    testCase1_4() {
        let _verdict = false;
        let _sample = " yudi kwanmas ".trim().replace(/ /g, "");
        let _tc4 = this._helperModule.isAlphabeticalOnly(_sample);
        if (_tc4) {
            // passed the test
            _verdict = true;
        }

        return _verdict;
    }
    // isValidEmailFormatTestSuite - test case 1
    testCase2_1() {
        let _verdict = false;
        let _tc = this._helperModule.isValidEmailFormat("yudi@test.com");
        if (_tc) {
            // passed the test
            _verdict = true;
        }

        return _verdict;
    }
    // isValidEmailFormatTestSuite - test case 2
    testCase2_2() {
        let _verdict = false;
        let _tc = this._helperModule.isValidEmailFormat("yudi@test");
        if (!_tc) {
            // passed the test
            _verdict = true;
        }

        return _verdict;
    }
    // isValidEmailFormatTestSuite - test case 3
    testCase2_3() {
        let _verdict = false;
        let _tc = this._helperModule.isValidEmailFormat("yudi@test.c");
        if (!_tc) {
            // passed the test
            _verdict = true;
        }

        return _verdict;
    }
}
