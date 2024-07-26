import { useState } from 'react';
import Tree from 'react-d3-tree';
import CustomNode from './CustomNode';

// Datos iniciales del árbol
const initialOrgChart = {
  name: 'CEO',
  fen: '',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'bob',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'server',
            },
          ],
        },
      ],
    },
  ],
};

export default function OrgChartTree() {
  const [orgChart, setOrgChart] = useState(initialOrgChart);

  // Función para agregar un nuevo nodo
  const addNode = (parentName, newNode) => {
    const addNodeRecursively = (node) => {
      if (node.name === parentName) {
        node.children = node.children || [];
        node.children.push(newNode);
        return true;
      }
      if (node.children) {
        for (let child of node.children) {
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

  // Ejemplo de cómo agregar un nodo
  const handleAddNode = (nodeData) => {
    const newNode = { name: 'New Worker' };
    addNode(nodeData.name, newNode); // Cambia 'Foreman' por el nombre del nodo al que quieres añadir el nuevo nodo
  };

  return (
    <div>
      {/*<button onClick={handleAddNode}>Add Node</button>*/}
      
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh' }}>
        <Tree
          data={orgChart}
          orientation="vertical"
          translate={{ x: 500, y: 160 }}
          nodeSize={{ x: 500, y: 1000 }}
          pathFunc="straight"
          collapsible={false}

          //custom node element
          renderCustomNodeElement={rd3tProps =>
             <CustomNode {...rd3tProps} onAddClick={handleAddNode}/>}
        />
      </div>
    </div>
  );
}
