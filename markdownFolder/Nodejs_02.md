# Node.js: 

<ul>
    <ol>1. What is it?</ol>
    <ol>2. When to use it?</ol>
    <ol>3. How to use it?</ol>
    <ol>4. Why should I use it?</ol>
</ul>

# Node.js 관련해 자주 들어본 문장들

<ul>
    <ol><b>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine</b></ol>
    <ol><b>Node.js uses an event-driven, asynchronous non-blocking I/O model</b></ol>
    <ol><b>Node.js operates on a single thread event loop</b></ol>
</ul>

# I/O (Input / Output)

**I/O**: refers primarily to the program's interaction with **the system's disk** and **network**.

Examples of I/O operations include **reading/writing** data from /to a disk, making **HTTP requests**, and **talking to databases**. They are very slow compared to accessing memory **(RAM)** or doing work on the **CPU**.

# Synchronous vs Asynchronous

**Synchronous (or sync)** executing usually refers to code executing **in sequence** (차례로). In sync programming, the program is executed line by line, one line at a time. Each time a function is called, the program execution waits until that function returns before continuing to the next line of code.

1. 차례로 line by line 실행
2. 함수 실행시 그 함수가 값을 return 하기 전까지 기다리기
3. 그 후에 다음 줄 실행

**예시**: 식당 => 손님 들어옴 => 손님이 주문함 => 점원이 주문을 받음 => 점원이 주방에 주문을 전달함 => 새로운 손님 들어옴 => 점원은 처음 온 손님의 요리가 제공될 때까지 주문을 받지않고 기다림.

**Asynchronous (or async)** execution refers to execution that doesn't run in the sequence it appears in the code. In **async** programming the program doesn't wait for the task to complete and move on to the next task.

1. 차례로 line by line 실행되지 않는다
2. 비동기 프로그램은 다음 수행을 완료되기를 기다리지 않는다

**예시**: 식당 => 손님1 들어옴 => 손님1 주문함 => 점원이 손님1 주문을 받음 => 점원이 주방에 손님1 주문을 전달함 => 주방에서 손님1 요리를 조리하는 동안 => 손님2 들어옴 => 점원은 손님1의 요리가 제공되기 전 손님2의 주문을 받음 => 그리고 손님1 요리를 조리하는 동안 => 손님2 주문을 주방에 전달함 => 만약 손님2의 요리가 먼저 만들어지면 => 손님2 에게도 먼저 줄 수 있음 (손님1의 요리가 절대적으로 시간이 걸리는 요리라서) => 

```javascript
// Synchronous: 1, 2, 3
alert(1);
alert(2);
alert(3);

// Asynchronous: 1, 3, 2
alert(1);
setTimeout(() => alert(2), 0);
alert(3);
```

An asnyc operation is often I/O related, although **setTimeout** is an example of something that isn't I/O but still async. Generally speaking, anything computation-related is sync and anything input/output/timing-related is async. The reason for I/O operations to be done asynchronously is that they are very slow and would block further execution of code otherwise.

보통 I/O Operations 들은 일반적으로 꽤 속도가 오래 걸리기 때문에 I/O Operations 동작 동안에 나머지 Thread를 일부 다른 동작에 할당에 사용할 수 있다.

# Blocking vs Non-blocking

Blocking refers to operations that block further execution until that operation finishes while non-blocking refers to code that doesn't block execution. Or as Node.js docs puts it, blocking is the execution of additional JavaScript in the Node.js process must wait until a non-additional JavaScript in the Node.js process must wait until a non-JavaScript operation completes.

**Blocking** methods execute synchronously while **non-blocking** methods execute asynchronously.

```javascript
// Blocking
const fs = require("fs");
const data = fs.readFileSync('/file.md'); // blocks here until file is read
console.log(data);
moreWork(); // will run after console.log.....

// Non-Blocking
const fs = require("fs");
fs.readFile('/file.md', (err, data) => {
    if(err) throw err;
    console.log(data);
});
moreWork(); // will run before console.log.....
```

In the first example above, **console.log** will be called before **moreWork()**. 

In the second example above, **fs.readFile()** is non-blocking so JavaScript execution can continue and **moreWork()** will be called first.

In Node, non-blocking primarily refers to I/O Operations, and JavaScript that exhibits poor performance due to being CPU intensive rather than waiting on a non-JavaScript operation, such as I/O, isn't typically referred to as blocking.

All of the I/O methods in the Node.js standard library provide async versions, which are non-blocking, and accept callback functions. Some methods also have blocking counterparts, which have names that end with Sync.

**Non-blocking I/O operations allow a single process to serve multiple requests at the same time.** Instead of the process being blocked and waiting for I/O operations to complete, the I/O operations are delegated (위임하다) to the system, so that the process can execute the next piece of code. **Non-blocking I/O operations provide a callback function that is called when the operation is completed.**

**Non-blocking** = I/O operations + callback

# Callbacks

A **callback** is a function passed as an argument into another function, which can then be invoked (called back) inside the outer function to complete some kind of action at a convenient time. **The invocation may be immediate (sync callback) or it might happen at a later time (async callback)**.

(callback은 다른 함수의 인자로 전달하는 **함수**"이다)

```javascript
// Sync callback
function greetings(callback) {
    callback();
}

greetings(() => {console.log('Hi');});
moreWork(); // will run after console.log

// Async
const fs = require("fs");
// fs.readFile is an async method provided by Node
fs.readFile('/fild.md', function callback(err, data) {
    if(err) throw err;
    console.log(data);
});

moreWork(); // will run before console.log
```

In the first example above, the callback function is called immediately within the outer greetings function and logs to the console before **moreWork**() proceeds.

In the second example above, fs.readFile (an async method provided by Node) reads the file and when it finishes it calls the callback function with an error or the file content. In the meantime the program can continue code execution.

An async callback may be called when an event happens or when a task completes. It prevents blocking by allowing other code to be executed in the meantime.

https://github.com/maxogden/art-of-node#callbacks

Instead of the code reading top to bottom procedurally, async programs may execute different functions at different times based on the order and speed that earlier like http requests or file system reads happen. They are used when you don't know when some async operation will complete.

http://callbackhell.com/

You should avoid **"callback hell"**, a situation where callbacks are nested within other callbacks several levels deep, making the code difficult to understand, maintain and debug.

함수의 인자로 ==> 함수를 또 그 함수의 리턴값을 함수로 ==> 또 그 함수의 리턴값을 함수로...

# Events and Event-Driven Programming

**Events** are actions generated by the user or the system, like a click, a completed file download, or a hardware or software error.

**Event-Driven-Programming** is a programming paradigm in which the flow of the program is determined by events. An event-driven program performs actions in response to events. When an event occurs it triggers a callback function.

# Node.js: What is it, why was it created, and how does it work?

Node.js is a platform that executes server-side JavaScript programs that can communicate with I/O sources like **networks** and **file systems**.

https://www.youtube.com/watch?v=ztspvPYybIY

When Ryan Dahl created Node in 2009, he argued that I/O was being handled incorrectly, blocking the entire process due to synchronous programming.

Traditional web-serving techniques use the thread model

- meaning one thread for each request.

Since in an I/O operation the request spends most of the time waiting for it to complete, intensive I/O scenarios entail(수반하다) a large amount of unused resources (such as memory) linked to these threads. Therefore the "**one thread per request**" model for a server doesn't scale well. 

- 하나의 서버에서 하나의 request 당 하나의 thread는 서비스를 확장하기에 비적합한 방식이다 그래서 Node.js 가 등장했다.

Dhal argued that software should be able to do multi-task and proposed eliminating the time spent waiting for I/O results to come back. 

**Instead of the thread model, he said the right way to handle several concurrent connections was to have a single-thread, an event loop and non-blocking I/Os.**

For example, when you make a query to a database, **instead of waiting for the response you give it a callback so your execution can run through that statement and continue doing other things. When the results comes back you can execute the callback**.

https://nodejs.org/de/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop

The **event loop** is what allows Node.js to perform non-blocking I/O operations despite the fact that JavaScript is single-threaded. The loop, which runs on the same thread as the JavaScript code, grabs a task from the code and executes it. If the task is async or an I/O operation the loop offloads(짐을 덜다) it to the system kernel, like in the case for new connections to the server, or to a thread pool, like file system related operations. The loop then grabs the next task and executes it.

**Event Loop**의 존재가 Node.js가 Based on Single-Threaded임에도 불구하고 non-blocking I/O Operations을 가능하게해준다. **Event Loop**는 JavaScript와 동일한 thread에서 동작하면서 코드를 실행한다.

만약 수행하려는 동작/임무가 비동기 혹은 I/O operation 이라면, loop를 이용하면 이 수행하려는 동작/임무의 비중을 kernel로 덜 수 있다, 예를 들면, 서버로의 새로운 연결 혹은 thread pool의 경우, file system과 관련한 동작인 경우.  

Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background. When one of these operations completes (this is an event), the kernel tells Node.js so that the appropriate callback (the one that depended on the operation completing) may be added to the pool queue to eventually be executed.

대부분의 커널은 multi-threaded이기 때문에, background 에서 multiple operations을 다룰수있다. multiple operations 중 하나가 완수되면(event 가), kernel은 Node.js에 말해준다 적절한 callback이 호출되도록 그리고 pool queue에 호출된 callback을 더한다.

https://libuv.org/

To accommodate the single-threaded event loop, Node.js uses the **libuv** library, which, in turn, uses a fixed-sized thread pool that handles the execution of some of the non-blocking asynchronous I/O operations in parallel.

Single-threaded event loop를 수용하기위해, Node.js는 libuv library를 사용한다. 이 Library는 고정된 크기의 **thread pool**을 사용한다, 이 **thread pool**은 병렬로 **non-blocking asynchronous I/O operations**을 다루는데 사용한다.               

Inherently non-blocking system functions such as networking translate to kernel-side non-blocking sockets, while inherently blocking system functions such as file I/O run in a blocking way on their own threads.

본질적으로 non-blocking system 동작들 (networking)과 같은 것들은 kernel-side nonblocking sockets으로 이동한다, 반면에 본질적으로 blocking system 함수들 (예를 들면, file I/O)는 각자의 thread에서 blocking 방식으로 동작한다.

When a thread in the thread pool completes a task, it informs the main thread of this, which in turn, wakes up and executes the registered callback.

Thread pool에서 한 thread가 a task(임무 해야할 동작)을 완수했을때, thread는 본인이 속한 main thread에게 정보를 전달하고 차례로 registered callback을 동작시킨다.

1. Singled-Threaded 
2. libuv library
3. 고정된 thread pool크기
4. 병렬로 **non-blocking asynchronous I/O operations**
5. 본질적으로 non-blocking system 동작들 (networking)과 같은 것들은 kernel-side nonblocking sockets으로 이동한다 

6. Thread pool에서 한 thread가 a task(임무 해야할 동작)을 완수했을때, thread는 본인이 속한 main thread에게 정보를 전달하고 차례로 registered callback을 동작시킨다.

![eventLoop](C:\Users\user\Desktop\Yongsu_Nodejs_Study_Guide\images\eventLoop.jpeg)

https://www.youtube.com/watch?v=8aGhZQkoFbQ

According to the presentation, the call stack(aka execution stack or "the stack") is a data structure which records where in the program we are. If we step into a function, we put something onto the stack. If we step into a function, we put something onto the stack. If we return from a function, we pop it off the top of the stack.

#### This is how the code in the diagram is processed when we run it:

```javascript
console.log('Hi');

setTimeout(function cb() {
    console.log('there');
}, 5000);

console.log('JSConfEU');
```

1. Push **main()** onto the stack (the file itself)
2. Push **console.log('Hi');** onto the stack, which executes immediately logging "Hi" to the console and gets popped off the stack
3. Push **setTimeout(cb, 5000)** onto the stack. setTimeout is an API provided by the browser (on the backend it would be a Node API). When **setTimeout** is called with the callback function and delay arguments, the browser kicks off a time with the delay time.
4. The **setTimeout** call is completed and gets popped off the stack
5. Push **console.log('JSConfEU');** onto the stack, which executes immediately logging "JSConfEU" to the console and gets popped off the stack.
6. **main()** gets popped off the stack
7. After 5000 milliseconds the API timer completes and the callback gets moved to the task queue
8. **The event loop checks if the stack is empty** because JavaScript, being single-threaded, can only do one thing at a time (**setTimeout is not a guaranteed but a minimum time to execution**). If the stack is empty it(= event loop) takes the first thing on the queue and pushes it onto the stack.
9. The callback gets executed, logs "there" to the console and gets popped off the stack. And we are done....

If you want to go even deeper into the details on how Node.js, libuv, the event loop and the thread pool work, I suggest checking the resources on the reference section at the end, in particular [this](https://www.youtube.com/watch?v=cCOL7MC4Pl0), [this](https://www.youtube.com/watch?v=PNa9OMajw9w) and [this](https://www.youtube.com/watch?v=sGTRmPiXD4Y) along with the [Node docs](https://nodejs.org/de/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop).

https://www.youtube.com/watch?v=cCOL7MC4Pl0

https://www.youtube.com/watch?v=PNa9OMajw9w

https://www.youtube.com/watch?v=PNa9OMajw9w

https://nodejs.org/de/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop

![eventLoop2](C:\Users\user\Desktop\Yongsu_Nodejs_Study_Guide\images\eventLoop2.jpeg)

https://www.youtube.com/watch?v=PNa9OMajw9w

# Node.js: why and where to use it?

Since almost no function in Node directly performs I/O, the process never blocks (I/O operations are offloaded(짐을 덜다) and executed asynchronously in the system), making it a good choice to develop highly scalable systems.

**Due to its event-driven, single-threaded event loop and asynchronous non-blocking I/O model**, Node.js performs best on intense I/O applications requiring speed and scalability with lots of concurrent connections, like video & audio streaming, real-time apps, live chats, gaming apps, collaboration tools, or stock exchange software.

Node.js may not be the right choice for CPU intensive operations. Instead the traditional thread model may perform better.

C++언어의 cout / cin 등 처럼 직접적으로 input/output을 수행하는 함수를 거의 이해하지않기 때문에, Node가 결코 block되지 않는다(I/O 동작은 위 그림의 방식을 통해 수행정도를 덜고 그리고 시스템에서 비동기적으로 실행한다) 그리고 이러한 사항들이 Node를 이용하면 확장이용이한 시스템을 개발하기에 좋은 선택이 될 수 있다.

```c++
#include <iostream>
using namespace std;

int main()
{
	int i;
    cout << "Please enter an integer value: ";
    cin >> i;
    cout << "The value you entered is " << i;
}
```

# Summary

#### 1. Event-Driven
- 이벤트가 발생했을때, 해당 이벤트가 발생했을때 수행되도록 정의한 작업을 수행하는 방식. 

예를 들면)

```javascript
router.get('/login', function(req, res)) {
	res.send("Logged In!")           
}
```

**Event**: HTTP Request on the URL ("/login")

**EventEmitter**: res.send("Logged In!")

/login 이라는 HTTP 요청이 들어오면 res.send()를 호출하는 callback function가 실행된다.

- 발생한 Event는 순차적으로 처리되며, 발생한 Event가 없으면 대기한다, 
- Event Loop가 이벤트 처리 순서를 관리해준다.

#### 2. Event-Loop

- JavaScript은 Single-Threaded 기반이기 때문에

```javascript
console.log('H1')
console.log('H2')
console.log('H3')
```

- 위 코드를 실행하면, 위에서 아래로 순차적으로 실행된다.
- 하지만 중간에 오래걸리는 작업이 존재한다면, 해당 작업이 완료되기전까지 그 아래 작업은 진행되지 않는다(동기적: Synchronous Operation)

```javascript
console.log('H1')
TakeSomeTime() // 오래걸리는 작업
console.log('H2')
console.log('H3')
```

- 그렇다면 아래 코드의 호출 스택을 한 번 확인해보자

```javascript
function one() {
    two();
    console.log('One')
};

function two() {
    three();
    console.log("Two")
};

function three() {
    console.log("Three")
};

one();
```

![callStack](C:\Users\user\Desktop\Yongsu_Nodejs_Study_Guide\images\callStack.png)

- 이번에는 WebAPI Method 인 setTimeout function을 이용한 Call Stack을 생각해보자

```javascript
console.log("Start!");

setTimeout(function cb() {
    console.log('there');
}, 5000);

console.log("End!")

// 결과
start!
end!
(최소 5초이후) there

```

- JavaScript이 Single-Threaded 기반임에도 불구하고 Callback이 실행될 수 있는 이유는 Web환경에서 Thread를 제공해주는 API환경의 제공때문이다.
  - Ex) DOM(Document), Ajax, setTimeout)...

위 코드의 호출스택을 이해하기 위해 3가지 요소를 이해해야한다.

- 이벤트 루프(Event Loop): 이벤트 발생시, 콜백함수를 관리하고, 실행순서를 관리하는 역할
- 테스크 큐 (Task Queue): 이벤트 발생 후, 실행되어야 하는 작업들이 순차적으로 대기하는 공간
- 백그라운드(Background): Time, I/O, Event-listener, etc 

![callStack2](C:\Users\user\Desktop\Yongsu_Nodejs_Study_Guide\images\callStack2.png)

1. 먼저 실행 코드들이 호출스택에 쌓인다.

2. 실행 코드중 백그라운드가 필요한 작업은 백그라운드공간으로 이동하고, 순차적으로 호출스택이 진행된다.

3. 백그라운드에서 자체적으로 작업완료된 콜백함수는 태스크큐로 이동하여 대기한다.

4. 호출 스택들이 완료되면 이벤트 루프(Event Loop) 가 태스크 큐에 있는 콜백을 순서대로 호출스택에 올린다.

5. 호출스택이 완료되면 이벤트루프(Event Loop) 가 돌면서 태스크 큐에 있는 콜백을 실행시키고,

#### Non-Blocking I/O

- Non-Blocking I/O는 이전 작업이 완료될 때 까지, 기다리면서 멈추지 않고, 다음작업이 지연되지 않게 동작하는 Paradigm이다.
- 오래걸리는 작업은 Background에서 진행하며 완료 후, Event Loop 통해 Task Queue를 거쳐 Call Stack으로 올라오길 기다리는 방식이다.
- (시간이 많이 걸리는) 다른 컴퓨팅 자원에 접근하는 I/O(=파일 입/출력, 네트워크 등)에서 Non-Blocking 방식으로 채택된다.

```javascript
function longTimeTask() {
    // ...오래걸리는작업
    console.log("작업 끝");
}

console.log("시작");
longTimeTask();
console.log("끝, 다음작업");

// 결과
시작
작업끝
끝, 다음작업
```

위 코드는 오래 걸리는 작업이 없기 때문에 위 순차적으로 실행이 된다 하지만 오래 걸리는 작업의 함수가 있다면 그 내용이 달라진다.

```javascript
function longTimeTask() {
    // ...오래걸리는작업
    console.log("작업 끝");
}

console.log("시작");
setTimeout(longTimeTask(), 0);
console.log("끝, 다음작업");

// 결과
시작
끝, 다음작업
작업긑
```

위 코드는 오래걸리는 작업 (longTimeTask)를 Non-Blocking으로 처리하기때문에

다음작업까지, 기다리지않고 바로 실행된다.

#### Single-Thread

NodeJS는 Non-Blocking + Single Thread 로 동작한다

(사실 Nodejs는 내부적으로 Multiple Thread가 동작하지만, 개발자가 제어하는건 Single Thread다)

![thread](C:\Users\user\Desktop\Yongsu_Nodejs_Study_Guide\images\thread.png)

**주방**(**요리**) = I/O작업

**점원** = Thread(쓰레드)

**고객** = Request(요청)

위 그림은 Thread(점원)이 한 명이고 한 고객(Request)에 주문 => 요리 => 서빙 이 실행되지만, Non-Blocking을 채택하지 않아서, 다른 요청들 (고객2, 고객3)은 Thread(점원)의 순서가 올때까지 대기한다.

![thread1](C:\Users\user\Desktop\Yongsu_Nodejs_Study_Guide\images\thread1.png)

하지만, Non-Blocking 방식을 채택한 Single-Thread는,

점원(Thread)가 하나인 것은 동일하지만, 주방요리(I/O)작업은 Non-Blocking 작업으로 Background에서 작업하므로, 고객(Request)이 대기하지 않아도, 바로 주문을 할 수 있고, 주문후 요리가 완료되면 바로바로 서빙이된다.

이렇게 Non-Blocking + Single Thread로 아래 사진의 Multi-Thread (점원 여러명)과 비슷하게 처리할 수 있다.

![thread2](C:\Users\user\Desktop\Yongsu_Nodejs_Study_Guide\images\thread2.png)



위와같이 효율적으로 자원을 관리하기 때문에 Multi-Threads 기반의 프로그램보다, Memory or 기타 자원의 소모가 적게되는 것이 Node.js의 장점이다

하지만, 필요시 Node.js는 Thread 개수를 늘리는 Multi-Threads 방식이 아닌 여러개의 Process를 동작하는 Multi-Process을 채택한다(Cluster)

### References

Here are some of the interesting resources I reviewed during the writing of the article.

Node.js presentations by its author:

- [Original Node.js presentation](https://www.youtube.com/watch?v=ztspvPYybIY) by Ryan Dahl at JSConf 2009
- [10 Things I Regret About Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA) by Ryan Dahl at JSConf EU 2018

Node, the event loop and the libuv library presentations:

- [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) by Philip Roberts at JSConf EU
- [Node.js Explained](https://www.youtube.com/watch?v=L0pjVcIsU6A) by Jeff Kunkle
- [In The Loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0) by Jake Archibald at JSConf Asia 2018
- [Everything You Need to Know About Node.js Event Loop](https://www.youtube.com/watch?v=PNa9OMajw9w) by Bert Belder
- [A deep dive into libuv](https://www.youtube.com/watch?v=sGTRmPiXD4Y) by Saul Ibarra Coretge at NodeConf EU 2016

Node documents:

- [About Node.js](https://nodejs.org/en/about/)
- [The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/de/docs/guides/event-loop-timers-and-nexttick/)
- [Overview of Blocking vs Non-Blocking](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/)

Additional resources:

- [Art of Node](https://github.com/maxogden/art-of-node) by Max Ogden
- [Callback hell](http://callbackhell.com/) by Max Ogden
- [What is non-blocking or asynchronous I/O in Node.js?](https://stackoverflow.com/questions/10570246/what-is-non-blocking-or-asynchronous-i-o-in-node-js) on Stack Overflow
- [Event driven programming](https://en.wikipedia.org/wiki/Event-driven_programming) on Wikipedia
- [Node.js](https://en.wikipedia.org/wiki/Node.js) on Wikipedia
- [Thread](https://en.wikipedia.org/wiki/Thread_(computing)) on Wikipedia
- [libuv](https://libuv.org/)

- https://namjackson.tistory.com/30
- https://codeforgeek.com/asynchronous-programming-in-node-js/