import { useState } from 'react';
import { Zone } from '../App';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface AddZoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (zone: Zone) => void;
}

export function AddZoneDialog({ open, onOpenChange, onAdd }: AddZoneDialogProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#e0e7ff');

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newZone: Zone = {
      id: Date.now().toString(),
      name: name.trim(),
      position: { x: 100, y: 100 },
      size: { width: 400, height: 300 },
      color,
    };

    onAdd(newZone);
    
    // Reset form
    setName('');
    setColor('#e0e7ff');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>새 구역 추가</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="zone-name">구역 이름</Label>
            <Input
              id="zone-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 트랜스포머 아키텍처"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zone-color">배경 색상</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                id="zone-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-9 p-1 cursor-pointer"
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#e0e7ff"
                className="flex-1"
              />
            </div>
            <p className="text-xs text-slate-500">
              밝은 색상을 권장합니다 (배경으로 사용됨)
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            추가
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
