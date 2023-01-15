function createStack() {
  const stack = [];

  return {
    push(item) {
      stack.push(item);
    },
    pop() {
      return stack.pop();
    },
    peek() {
      return stack[stack.length - 1];
    },
    get length() {
      return stack.length;
    },
    isEmpty() {
      return stack.length === 0;
    },
  };
}

const s = new createStack();

s.push("katta quti");
s.push("urtancha quti");
s.push("kichik quti");

console.log(s.pop());
console.log(s.peek());
