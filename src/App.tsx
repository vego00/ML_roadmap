import { useState } from 'react';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { Sidebar } from './components/Sidebar';
import { CategoryManager } from './components/CategoryManager';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface TopicNode {
  id: string;
  title: string;
  description: string;
  category: string;
  links: string[];
  position: { x: number; y: number };
  parentIds: string[];
}

export interface Zone {
  id: string;
  name: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  color: string;
}

function App() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 'math', name: '수학 기초', color: '#f59e0b' },
    { id: 'ml', name: '머신러닝', color: '#3b82f6' },
    { id: 'dl', name: '딥러닝', color: '#a855f7' },
    { id: 'nlp', name: 'NLP', color: '#10b981' },
  ]);

  const [zones, setZones] = useState<Zone[]>([
    {
      id: '1',
      name: '기초 개념',
      position: { x: 50, y: 20 },
      size: { width: 600, height: 300 },
      color: '#fef3c7',
    },
    {
      id: '2',
      name: '시퀀스 모델',
      position: { x: 450, y: 380 },
      size: { width: 250, height: 220 },
      color: '#ddd6fe',
    },
  ]);

  const [nodes, setNodes] = useState<TopicNode[]>([
    {
      id: '1',
      title: 'Linear Algebra',
      description: '벡터, 행렬, 고유값 등 기초 선형대수',
      category: 'math',
      links: [],
      position: { x: 100, y: 50 },
      parentIds: [],
    },
    {
      id: '2',
      title: 'Logistic Regression',
      description: '이진 분류를 위한 기본 알고리즘',
      category: 'ml',
      links: [],
      position: { x: 300, y: 150 },
      parentIds: ['1'],
    },
    {
      id: '3',
      title: 'Neural Networks',
      description: '다층 퍼셉트론과 역전파',
      category: 'dl',
      links: [],
      position: { x: 300, y: 280 },
      parentIds: ['2', '1'],
    },
    {
      id: '4',
      title: 'RNN',
      description: '순환 신경망 - 시퀀스 데이터 처리',
      category: 'dl',
      links: [],
      position: { x: 500, y: 410 },
      parentIds: ['3'],
    },
    {
      id: '5',
      title: 'LSTM/GRU',
      description: 'Long Short-Term Memory & Gated Recurrent Unit',
      category: 'dl',
      links: [],
      position: { x: 500, y: 540 },
      parentIds: ['4'],
    },
    {
      id: '6',
      title: 'Attention Mechanism',
      description: '어텐션 메커니즘의 등장',
      category: 'nlp',
      links: [],
      position: { x: 300, y: 670 },
      parentIds: ['5'],
    },
    {
      id: '7',
      title: 'Transformer',
      description: 'Attention is All You Need',
      category: 'nlp',
      links: [],
      position: { x: 300, y: 800 },
      parentIds: ['6'],
    },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [showAddZoneDialog, setShowAddZoneDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleAddNode = (newNode: TopicNode) => {
    setNodes([...nodes, newNode]);
    setShowAddDialog(false);
  };

  const handleUpdateNode = (updatedNode: TopicNode) => {
    setNodes(nodes.map(node => node.id === updatedNode.id ? updatedNode : node));
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
  };

  const handleAddZone = (newZone: Zone) => {
    setZones([...zones, newZone]);
    setShowAddZoneDialog(false);
  };

  const handleUpdateZone = (updatedZone: Zone) => {
    setZones(zones.map(zone => zone.id === updatedZone.id ? updatedZone : zone));
  };

  const handleDeleteZone = (zoneId: string) => {
    setZones(zones.filter(zone => zone.id !== zoneId));
  };

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        categories={categories}
        onAddNode={() => setShowAddDialog(true)}
        onAddZone={() => setShowAddZoneDialog(true)}
        onManageCategories={() => setShowCategoryManager(true)}
      />

      <main className="flex-1 overflow-hidden">
        <KnowledgeGraph
          nodes={nodes}
          zones={zones}
          categories={categories}
          onAddNode={handleAddNode}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
          onAddZone={handleAddZone}
          onUpdateZone={handleUpdateZone}
          onDeleteZone={handleDeleteZone}
          showAddDialog={showAddDialog}
          setShowAddDialog={setShowAddDialog}
          showAddZoneDialog={showAddZoneDialog}
          setShowAddZoneDialog={setShowAddZoneDialog}
        />
      </main>

      <CategoryManager
        open={showCategoryManager}
        onOpenChange={setShowCategoryManager}
        categories={categories}
        onUpdateCategories={setCategories}
      />
    </div>
  );
}

export default App;