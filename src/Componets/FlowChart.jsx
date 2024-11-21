import React, { useCallback, useEffect,useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "./Flowchart.css";
import AddIcon from "@mui/icons-material/Add";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Handle } from "reactflow";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ModalComponent from "./ModalComponent.jsx"; // Import the new Modal Component
import LogoNodeModal from "./LogoNodeModal.jsx";

// Initial Nodes and Edges
const initialNodes = [
  {
    id: "1",
    type: "leadSource",
    position: { x: 530, y: 200 },
    data: {
      label: (
        <div className="lead-source-node">
          <AddIcon />
          <h4>Add Lead Source</h4>
          <p>Click to add leads from the list of CRM</p>
        </div>
      ),
    },
  },
  {
    id: "2",
    type: "startPoint",
    position: { x: 570, y: 350 },
    data: {
      label: (
        <div className="start-point-node">
          <strong>Sequence Start Point</strong>
        </div>
      ),
    },
  },
  {
    id: "3",
    type: "iconOnlyNode",
    position: { x: 628, y: 450 },
    data: {
      label: (
        <div className="icon-only-node">
          <AddIcon />
        </div>
      ),
    },
  },
];
const initialEdges = [
  { id: "e2-3", source: "2", target: "3", type: "smoothstep" },
];


const onDeleteNode = (nodeId) => {
  setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
};

const NodeTypes = {
  
  leadSource: ({ data }) => (
    <div className="lead-source-node">{data.label}</div>
  ),
  startPoint: ({ data }) => (
    <div className="start-point-node">
      {data.label}
      <Handle type="source" position="bottom" />
      <Handle type="target" position="top" style={{ background: "#555" }} />
    </div>
  ),
  customNode: ({ data, id, onDeleteNode }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="custom-node"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {data.label}
        {isHovered && (
          <div
            className="delete-icon"
            onClick={() => onDeleteNode(id)} // Call delete handler
          >
            🗑️
          </div>
        )}
        <Handle type="source" position="bottom" />
        <Handle type="target" position="top" />
      </div>
    );
  },
  customNode1: ({ data, id, onDeleteNode }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="custom-node"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {data.label}
        {isHovered && (
          <div
            className="delete-icon"
            onClick={() => onDeleteNode(id)} // Call delete handler
          >
            🗑️
          </div>
        )}
        <Handle type="source" position="bottom" />
        <Handle type="target" position="top" />
      </div>
    );
  },
  iconOnlyNode: ({ data }) => (
    <div className="icon-only-node">
      {data.label}
      <Handle type="target" position="top" />
    </div>
  ),
};



function FlowChart() {
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showModal, setShowModal] = useState(false);
  const [logoModalVisible, setLogoModalVisible] = useState(false);

  // Separate states for each insertion
  const [leadSourceState, setLeadSourceState] = useState({
    isInputStep: false,
    selectedOption: "",
    selectedInput: "",
  });

  const [logoNodeState, setLogoNodeState] = useState({
    isInputStep: false,
    selectedOption: "",
    selectedInput: "",
  });

  console.log(logoNodeState.selectedInput)

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const [time, setTime] = useState("");
  const [subject, setSubject] =useState("")

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Manually set values for debugging
    const sub = subject || "Default Subject";
    const body = "This is an AI-generated email";
    const email = "daymarafik12@gmail.com";
    const requestTime = Number(time); // Ensure `time` is a number
  
    // Log values to ensure correctness
    console.log("submit log:", { requestTime, subject, body, email });
  
    // Validate values
    if (!email.trim() || !subject.trim() || !body.trim() || !requestTime) {
      alert("Please fill in all fields");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/schedule-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject : sub, body, time: requestTime }),
      });
  
      if (response.ok) {
        alert("Email scheduled successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error scheduling email:", error);
      alert("Failed to schedule email");
    }
  };
  
  
  const handleNodeClick = (event, node) => {
    if (node.type === "leadSource") {
      setShowModal(true);
      setLeadSourceState({
        isInputStep: false,
        selectedOption: "",
        selectedInput: "",
      });
    } else if (node.type === "iconOnlyNode") {
      setLogoModalVisible(true);
      setLogoNodeState({
        isInputStep: false,
        selectedOption: "",
        selectedInput: "",
      });
    } else {
      setShowModal(false);
      setLogoModalVisible(false);
    }
  };

  const handleInsert = () => {
    const leadNode = nodes.find((node) => node.type === "leadSource");
    if (!leadNode) return;

    const newNodeId = `${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      type: "customNode1",
      position: { x: leadNode.position.x, y: leadNode.position.y },
      data: {
        label: (
          <div className="new-lead">
            <PersonAddIcon className="option-icon" />
            <div>
              <h4>{leadSourceState.selectedOption}</h4>
              <p>{leadSourceState.selectedInput}</p>
            </div>
          </div>
        ),
      },
    };

    const updatedLeadNode = {
      ...leadNode,
      position: { x: leadNode.position.x + 250, y: leadNode.position.y },
    };

    setNodes((prevNodes) => [
      ...prevNodes.filter((node) => node.id !== leadNode.id),
      updatedLeadNode,
      newNode,
    ]);

    setEdges((prevEdges) => [
      ...prevEdges,
      { id: `e${newNodeId}-2`, source: newNodeId, target: "2", type: "smoothstep" },
    ]);

    setShowModal(false);
    setLeadSourceState({ isInputStep: false, selectedOption: "", selectedInput: "" });
  };

  const handleInsertForLogo = () => {
    const logoNode = nodes.find((node) => node.type === "iconOnlyNode");
    if (!logoNode) return;

    const lastCreatedNode =
      nodes
        .filter((node) => node.type === "customNode")
        .sort((a, b) => b.position.y - a.position.y)[0] || nodes.find((node) => node.id === "2");

    if (!lastCreatedNode) return;

    const newNodeId = `${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      type: "customNode",
      position: { x: logoNode.position.x, y: logoNode.position.y },
      data: {
        label: (
          <div className="new-lead">
            <PersonAddIcon className="option-icon" />
            <div>
              <h4>{logoNodeState.selectedOption}</h4>
              <p>{logoNodeState.selectedInput}</p>
            </div>
          </div>
        ),
      },
    };

    const updatedLogoNode = {
      ...logoNode,
      position: { x: logoNode.position.x, y: logoNode.position.y + 150 },
    };

    setEdges((prevEdges) =>
      prevEdges.filter(
        (edge) =>
          !(edge.source === lastCreatedNode.id && edge.target === logoNode.id)
      )
    );

    const newEdges = [
      {
        id: `e${lastCreatedNode.id}-${newNodeId}`,
        source: lastCreatedNode.id,
        target: newNodeId,
        type: "smoothstep",
      },
      {
        id: `e${newNodeId}-${logoNode.id}`,
        source: newNodeId,
        target: logoNode.id,
        type: "smoothstep",
      },
    ];

    setEdges((prevEdges) => [...prevEdges, ...newEdges]);

    setNodes((prevNodes) => [
      ...prevNodes.filter((node) => node.id !== logoNode.id),
      updatedLogoNode,
      newNode,
    ]);

    setLogoModalVisible(false);
    setLogoNodeState({ isInputStep: false, selectedOption: "", selectedInput: "" });
  };


  return (
    <div className="flowchart-container">
     <h1 className="flowchart-title">Task for MERN Stack</h1>
      <div className="flowchart-toolbar">
        <button onClick={handleSubmit}>
          Save & Schedule
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={NodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <ModalComponent
        showModal={showModal}
        setShowModal={setShowModal}
        isInputStep={leadSourceState.isInputStep}
        setIsInputStep={(val) =>
          setLeadSourceState((prev) => ({ ...prev, isInputStep: val }))
        }
        selectedOption={leadSourceState.selectedOption}
        setSelectedOption={(val) =>
          setLeadSourceState((prev) => ({ ...prev, selectedOption: val }))
        }
        selectedInput={leadSourceState.selectedInput}
        setSelectedInput={(val) =>
          setLeadSourceState((prev) => ({ ...prev, selectedInput: val }))
        }
        handleInsert={handleInsert}
      />
      <LogoNodeModal
        showModal={logoModalVisible}
        setShowModal={setLogoModalVisible}
        isInputStep={logoNodeState.isInputStep}
        setIsInputStep={(val) =>
          setLogoNodeState((prev) => ({ ...prev, isInputStep: val }))
        }
        selectedOption={logoNodeState.selectedOption}
        setSelectedOption={(val) =>
          setLogoNodeState((prev) => ({ ...prev, selectedOption: val }))
        }
        selectedInput={logoNodeState.selectedInput}
        setSelectedInput={(val) =>
          setLogoNodeState((prev) => ({ ...prev, selectedInput: val }))
        }
        setTime = {setTime}
        setSubject = {setSubject}
        handleInsertForLogo={handleInsertForLogo}
      />
    </div>
  );
}

export default FlowChart;

