function createNode(key) {
  const children = [];

  return {
    key,
    children,
    addChildren(nodeKey) {
      const childNode = createNode(nodeKey);
      children.push(childNode);

      return childNode;
    },
  };
}

function createTree(rootKey) {
  const root = createNode(rootKey);

  return {
    root,
    print() {
      let result = "";

      function traverse(node, visitFunction, depth) {
        visitFunction(node, depth);

        if (node.children.length) {
          node.children.forEach((node) => {
            traverse(node, visitFunction, depth + 1);
          });
        }
      }

      function addKeyToResult(node, depth) {
        result +=
          result.length === 0 ? node.key : `\n${" ".repeat(depth)}${node.key}`;
      }

      traverse(root, addKeyToResult, 1);

      return result;
    },
  };
}

const dom = createTree("html");

const head = dom.root.addChildren("head");
const body = dom.root.addChildren("body");

head.addChildren("title -> Hello world");
body.addChildren("header -> Nav links");
const main = body.addChildren("main -> main content");
main.addChildren("p -> paragraph content");
body.addChildren("footer -> copyright" + new Date().getFullYear());

// console.log(dom.root.children);
console.log(dom.print());
