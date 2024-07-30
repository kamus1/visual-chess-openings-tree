import Tree from 'react-d3-tree';
import CustomNode from '../components/InteractiveCustomNode';

import initialOrgChart from '../data/tree1.json';
import { useState } from 'react';

const InteractiveTree = () => {
  const [orgChart, setOrgChart] = useState(initialOrgChart)

  const addNode = (parentId, newNode) => {
    const addNodeRecursively = (node) => {
      if (node.id === parentId) {
        node.children = node.children || [];
        node.children.push(newNode);
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (addNodeRecursively(child)) {
            return true;
          }
        }
      }
      return false;
    };

    const newTree = { ...orgChart };
    addNodeRecursively(newTree);
    setOrgChart(newTree);
  };

  const handleAddNode = (nodeData) => {
    console.log(nodeData);
    const newNode = { 
      name: 'New Worker',
      id: nodeData.id + '1',
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    };
    addNode(nodeData.id, newNode);
  };

  return (
    <div>
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh' }}>
        <Tree
          data={orgChart}
          orientation="vertical"
          translate={{ x: 500, y: 160 }}
          nodeSize={{ x: 500, y: 700 }}
          pathFunc="straight"
          collapsible={false}
          renderCustomNodeElement={(rd3tProps) => (
            <CustomNode
              {...rd3tProps}
              nodeDatum={rd3tProps.nodeDatum}
              onAddClick={handleAddNode}
            />
          )}
        />
      </div>
    </div>
  );
};

export default InteractiveTree;
