import React from 'react'
import { ReactFlowProvider } from 'reactflow'
import FlowBuilder from './components/FlowBuilder'

function App() {
  return (
    <ReactFlowProvider>
      <FlowBuilder/>
    </ReactFlowProvider>
  )
}

export default App
