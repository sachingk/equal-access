'use strict';

var path = require("path");
var zombie = require("zombie");
const aChecker = require("accessibility-checker");
var expect = require("chai").expect;
var browser = new zombie();

/** Temporary solution for output until reporting is completed */
aChecker.stringifyConsole = function(data) {
    var s = "\n";
    data.reports && data.reports.forEach(function(report) {
        report.issues.forEach(function(issue) {
            s += issue.level + 
                "\n\t" + issue.messageCode +
                "\n\t" + issue.xpath +
                "\n\t" + issue.snippet +
                "\n";
        });
    });
    return s;
}
// Describe this Suite of testscases, describe is a test Suite and 'it' is a testcase.
describe("Hello World Basics", function () {
    it("HomePage", function (done) {
        this.timeout(0);
        var sample = path.join(__dirname, "..", "sample", "Hello.html");
        browser.visit("file://"+sample, function() {
            // Perform the accessibility scan using the IBMaScan Wrapper
            aChecker.getCompliance(browser.document, "HOME", function (data, doc) {
                expect(aChecker.assertCompliance(data)).to.equal(0, aChecker.stringifyConsole(data));
                done();
            });
        });
    });

    it("Hompage, Show Card", function (done) {
        browser.clickLink("#clickMe", function() {
            // Perform the accessibility scan using the IBMaScan Wrapper
            aChecker.getCompliance(browser.document, "HOME_CARD", function (data, doc) {
                expect(aChecker.assertCompliance(data)).to.equal(0, aChecker.stringifyConsole(data));
                done();
            });
        });

    });
});
