# Node.js_Fundamentals

This is Node.js_Fundamentals

### Keywords

<ul>
    <ol><b>1. Asynchronous Event-Driven JS Runtime</b></ol>
    <ol>
        <b>2. Scalable Network Applications</b>
    </ol>
    <ol>
        <b>3. Event-Loop</b>
    </ol>
    <ol>
        <b>4. Non-Blocking</b>
    </ol>
    <ol>
        <b>5. HTTP is a First-Citizen in Node.js</b>
    </ol>
</ul>

<ul>
    <li>Node is a runtime environment for executing JS code</li>
    <li>Essentially, Node is a C++ program that embeds Chrome's v8 engine, the fastest JS engine in the world.</li>
    <li>We use Node to build fast and scalable networking applications. It's a perfect choice for building RESTful services</li>
    <li>Node applications are single-threaded. That means a single thread is used to serve all clients</li>
    <li>Node applications are <b>asynchronous or non-blocking by default</b>. That means when the application involves I/O operations (e.g. accessing the file system or the network), <b>the thread doesn't wait (or block) for the result of the operation. It is released to serve other clients</b></li>
    <li>This architecture makes Node ideal for building I/O-Intensive applications</li>
    <li>In Node, we don't have browser environment objects, such as window or the document object. Instead, we have other objects that are not available in browsers, such as objects for working with the file system, network, operating system, etc</li>
    <li>You should avoid using Node for<b>CPU-Intensive</b>application, such as a <b>video encoding service.</b>Because while executing these operations, other clients have to wait for the single thread to finish its job and be ready to serve them.</li>
</ul>

# Node Module System

<ul>
    <li>We don't have the window object in Node</li>
    <li>The global object in Node is <b>"global"</b></li>
    <li>Unlike browser application, variables we define are not added to the <b>"global"</b> object</li>
    <li><b>Every file in a Node application is a module. Node automatically wraps the code in each file with an IIFE(Immediately-Invoked Function Expression) to create scope. So variables and functions defined in one file are only scoped to that file and not visible to other files unless explicitly exported</b></li>
    <li><b>To export a variable or function from a module, you need to add them to </b>
    <br>module.exports:
    <br>module.exports.sayHello = sayHello;
    </li>
    <li>To load a module, use the <b>require</b> function. This function returns the <b>module.exports object</b> exported from the target module:
    <br>
    const logger = require('./logger');
    </li>
    <li>Node has a few built-in modules that enable us to work with the file system, path objects, network, operating system, etc</li>
    <li><b>EventEmitter</b> is one of the core classes in Node that allows us to raise <b>(emit)</b> and handle events. Several built-in classes in Node derive from <b>EventEmitter</b></li>
    <li>To create a class with the ability to raise events, we should extend <b><br>EventEmitter: <br> class Logger extends EventEmitter {}</b></li>
</ul>

# NPM Recap

<ul>
<li>Every Node application has a <b>package.json</b> file that includes <b>metadata</b> about the application. This includes the name of the application, its version, dependencies, etc</li>
<li>We use NPM to download and install 3rd-party packages from NPM registry.</li>
<li>All the installed packages and their dependencies are stored under <b>node_modules</b>folders. This folder should be executed from the source control.</li> 
<li>Node packages follow semantic versioning: major.minor.patch</li>
<li>Useful NPM commands are:</li>
</ul>

```javascript
// Install a package
npm install <packageName>

// Install a specific version of a package
npm install <packageName>@<version>

// Install a package as a development dependency
npm i <packageName> --save-dev

// Uninstall a package
npm uninstall <packageName>

// List installed packages
npm list --depth=0

// View outdated packages
npm outdated

// Update packages
npm update

- To install/uninstall packages globally, use -g flag.
```

