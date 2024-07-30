import {Routes, Route} from 'react-router-dom';
import {Home} from "../pages/Home";
import {About} from "../pages/About";
import {NewTree} from "../pages/NewTree";
import { LoadTree } from '../pages/LoadTree';
import { Tools } from '../pages/Tools';

import OrgChartTree from '../pages/OrgChartTree';
import InteractiveTree from '../pages/InteractiveTree';

export function MyRoutes() {
    const originRoute ="/visual-chess-openings-tree"
    return (
        <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`${originRoute}/`} element={<Home />} />
            <Route path={`${originRoute}/about`} element={<About />} />
            <Route path={`${originRoute}/new-tree`} element={<NewTree />} />
            <Route path={`${originRoute}/tree/:treeName`} element={<OrgChartTree treeData=""/>} />
            <Route path={`${originRoute}/tree-loaded`} element={<LoadTree />} />
            <Route path={`${originRoute}/tools`} element={<Tools />} />
            <Route path={`${originRoute}/interactive-tree`} element={<InteractiveTree treeData=""/>} />
        </Routes>
    );
    }

