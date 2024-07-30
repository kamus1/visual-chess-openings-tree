import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Tree from 'react-d3-tree';
import CustomNode from '../components/CustomNode';

import initialOrgChart from '../data/tree1.json';
import caroKann from '../data/caro-kann.json';

const treeDataMap = {
  'tree1': initialOrgChart,
  'caro-kann': caroKann,
  // 
};

const OrgChartTree = ({ treeData }) => {
  const { treeName } = useParams();
  const [orgChart, setOrgChart] = useState(treeData || treeDataMap[treeName]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!treeData) {
      setOrgChart(treeDataMap[treeName]);
    }
  }, [treeName, treeData]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const addNode = (parentName, newNode) => {
    const addNodeRecursively = (node) => {
      if (node.name === parentName) {
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
    const newNode = { name: 'New Worker' };
    addNode(nodeData.name, newNode);
  };

  return (
    <div>
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh' }}>
        <Tree
          data={orgChart}
          orientation="vertical"
          translate={{ x: 500, y: 160 }}
          nodeSize={{ x: 500, y: 500 }}
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

export default OrgChartTree;
