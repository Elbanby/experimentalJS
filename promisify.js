/*
 * An example of promises flow control
 * Thats a very common pattern in JS development
 * The challange is to make asynch calls that finishes in different times
 * yet you want to display the result with full control
 * This design is inpired by Kyle simpson.
 *
*/

const serverData = {
  "hi" : "Hi, and welcome to our website",
  "api": {
    "username": "omar",
    "friends": ["f1","f2","f3"]
  }
}

function fakeAjax(url,cb) {
  let numSec = randSec();
  setTimeout(()=>{
      cb(serverData[url]);
  }, numSec);
}

function randSec() {
  return Math.floor((Math.random() * 10 ) + 1)* 1000;
}

function promisify(func, args) {
  return new Promise((res,rej)=> {
    func(...args,res);
  });
}

function output(message) {
  console.log(message);
}

function parse(api) {
  output(`user name: ${api.username}`);
  api.friends.forEach( (friend,index) => {
    output(`friend #:${index} ${friend}`)
  })
}

let ajaxPromise = promisify(fakeAjax, ['hi']);

ajaxPromise
.then(output)
.then(()=> {
  return promisify(fakeAjax,["api"])
})
.then(parse)
