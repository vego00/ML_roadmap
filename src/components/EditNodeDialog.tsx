import { useState, useEffect } from 'react';
import { TopicNode } from '../App';
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
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Plus, X } from 'lucide-react';

interface EditNodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  node: TopicNode;
  onUpdate: (node: TopicNode) => void;
}

export function EditNodeDialog({ open, onOpenChange, node, onUpdate }: EditNodeDialogProps) {
  const [title, setTitle] = useState(node.title);
  const [description, setDescription] = useState(node.description);
  const [category, setCategory] = useState(node.category);
  const [links, setLinks] = useState(node.links.length > 0 ? node.links : ['']);

  useEffect(() => {
    setTitle(node.title);
    setDescription(node.description);
    setCategory(node.category);
    setLinks(node.links.length > 0 ? node.links : ['']);
  }, [node]);

  const handleAddLink = () => {
    setLinks([...links, '']);
  };

  const handleUpdateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    onUpdate({
      ...node,
      title: title.trim(),
      description: description.trim(),
      category,
      links: links.filter(link => link.trim() !== ''),
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>토픽 편집</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">토픽 제목</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">설명</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category">카테고리</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as TopicNode['category'])}>
              <SelectTrigger id="edit-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">수학 기초</SelectItem>
                <SelectItem value="ml">머신러닝</SelectItem>
                <SelectItem value="dl">딥러닝</SelectItem>
                <SelectItem value="nlp">NLP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>문서 링크</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddLink}
              >
                <Plus className="size-3 mr-1" />
                링크 추가
              </Button>
            </div>
            <div className="space-y-2">
              {links.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={link}
                    onChange={(e) => handleUpdateLink(index, e.target.value)}
                    placeholder="https://notion.so/..."
                  />
                  {links.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveLink(index)}
                    >
                      <X className="size-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
