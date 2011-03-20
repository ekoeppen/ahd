Node.prototype.parentLookup = function(element, name) {
    return undefined;
};

Node.prototype.prime = function (element) {
    var i, node;
    this.primed = true;
    for (i = 0; i < this.childNodes.length; i++) {
		node = this.childNodes[i];
		if (node.localName == "func") {
            this[node.getAttribute("name")] = new Function("args", node.textContent);
		}
    }
};

Node.prototype.noSuchMethod = function(name, args) {
    console.log("*** Error: called unknown function " + name);
};

Node.prototype.call$ = function(name, args) {
    var r, node;
    
    if (this[name]) {
	    r = this[name](args);
    } else if (this.primed) {
        node = this.parentLookup('func', name);
        if (node) node.call$(name, args); else this.noSuchMethod(name, args);
    } else {
        this.prime();
        this.call$(name, args);
    }
    return r;
};

Node.prototype.get$ = function(n) {
	var j, node;
	for (j = 0; j < this.childNodes.length; j++) {
		node = this.childNodes[j];
		if (node.localName == "var" && node.getAttribute("name") == n) {
			return node.textContent;
		}
	}
};

Node.prototype.set$ = function(n, v) {
	var j, node;
	for (j = 0; j < this.childNodes.length; j++) {
		node = this.childNodes[j];
		if (node.localName == "var" && node.getAttribute("name") == n) {
			node.textContent = v;
		}
	}
};

document.getElementsByTagName("div")[1].addEventListener('click', function() {
	this.call$('bar', {x: 3});
}, false);
