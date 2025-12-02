import { Category } from '../App';
import { Button } from './ui/button';
import { Plus, Square, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Separator } from './ui/separator';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  categories: Category[];
  onAddNode: () => void;
  onAddZone: () => void;
  onManageCategories: () => void;
}

export function Sidebar({
  isOpen,
  onToggle,
  categories,
  onAddNode,
  onAddZone,
  onManageCategories,
}: SidebarProps) {
  return (
    <>
      <aside
        className={`bg-white border-r transition-all duration-300 ease-in-out flex flex-col ${
          isOpen ? 'w-80' : 'w-0'
        }`}
        style={{ overflow: isOpen ? 'visible' : 'hidden' }}
      >
        {isOpen && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-slate-900 mb-1">ML/DL/NLP 학습 로드맵</h1>
                <p className="text-sm text-slate-600">기술 발전 과정을 한눈에</p>
              </div>

              <Separator />

              {/* Actions */}
              <div className="space-y-3">
                <h2 className="text-slate-700 text-sm">관리</h2>
                <div className="space-y-2">
                  <Button
                    onClick={onAddNode}
                    className="w-full justify-start gap-2"
                  >
                    <Plus className="size-4" />
                    토픽 추가
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onAddZone}
                    className="w-full justify-start gap-2"
                  >
                    <Square className="size-4" />
                    구역 추가
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onManageCategories}
                    className="w-full justify-start gap-2"
                  >
                    <Settings className="size-4" />
                    카테고리 관리
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Categories */}
              <div className="space-y-3">
                <h2 className="text-slate-700 text-sm">카테고리</h2>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div
                      key={category.id}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div
                        className="w-4 h-4 rounded flex-shrink-0"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm text-slate-700">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Tips */}
              <div className="space-y-2 text-xs text-slate-500 bg-slate-50 p-4 rounded-lg">
                <p className="font-medium text-slate-700">💡 사용 팁</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>토픽을 드래그하여 위치 조정</li>
                  <li>구역 우하단을 드래그하여 크기 조절</li>
                  <li>토픽 클릭 후 편집 아이콘으로 수정</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-white border border-l-0 rounded-r-lg p-2 shadow-lg hover:bg-slate-50 transition-all z-20"
        style={{
          left: isOpen ? '320px' : '0px',
          transition: 'left 300ms ease-in-out',
        }}
      >
        {isOpen ? (
          <ChevronLeft className="size-5 text-slate-600" />
        ) : (
          <ChevronRight className="size-5 text-slate-600" />
        )}
      </button>
    </>
  );
}
