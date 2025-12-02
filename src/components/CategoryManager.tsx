import { useState } from 'react';
import { Category } from '../App';
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
import { Plus, Trash2 } from 'lucide-react';

interface CategoryManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  onUpdateCategories: (categories: Category[]) => void;
}

export function CategoryManager({
  open,
  onOpenChange,
  categories,
  onUpdateCategories,
}: CategoryManagerProps) {
  const [editedCategories, setEditedCategories] = useState<Category[]>(categories);

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: '새 카테고리',
      color: '#6366f1',
    };
    setEditedCategories([...editedCategories, newCategory]);
  };

  const handleUpdateCategory = (id: string, field: keyof Category, value: string) => {
    setEditedCategories(
      editedCategories.map(cat =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    );
  };

  const handleDeleteCategory = (id: string) => {
    setEditedCategories(editedCategories.filter(cat => cat.id !== id));
  };

  const handleSave = () => {
    onUpdateCategories(editedCategories);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setEditedCategories(categories);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>카테고리 관리</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            {editedCategories.map((category) => (
              <div key={category.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">카테고리 이름</Label>
                    <Input
                      value={category.name}
                      onChange={(e) =>
                        handleUpdateCategory(category.id, 'name', e.target.value)
                      }
                      placeholder="카테고리 이름"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">색상</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={category.color}
                        onChange={(e) =>
                          handleUpdateCategory(category.id, 'color', e.target.value)
                        }
                        className="w-16 h-9 p-1 cursor-pointer"
                      />
                      <Input
                        value={category.color}
                        onChange={(e) =>
                          handleUpdateCategory(category.id, 'color', e.target.value)
                        }
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                  disabled={editedCategories.length <= 1}
                >
                  <Trash2 className="size-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={handleAddCategory}
            className="w-full gap-2"
          >
            <Plus className="size-4" />
            카테고리 추가
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          <Button onClick={handleSave}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
