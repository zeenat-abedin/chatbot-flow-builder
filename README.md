
### Chatbot Flow Builder Application Overview

This application is a chatbot flow builder, allowing users to visually construct chatbot conversations using a drag-and-drop interface. It leverages React and ReactFlow for building the UI and managing the state of nodes and edges representing chatbot responses and transitions between them.

### Key Components

#### `FlowBuilder.jsx`
- **Purpose**: The main component that renders the entire flow builder UI.
- **Key Features**:
  - Initializes and manages the state of nodes and edges using ReactFlow's `useNodesState` and `useEdgesState`.
  - Renders a `NodesPanel` for adding and configuring nodes, a `ReactFlow` instance for visualizing the chatbot flow, a `SettingsPanel` for adjusting node settings, and a `SaveButton` for saving the constructed flow.
  - Utilizes `useMemo` for memoizing node types and `useState` for tracking the selected node.
  - Handles node and edge changes through ReactFlow's event handlers (`onNodesChange`, `onEdgesChange`, `onConnect`).

#### `SaveButton.jsx`
- **Purpose**: A component that provides a button for saving the current chatbot flow configuration.
- **Key Features**:
  - Validates the flow before saving, ensuring no more than one node has an empty target handle.
  - Logs the flow data if valid or alerts the user if invalid.
  - Uses a callback function passed down from `FlowBuilder.jsx` to interact with the flow data.

#### `NodesPanel.jsx`
- **Purpose**: It is responsible for rendering the panel where users can add and configure nodes.
- **Key Features**:
  - Provides UI controls for selecting node types and configuring node-specific settings.

#### `SettingsPanel.jsx`
- **Purpose**: It is responsible for adjusting node settings.
- **Key Features**:
  - Allows users to modify properties of selected nodes, such as text content, conditions, etc.
  - Updates the corresponding node in the flow when settings are changed.

#### `TextNode.jsx`
- **Purpose**: Represents a text-based node in the chatbot flow, likely used for displaying text messages or prompts to the user.
- **Key Features**:
  - Configurable text content
  - Rendered as part of the flow within the `ReactFlow` component.

### Styling and Accessibility

- The application includes global styling to enhance readability and usability, such as increased font sizes and button dimensions.
- Accessibility considerations are implied through the use of keyboard-friendly interactions and screen-reader support.
