"use client";

import React, { useState, useTransition } from "react";
import { createProcessStep, updateProcessStep, deleteProcessStep, reorderProcessSteps } from "@/lib/actions/creative-process";
import { Button } from "@sifiso/ui/components/button";
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Save, X, Loader2 } from "lucide-react";

export function CreativeProcessManager({ initialSteps }: { initialSteps: any[] }) {
  const [steps, setSteps] = useState(initialSteps);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showNewForm, setShowNewForm] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createProcessStep(formData);
      if (res.success && res.data) {
        setSteps([res.data, ...steps]);
        setShowNewForm(false);
      } else {
        alert(res.error || "Failed to create process step");
      }
    });
  };

  const handleUpdate = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.has("isActive")) formData.set("isActive", "false");

    startTransition(async () => {
      const res = await updateProcessStep(id, formData);
      if (res.success && res.data) {
        setSteps(steps.map(s => s.id === id ? res.data : s));
        setEditingId(null);
      } else {
        alert(res.error || "Failed to update process step");
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this process step?")) return;
    startTransition(async () => {
      const res = await deleteProcessStep(id);
      if (res.success) {
        setSteps(steps.filter(s => s.id !== id));
      }
    });
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === steps.length - 1) return;

    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    
    const updates = newSteps.map((s, i) => ({ id: s.id, sortOrder: i }));
    setSteps(newSteps);

    startTransition(async () => {
      await reorderProcessSteps(updates);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-secondary">Manage your creative process timeline.</p>
        <Button onClick={() => setShowNewForm(true)} disabled={showNewForm} className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Step</span>
        </Button>
      </div>

      {showNewForm && (
        <div className="bg-surface-elevated p-6 rounded-2xl border border-border">
          <h3 className="font-bold mb-4">New Process Step</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-secondary mb-1 block">Step Number *</label>
                <input name="stepNumber" placeholder="e.g. 01" required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-secondary mb-1 block">Icon Name (Lucide)</label>
                <input name="iconName" placeholder="e.g. Compass, PenTool" className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-secondary mb-1 block">Title *</label>
                <input name="title" placeholder="e.g. Discovery" required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-secondary mb-1 block">Subtitle</label>
                <input name="subtitle" placeholder="e.g. Understanding your vision" className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-secondary mb-1 block">Description</label>
              <textarea name="description" rows={3} placeholder="We start by diving deep into your goals..." className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowNewForm(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending} className="flex items-center space-x-2">
                {isPending && <Loader2 size={16} className="animate-spin" />}
                <span>Save Step</span>
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {steps.length === 0 && !showNewForm && (
          <div className="text-center py-12 bg-surface border border-border rounded-2xl text-secondary">
            No process steps found.
          </div>
        )}

        {steps.map((step, index) => (
          <div key={step.id} className="bg-surface border border-border rounded-2xl p-6 transition-all">
            {editingId === step.id ? (
              <form onSubmit={(e) => handleUpdate(step.id, e)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-secondary mb-1 block">Step Number *</label>
                    <input name="stepNumber" defaultValue={step.stepNumber} required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-secondary mb-1 block">Icon Name (Lucide)</label>
                    <input name="iconName" defaultValue={step.iconName || ""} placeholder="e.g. Compass" className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-secondary mb-1 block">Title *</label>
                    <input name="title" defaultValue={step.title} required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-secondary mb-1 block">Subtitle</label>
                    <input name="subtitle" defaultValue={step.subtitle || ""} className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-secondary mb-1 block">Description</label>
                  <textarea name="description" defaultValue={step.description || ""} rows={3} className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border mt-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="isActive" value="true" defaultChecked={step.isActive} className="w-4 h-4 rounded accent-primary bg-surface border-border" />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                  <div className="flex space-x-2">
                    <Button type="button" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                    <Button type="submit" disabled={isPending} className="flex items-center space-x-2">
                      {isPending && <Loader2 size={16} className="animate-spin" />}
                      <span>Update</span>
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col space-y-1">
                    <button onClick={() => handleMove(index, 'up')} disabled={index === 0 || isPending} className="p-1 text-secondary hover:text-primary disabled:opacity-30 disabled:hover:text-secondary rounded bg-surface-elevated">
                      <ArrowUp size={14} />
                    </button>
                    <button onClick={() => handleMove(index, 'down')} disabled={index === steps.length - 1 || isPending} className="p-1 text-secondary hover:text-primary disabled:opacity-30 disabled:hover:text-secondary rounded bg-surface-elevated">
                      <ArrowDown size={14} />
                    </button>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-sm font-mono text-primary font-bold">{step.stepNumber}</span>
                      <h4 className="font-bold text-lg">{step.title}</h4>
                      {!step.isActive && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 uppercase tracking-wider">Hidden</span>}
                    </div>
                    {step.subtitle && <p className="text-sm font-medium text-foreground">{step.subtitle}</p>}
                    <p className="text-sm text-secondary mt-1">{step.description}</p>
                    {step.iconName && <p className="text-xs text-secondary mt-2 flex items-center"><span className="opacity-50 mr-1">Icon:</span> {step.iconName}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <Button variant="ghost" onClick={() => setEditingId(step.id)} className="p-2 text-secondary hover:text-primary hover:bg-surface-elevated">
                    <Edit2 size={18} />
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(step.id)} className="p-2 text-secondary hover:text-red-500 hover:bg-surface-elevated">
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
