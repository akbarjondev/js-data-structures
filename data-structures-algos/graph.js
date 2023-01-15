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
    addNode(key) {
      nodes.push(createNode(key));
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
            result += ` => ${neighbours
              .map((neigbours) => neigbours.key)
              .join(" ")}`;
          }

          return result;
        })
        .join("\n");
    },
  };
}

const graph = createGraph();

graph.addNode("Ali");
graph.addNode("Salima");
graph.addNode("Mustang");
graph.addNode("BMW");

graph.addEdge("Ali", "Salima");
graph.addEdge("Ali", "Mustang");

console.log(graph.print());
