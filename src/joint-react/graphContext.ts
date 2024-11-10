import {dia} from "@joint/core";
import Graph = dia.Graph;
import {createContext} from "react";

export const GraphContext = createContext(new Graph())