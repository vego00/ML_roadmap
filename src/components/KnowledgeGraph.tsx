import { TopicNode, Zone, Category } from '../App';
import { TopicNodeComponent } from './TopicNode';
import { ZoneComponent } from './ZoneComponent';
import { AddNodeDialog } from './AddNodeDialog';
import { AddZoneDialog } from './AddZoneDialog';

interface KnowledgeGraphProps {
  nodes: TopicNode[];
  zones: Zone[];
  categories: Category[];
  onAddNode: (node: TopicNode) => void;
  onUpdateNode: (node: TopicNode) => void;
  onDeleteNode: (nodeId: string) => void;
  onAddZone: (zone: Zone) => void;
  onUpdateZone: (zone: Zone) => void;
  onDeleteZone: (zoneId: string) => void;
  showAddDialog: boolean;
  setShowAddDialog: (show: boolean) => void;
  showAddZoneDialog: boolean;
  setShowAddZoneDialog: (show: boolean) => void;
}

export function KnowledgeGraph({
  nodes,
  zones,
  categories,
  onAddNode,
  onUpdateNode,
  onDeleteNode,
  onAddZone,
  onUpdateZone,
  onDeleteZone,
  showAddDialog,
  setShowAddDialog,
  showAddZoneDialog,
  setShowAddZoneDialog,
}: KnowledgeGraphProps) {
  // SVG 연결선 그리기
  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    nodes.forEach(node => {
      node.parentIds.forEach(parentId => {
        const parentNode = nodes.find(n => n.id === parentId);
        if (parentNode) {
          const x1 = parentNode.position.x + 150; // 노드 width / 2
          const y1 = parentNode.position.y + 100; // 노드 height
          const x2 = node.position.x + 150;
          const y2 = node.position.y;
          
          // 곡선 경로 생성
          const midY = (y1 + y2) / 2;
          const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
          
          connections.push(
            <path
              key={`${parentId}-${node.id}`}
              d={path}
              stroke="#cbd5e1"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          );
        }
      });
    });
    
    return connections;
  };

  // 최대 캔버스 크기 계산
  const maxX = Math.max(
    ...nodes.map(n => n.position.x + 300),
    ...zones.map(z => z.position.x + z.size.width),
    2000
  );
  const maxY = Math.max(
    ...nodes.map(n => n.position.y + 100),
    ...zones.map(z => z.position.y + z.size.height),
    1500
  );

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full bg-white overflow-auto">
        <div className="relative" style={{ width: maxX, height: maxY, minHeight: '100%' }}>
          {/* Zones (배경) */}
          {zones.map(zone => (
            <ZoneComponent
              key={zone.id}
              zone={zone}
              onUpdate={onUpdateZone}
              onDelete={onDeleteZone}
            />
          ))}

          <svg
            className="absolute inset-0 pointer-events-none"
            width={maxX}
            height={maxY}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#cbd5e1" />
              </marker>
            </defs>
            {renderConnections()}
          </svg>

          {nodes.map(node => (
            <TopicNodeComponent
              key={node.id}
              node={node}
              categories={categories}
              onUpdate={onUpdateNode}
              onDelete={onDeleteNode}
            />
          ))}
        </div>
      </div>

      <AddNodeDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={onAddNode}
        existingNodes={nodes}
        categories={categories}
      />

      <AddZoneDialog
        open={showAddZoneDialog}
        onOpenChange={setShowAddZoneDialog}
        onAdd={onAddZone}
      />
    </div>
  );
}