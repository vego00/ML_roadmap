import { useState } from 'react';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { Button } from './components/ui/button';
import { Plus, Github } from 'lucide-react';

export interface TopicNode {
  id: string;
  title: string;
  description: string;
  category: 'ml' | 'dl' | 'nlp' | 'math';
  links: string[];
  position: { x: number; y: number };
  parentIds: string[];
}

function App() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-slate-900">ML/DL/NLP 학습 로드맵</h1>
            <p className="text-slate-600 text-sm mt-1">기술 발전 과정을 한눈에</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowAddDialog(true)}
              className="gap-2"
            >
              <Plus className="size-4" />
              토픽 추가
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500"></div>
            <span className="text-sm text-slate-700">수학 기초</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className="text-sm text-slate-700">머신러닝</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-500"></div>
            <span className="text-sm text-slate-700">딥러닝</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-500"></div>
            <span className="text-sm text-slate-700">NLP</span>
          </div>
        </div>

        <KnowledgeGraph
          nodes={nodes}
          onAddNode={handleAddNode}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
          showAddDialog={showAddDialog}
          setShowAddDialog={setShowAddDialog}
        />
      </main>
    </div>
  );
}

export default App;
