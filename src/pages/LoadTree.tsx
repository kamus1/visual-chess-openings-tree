import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

import OrgChartTree from "./OrgChartTree";
import { stringPgnToJson } from "../tools/pgnToJson";

export function LoadTree() {
  const location = useLocation();
  const { pgn } = location.state;
  console.log(pgn);
  const [treeData, setTreeData] = useState<any>(null);

  useEffect(() => {
    if (pgn) {
      const jsonData = stringPgnToJson(pgn);
      setTreeData(jsonData);
    }
  }, [pgn]);

  console.log(treeData);

  return (
    <Container>
      {treeData && <OrgChartTree treeData={treeData} />}
    </Container>
  );
}

const Container = styled.div`
  color: black;
`;
