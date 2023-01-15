function createQueue() {
  const queue = [];

  return {
    enqueue(item) {
      queue.unshift(item);
    },
    dequeue() {
      return queue.pop();
    },
    isEmpty() {
      return queue.length === 0;
    },
    peek() {
      return queue[queue.length - 1];
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
    addNeighbour(key) {
      neighbours.push(key);
    },
  };
}

function createGraph(directed = false) {
  const nodes = [];
  const edges = [];

  return {
    nodes,
    edges,
    addNode(key) {
      nodes.push(createNode(key));
    },
    getNode(key) {
      return nodes.find((node) => node.key === key);
    },
    addEdge(node1Key, node2Key) {
      const node1 = this.getNode(node1Key);
      const node2 = this.getNode(node2Key);

      node1.addNeighbour(node2);
      edges.push(`${node1Key}-${node2Key}`);

      if (!directed) {
        node2.addNeighbour(node1);
      }
    },
    print() {
      return nodes
        .map((node) => {
          let result = node.key;

          if (node.neighbours.length > 0) {
            result +=
              " => " + node.neighbours.map((node) => node.key).join(", ");
          }

          return result;
        })
        .join("\n");
    },
    breadthFirstSearch(startingNodeKey, visitFunction) {
      const startingNode = this.getNode(startingNodeKey);
      const visited = nodes.map((node) => ({ [node.key]: false }));

      const queue = createQueue();
      queue.enqueue(startingNode);

      while (!queue.isEmpty()) {
        const currentNode = queue.dequeue();

        if (!visited[currentNode.key]) {
          visitFunction(currentNode);
          visited[currentNode.key] = true;
        }

        currentNode.neighbours.forEach((node) => {
          if (!visited[node.key]) {
            queue.enqueue(node);
          }
        });
      }
    },
    depthFirstSearch(startingNodekey, visitFunction) {
      const startingNode = this.getNode(startingNodekey);
      const visited = nodes.map((node) => ({ [node.key]: false }));

      function explore(node) {
        if (visited[node.key]) {
          return;
        }

        visitFunction(node);
        visited[node.key] = true;

        node.neighbours.forEach((node) => {
          explore(node);
        });
      }

      explore(startingNode);
    },
  };
}

const graph = createGraph(true);

graph.addNode("Toshkent");
graph.addNode("Fargona");
graph.addNode("Andijon");
graph.addNode("Namangan");
graph.addNode("Buxoro");
graph.addNode("Qirgiz");

graph.addEdge("Toshkent", "Buxoro");
graph.addEdge("Toshkent", "Qirgiz");
graph.addEdge("Toshkent", "Fargona");
graph.addEdge("Fargona", "Namangan");
graph.addEdge("Namangan", "Andijon");
graph.addEdge("Andijon", "Toshkent");
graph.addEdge("Andijon", "Qirgiz");

// console.log(graph.print());
graph.breadthFirstSearch("Toshkent", (node) => console.log(node.key));
console.log("----");
graph.depthFirstSearch("Toshkent", (node) => {
  console.log(node.key);
});
