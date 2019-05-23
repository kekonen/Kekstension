console.log('allo!')


class Website {
	constructor(toBeginWith) {
		


		this.result = toBeginWith(this)
	}


}

const between = (down, up, test) => {
	const [minX, maxX] = [down.x, up.x].sort((a, b) => a-b)
	const [minY, maxY] = [down.y, up.y].sort((a, b) => a-b)

	console.log([minX, maxX],[minY, maxY])

	console.log(`${test.y} >= ${minY} && ${test.y} <= ${maxY} && ${test.x} >= ${minX} && ${test.x} <= ${maxX}`)
	return test.y >= minY && test.y <= maxY && test.x >= minX && test.x <= maxX
}

const w = new Website((newMe) => {

	chrome.runtime.sendMessage('bhegkggallhineikfpnflaiebalkbinc' ,{greeting: "hello"}, function(response) {
  console.log('got', response);
});

	newMe.button = {
		clicks: 0,
		finished: false,
		step: 0
	}

	document.onclick = function(e)
	{
	    const x = e.pageX;
	    const y = e.pageY;

	    if (newMe.button.clicks++ > 4 /*2*/) newMe.button.finished = true

	    if (newMe.button && !newMe.button.finished && newMe.button.step == 2) {
	    	newMe.button.step = 3
	    	console.log('s', newMe.button.step)
	    } else if (newMe.button && !newMe.button.finished && newMe.button.step == 3) {
    		console.log('s', newMe.button.step)
    		//                                  HERE
	    	if (between(newMe.button.down, newMe.button.up, {x, y})) {
	    		newMe.button.finished = true // TODO: move this up 1
	    		newMe.button.step = 4
	    		console.log("Captured (" , newMe.button.down, newMe.button.up, {x, y}, ")")
	    		chrome.runtime.sendMessage('bhegkggallhineikfpnflaiebalkbinc' ,{greeting: "take_screenshot"}, function(response) {
  					document.getElementsByTagName('img')[1].src = response.farewell
  					console.log('got', response);
				});
	    	}
	    }
	    
	    console.log('Click!', {x, y})
	    
	};

	document.onmousedown = function(e)
	{
	    const x = e.pageX;
	    const y = e.pageY;
	    console.log("User hold DOWN at position (" + x + "," + y + ")")

	    if (newMe.button && !newMe.button.finished && newMe.button.step == 0) {
	    	newMe.button.step = 1
	    	newMe.button.down = { x, y }
	    	console.log('s', newMe.button.step)
	    }
	    
	};

	document.onmouseup = function(e)
	{
	    const x = e.pageX;
	    const y = e.pageY;
	    console.log("User hold UP at position (" + x + "," + y + ")")

	    if (newMe.button && !newMe.button.finished && newMe.button.step == 1) {
	    	newMe.button.up = { x, y }
	    	newMe.button.step = 2
	    	console.log('s', newMe.button.step)
	    
	    }



	};

	return 'kek'
});


