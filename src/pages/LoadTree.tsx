import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

import OrgChartTree from "./OrgChartTree";

export function LoadTree() {
  const location = useLocation();
  const { jsonData } = location.state;
  const [treeData, setTreeData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (jsonData) {
      setTreeData(jsonData);
      setError(null); //reset error if jsonData is provided
    } else {
      setError("No data provided");
      setTreeData(null); //ensure treeData is null if no data is provided
    }
  }, [jsonData]);

  return (
    <Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {treeData && <OrgChartTree treeData={treeData} />}
    </Container>
  );
}

const Container = styled.div`
  color: black;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;
