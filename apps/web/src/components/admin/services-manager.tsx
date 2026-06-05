"use client";

import React, { useState, useTransition } from "react";
import { createService, updateService, deleteService, reorderServices } from "@/lib/actions/services";
import { Button } from "@sifiso/ui/components/button";
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Save, X, Loader2 } from "lucide-react";

export function ServicesManager({ initialServices }: { initialServices: any[] }) {
  const [services, setServices] = useState(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // New service form state
  const [showNewForm, setShowNewForm] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createService(formData);
      if (res.success && res.data) {
        setServices([res.data, ...services]);
        setShowNewForm(false);
      } else {
        alert(res.error || "Failed to create service");
      }
    });
  };

  const handleUpdate = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Add isActive explicitly since unchecked checkboxes aren't submitted
    if (!formData.has("isActive")) {
      formData.set("isActive", "false");
    }

    startTransition(async () => {
      const res = await updateService(id, formData);
      if (res.success && res.data) {
        setServices(services.map(s => s.id === id ? res.data : s));
        setEditingId(null);
      } else {
        alert(res.error || "Failed to update service");
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    startTransition(async () => {
      const res = await deleteService(id);
      if (res.success) {
        setServices(services.filter(s => s.id !== id));
      }
    });
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === services.length - 1) return;

    const newServices = [...services];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    [newServices[index], newServices[targetIndex]] = [newServices[targetIndex], newServices[index]];
    
    // Update sortOrder
    const updates = newServices.map((s, i) => ({ id: s.id, sortOrder: i }));
    setServices(newServices);

    startTransition(async () => {
      await reorderServices(updates);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-secondary">Manage your services offered.</p>
        <Button onClick={() => setShowNewForm(true)} disabled={showNewForm} className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Service</span>
        </Button>
      </div>

      {showNewForm && (
        <div className="bg-surface-elevated p-6 rounded-2xl border border-border">
          <h3 className="font-bold mb-4">New Service</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-secondary mb-1 block">Title *</label>
                <input name="title" required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-secondary mb-1 block">Icon Name (Lucide)</label>
                <input name="iconName" placeholder="e.g. Monitor, Palette" className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-secondary mb-1 block">Description</label>
              <textarea name="description" rows={3} className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-secondary mb-1 block">Process Steps (one per line)</label>
                <textarea name="process" placeholder="e.g.&#10;Discovery&#10;Design&#10;Development&#10;Delivery" rows={4} className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
              </div>
              <div>
                <label className="text-xs font-bold text-secondary mb-1 block">Key Benefits (one per line)</label>
                <textarea name="benefits" placeholder="e.g.&#10;High Quality&#10;Fast Delivery&#10;24/7 Support" rows={4} className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowNewForm(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending} className="flex items-center space-x-2">
                {isPending && <Loader2 size={16} className="animate-spin" />}
                <span>Save Service</span>
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {services.length === 0 && !showNewForm && (
          <div className="text-center py-12 bg-surface border border-border rounded-2xl text-secondary">
            No services found.
          </div>
        )}

        {services.map((service, index) => (
          <div key={service.id} className="bg-surface border border-border rounded-2xl p-6 transition-all">
            {editingId === service.id ? (
              <form onSubmit={(e) => handleUpdate(service.id, e)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-secondary mb-1 block">Title *</label>
                    <input name="title" defaultValue={service.title} required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-secondary mb-1 block">Icon Name (Lucide)</label>
                    <input name="iconName" defaultValue={service.iconName || ""} placeholder="e.g. Monitor, Palette" className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-secondary mb-1 block">Description</label>
                  <textarea name="description" defaultValue={service.description || ""} rows={2} className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-secondary mb-1 block">Process Steps (one per line)</label>
                    <textarea name="process" defaultValue={service.process ? (service.process as string[]).join("\n") : ""} placeholder="e.g.&#10;Discovery&#10;Design&#10;Development&#10;Delivery" rows={4} className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-secondary mb-1 block">Key Benefits (one per line)</label>
                    <textarea name="benefits" defaultValue={service.benefits ? (service.benefits as string[]).join("\n") : ""} placeholder="e.g.&#10;High Quality&#10;Fast Delivery&#10;24/7 Support" rows={4} className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border mt-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="isActive" value="true" defaultChecked={service.isActive} className="w-4 h-4 rounded accent-primary bg-surface border-border" />
                    <span className="text-sm font-medium">Active (Visible on public site)</span>
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
                    <button onClick={() => handleMove(index, 'down')} disabled={index === services.length - 1 || isPending} className="p-1 text-secondary hover:text-primary disabled:opacity-30 disabled:hover:text-secondary rounded bg-surface-elevated">
                      <ArrowDown size={14} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg flex items-center space-x-2">
                      <span>{service.title}</span>
                      {!service.isActive && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 uppercase tracking-wider">Hidden</span>}
                    </h4>
                    <p className="text-sm text-secondary mt-1 max-w-2xl">{service.description || "No description provided."}</p>
                    {service.iconName && <p className="text-xs text-secondary mt-2 flex items-center"><span className="opacity-50 mr-1">Icon:</span> {service.iconName}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <Button variant="ghost" onClick={() => setEditingId(service.id)} className="p-2 text-secondary hover:text-primary hover:bg-surface-elevated">
                    <Edit2 size={18} />
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(service.id)} className="p-2 text-secondary hover:text-red-500 hover:bg-surface-elevated">
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
