function createQueue() {
  const queue = [];
  return {
    add(item) {
      queue.unshift(item);
    },
    remove() {
      return queue.pop();
    },
    peek() {
      return queue[queue.length - 1];
    },
    isEmpty() {
      return queue.length === 0;
    },
    get length() {
      return queue.length;
    },
  };
}

function createNode(key) {
  const neighbours = [];

  return {
    key,
    neighbours,
    addNeighbours(node) {
      neighbours.push(node);
    },
  };
}

function createGraph(directed = false) {
  const nodes = [];
  const edges = [];

  return {
    nodes,
    edges,
    addNode(node) {
      nodes.push(createNode(node));
    },
    getNode(key) {
      return nodes.find((node) => node.key === key);
    },
    addEdge(node1Key, node2Key) {
      const node1 = this.getNode(node1Key);
      const node2 = this.getNode(node2Key);

      node1.addNeighbours(node2);
      edges.push(`${node1Key}-${node2Key}`);

      if (!directed) {
        node2.addNeighbours(node1);
      }
    },
    print() {
      return nodes
        .map(({ key, neighbours }) => {
          let result = key;

          if (neighbours.length > 0) {
            result += ` => ${neighbours.map(({ key }) => key).join(" ")}`;
          }

          return result;
        })
        .join("\n");
    },
    breadthFirstSearch(startingNodeKey, visitFunc) {
      const startingNode = this.getNode(startingNodeKey);
      const visited = nodes.map((node) => ({ [node.key]: false }));

      const queue = createQueue();
      queue.add(startingNode);

      while (!queue.isEmpty()) {
        const currentNode = queue.remove();

        if (!visited[currentNode.key]) {
          visitFunc(currentNode);
          visited[currentNode.key] = true;
        }

        currentNode.neighbours.forEach((node) => {
          if (!visited[node.key]) {
            queue.add(node);
          }
        });
      }
    },
  };
}

const graph = createGraph();
const nodes = ["a", "b", "c", "d", "e", "f"];
const edges = [
  ["a", "b"],
  ["a", "e"],
  ["a", "f"],
  ["b", "d"],
  ["b", "e"],
  ["c", "b"],
  ["d", "c"],
  ["d", "e"],
];

nodes.forEach((node) => graph.addNode(node));
edges.forEach((edges) => graph.addEdge(...edges));

// graph.addNode("Ali");
// graph.addNode("Salima");
// graph.addNode("Karima");

// graph.addEdge("Ali", "Salima");
// graph.addEdge("Ali", "Karima");

// console.log(graph.print());
graph.breadthFirstSearch("c", (node) => console.log(node.key));
