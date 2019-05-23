// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        color: '#3aa757'
    }, function() {
        console.log("The color is green.");
    });
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.greeting == "take_screenshot"){
	      	chrome.tabs.captureVisibleTab(null, {}, function (image) {
	      		sendResponse({farewell: image});
	      		// console.log('Screen!', image)
			   // You can add that image HTML5 canvas, or Element.
			});
	     }
	    console.log(sender.tab ?
	                "from a content script:" + sender.tab.url :
	                "from the extension");
	    if (request.greeting == "hello") {
	    	sendResponse({farewell: "g2oodbye"});
// chrome.tabs.captureVisibleTab(null, {}, function (image) {
// 	      		sendResponse({farewell: 'image'});
// 	      		console.log('Screen!', image)
// 			   // You can add that image HTML5 canvas, or Element.
// 			});
	      // sendResponse({farewell: "goodbye"});

	    }
	    return true;
  });

/*  chrome.runtime.onMessage.addListener(
    function(message, callback) {
      		console.log('message!', message)

      if (message == "1337"){
      	chrome.tabs.captureVisibleTab(null, {}, function (image) {
      		console.log('Screen!', image)
		   // You can add that image HTML5 canvas, or Element.
		});
        // chrome.tabs.executeScript({
        //   code: 'document.body.style.backgroundColor="orange"'
        // });
      }
   });
*/



chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
                hostEquals: 'developer.chrome.com'
            },
        })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

