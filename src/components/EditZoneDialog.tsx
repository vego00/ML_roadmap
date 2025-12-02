import { useState, useEffect } from 'react';
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

interface EditZoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  zone: Zone;
  onUpdate: (zone: Zone) => void;
}

export function EditZoneDialog({ open, onOpenChange, zone, onUpdate }: EditZoneDialogProps) {
  const [name, setName] = useState(zone.name);
  const [color, setColor] = useState(zone.color);

  useEffect(() => {
    setName(zone.name);
    setColor(zone.color);
  }, [zone]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    onUpdate({
      ...zone,
      name: name.trim(),
      color,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>구역 편집</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-zone-name">구역 이름</Label>
            <Input
              id="edit-zone-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-zone-color">배경 색상</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                id="edit-zone-color"
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
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
