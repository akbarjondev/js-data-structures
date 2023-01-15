const { createQueue } = require("./queue");

function priorityQueue() {
  const hihgPriorityQueue = new createQueue();
  const lowPriorityQueue = new createQueue();

  return {
    add(item, hihgPriority = false) {
      if (hihgPriority) {
        hihgPriorityQueue.add(item);
      }

      lowPriorityQueue.add(item);
    },
    remove() {
      if (!hihgPriorityQueue.isEmpty()) {
        return hihgPriorityQueue.remove();
      }

      return lowPriorityQueue.remove();
    },
    peek() {
      if (!hihgPriorityQueue.isEmpty()) {
        return hihgPriorityQueue.peek();
      }

      return lowPriorityQueue.peek();
    },
    length() {
      return hihgPriorityQueue.length + lowPriorityQueue.length;
    },
    isEmpty() {
      return hihgPriorityQueue.isEmpty() && lowPriorityQueue.isEmpty();
    },
  };
}

const q = new priorityQueue();

q.add("code yozish");
q.add("tel olish", true);
q.add("kitob uqish");

q.remove();

console.log(q.peek());
