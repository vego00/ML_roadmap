import { useState, useEffect } from 'react';
import { TopicNode } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Edit2, Trash2, GripVertical } from 'lucide-react';
import { EditNodeDialog } from './EditNodeDialog';

interface TopicNodeProps {
  node: TopicNode;
  onUpdate: (node: TopicNode) => void;
  onDelete: (nodeId: string) => void;
}

const categoryColors = {
  math: 'bg-amber-500',
  ml: 'bg-blue-500',
  dl: 'bg-purple-500',
  nlp: 'bg-emerald-500',
};

const categoryBorderColors = {
  math: 'border-amber-200',
  ml: 'border-blue-200',
  dl: 'border-purple-200',
  nlp: 'border-emerald-200',
};

export function TopicNodeComponent({ node, onUpdate, onDelete }: TopicNodeProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onUpdate({
          ...node,
          position: {
            x: Math.max(0, e.clientX - dragOffset.x),
            y: Math.max(0, e.clientY - dragOffset.y),
          },
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, node, onUpdate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - node.position.x,
      y: e.clientY - node.position.y,
    });
  };

  return (
    <>
      <Card
        className={`absolute w-[300px] border-2 ${categoryBorderColors[node.category]} cursor-move hover:shadow-lg transition-shadow ${
          isDragging ? 'shadow-xl opacity-80' : ''
        }`}
        style={{
          left: node.position.x,
          top: node.position.y,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-1">
              <GripVertical className="size-4 text-slate-400" />
              <div className={`w-1 h-8 ${categoryColors[node.category]} rounded`}></div>
              <h3 className="text-slate-900">{node.title}</h3>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEditDialog(true);
                }}
              >
                <Edit2 className="size-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('이 토픽을 삭제하시겠습니까?')) {
                    onDelete(node.id);
                  }
                }}
              >
                <Trash2 className="size-3 text-red-500" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-slate-600 mb-3">{node.description}</p>

          {node.links.length > 0 && (
            <div className="space-y-1">
              {node.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="size-3" />
                  <span className="truncate">노트 {index + 1}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </Card>

      <EditNodeDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        node={node}
        onUpdate={onUpdate}
      />
    </>
  );
}