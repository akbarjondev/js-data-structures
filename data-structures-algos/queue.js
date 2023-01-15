// Data structures and algorithms in JS

// Queues

function createQueue() {
  const queue = [];
  return {
    // enqueue or add
    add(item) {
      queue.unshift(item);
    },
    // dequeue or remove
    remove() {
      return queue.pop();
    },
    // peek
    peek() {
      return queue[queue.length - 1];
    },
    // length
    get length() {
      return queue.length;
    },
    // isEmpty
    isEmpty() {
      return queue.length === 0;
    },
  };
}

// const q1 = new createQueue();

// q1.add("salom");
// q1.add("qandaysiz");
// q1.add("xayr");

// q1.remove();

// console.log(q1.peek());
// console.log(q1.length);

module.exports = { createQueue };
