import { Connection, EdgeChange, NodeChange } from "@reactflow/core";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { Bar } from "./Bar";
import shallow from "zustand/shallow";

import { Nodes, NodesState } from "./Nodes";

const selector = (state: NodesState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
});

export function Editor() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    Nodes.use(selector, shallow);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={{
          hideAttribution: true,
        }}
        nodeTypes={Nodes.nodeTypes}
        className="bg-neutral-900"
        defaultEdgeOptions={{
          type: "smoothstep",
          style: {
            stroke: "#3b3b3b",
            strokeWidth: 2,
          },
        }}
      >
        <Background />
        <Controls />
        {/* <MiniMap /> */}
      </ReactFlow>
      <Bar
        onCreateNode={(newNode) => {
          addNode(newNode);
        }}
      />
    </>
  );
}

export namespace Editor {}
