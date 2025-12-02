import { useState, useEffect } from 'react';
import { Zone } from '../App';
import { Button } from './ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { EditZoneDialog } from './EditZoneDialog';

interface ZoneComponentProps {
  zone: Zone;
  onUpdate: (zone: Zone) => void;
  onDelete: (zoneId: string) => void;
}

export function ZoneComponent({ zone, onUpdate, onDelete }: ZoneComponentProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onUpdate({
          ...zone,
          position: {
            x: Math.max(0, e.clientX - dragOffset.x),
            y: Math.max(0, e.clientY - dragOffset.y),
          },
        });
      } else if (isResizing) {
        onUpdate({
          ...zone,
          size: {
            width: Math.max(200, e.clientX - zone.position.x),
            height: Math.max(150, e.clientY - zone.position.y),
          },
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, zone, onUpdate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - zone.position.x,
      y: e.clientY - zone.position.y,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  return (
    <>
      <div
        className="absolute rounded-xl border-2 border-dashed cursor-move"
        style={{
          left: zone.position.x,
          top: zone.position.y,
          width: zone.size.width,
          height: zone.size.height,
          backgroundColor: zone.color,
          borderColor: `${zone.color}CC`,
          opacity: isDragging ? 0.7 : 0.4,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="p-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-slate-700 select-none">{zone.name}</h3>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowEditDialog(true);
              }}
              className="h-6 w-6 p-0"
            >
              <Edit2 className="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('이 구역을 삭제하시겠습니까?')) {
                  onDelete(zone.id);
                }
              }}
              className="h-6 w-6 p-0"
            >
              <Trash2 className="size-3 text-red-500" />
            </Button>
          </div>
        </div>

        {/* Resize handle */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeMouseDown}
          style={{
            background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.2) 50%)',
          }}
        />
      </div>

      <EditZoneDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        zone={zone}
        onUpdate={onUpdate}
      />
    </>
  );
}
