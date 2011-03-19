var functions, i;
functions = document.getElementsByTagName("func");
for (i = 0; i < functions.length; i++) {
	n = functions[i].getAttribute("name");
	functions[i].parentNode[n] = Function("args", functions[i].textContent);
}

Node.prototype.call = function(name, args) {
	this[name](args);
}

Node.prototype.get = function(n) {
	var j, node;
	for (j = 0; j < this.childNodes.length; j++) {
		node = this.childNodes[j];
		if (node.localName == "var" && node.getAttribute("name") == n) {
			return node.textContent;
		}
	}
}

Node.prototype.set = function(n, v) {
	var j, node;
	for (j = 0; j < this.childNodes.length; j++) {
		node = this.childNodes[j];
		if (node.localName == "var" && node.getAttribute("name") == n) {
			node.textContent = v;
		}
	}
}

document.getElementsByTagName("div")[0].addEventListener('click', function() {
	this.call('bar', {x: 3});
}, false);
