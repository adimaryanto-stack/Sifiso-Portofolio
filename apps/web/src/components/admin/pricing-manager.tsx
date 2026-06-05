"use client";

import React, { useState, useTransition } from "react";
import { createPricingPackage, updatePricingPackage, deletePricingPackage, reorderPricingPackages } from "@/lib/actions/pricing";
import { Button } from "@sifiso/ui/components/button";
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Save, X, Loader2 } from "lucide-react";

export function PricingManager({ initialPackages }: { initialPackages: any[] }) {
  const [packages, setPackages] = useState(initialPackages);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showNewForm, setShowNewForm] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createPricingPackage(formData);
      if (res.success && res.data) {
        setPackages([res.data, ...packages]);
        setShowNewForm(false);
      } else {
        alert(res.error || "Failed to create pricing package");
      }
    });
  };

  const handleUpdate = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.has("isActive")) formData.set("isActive", "false");
    if (!formData.has("isPopular")) formData.set("isPopular", "false");

    startTransition(async () => {
      const res = await updatePricingPackage(id, formData);
      if (res.success && res.data) {
        setPackages(packages.map(p => p.id === id ? res.data : p));
        setEditingId(null);
      } else {
        alert(res.error || "Failed to update pricing package");
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pricing package?")) return;
    startTransition(async () => {
      const res = await deletePricingPackage(id);
      if (res.success) {
        setPackages(packages.filter(p => p.id !== id));
      }
    });
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === packages.length - 1) return;

    const newPackages = [...packages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newPackages[index], newPackages[targetIndex]] = [newPackages[targetIndex], newPackages[index]];
    
    const updates = newPackages.map((p, i) => ({ id: p.id, sortOrder: i }));
    setPackages(newPackages);

    startTransition(async () => {
      await reorderPricingPackages(updates);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-secondary">Manage your pricing packages and tiers.</p>
        <Button onClick={() => setShowNewForm(true)} disabled={showNewForm} className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Package</span>
        </Button>
      </div>

      {showNewForm && (
        <div className="bg-surface-elevated p-6 rounded-2xl border border-border">
          <h3 className="font-bold mb-4">New Pricing Package</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-secondary mb-1 block">Name *</label>
                <input name="name" placeholder="e.g. Starter" required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-secondary mb-1 block">Price *</label>
                <input name="price" placeholder="e.g. $999 or Custom" required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-secondary mb-1 block">Badge (Optional)</label>
              <input name="badge" placeholder="e.g. Most Popular" className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-secondary mb-1 block">Features (One per line)</label>
              <textarea name="features" rows={5} placeholder="Up to 5 pages\nBasic SEO\n1 revision" className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowNewForm(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending} className="flex items-center space-x-2">
                {isPending && <Loader2 size={16} className="animate-spin" />}
                <span>Save Package</span>
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {packages.length === 0 && !showNewForm && (
          <div className="text-center py-12 bg-surface border border-border rounded-2xl text-secondary">
            No pricing packages found.
          </div>
        )}

        {packages.map((pkg, index) => (
          <div key={pkg.id} className="bg-surface border border-border rounded-2xl p-6 transition-all">
            {editingId === pkg.id ? (
              <form onSubmit={(e) => handleUpdate(pkg.id, e)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-secondary mb-1 block">Name *</label>
                    <input name="name" defaultValue={pkg.name} required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-secondary mb-1 block">Price *</label>
                    <input name="price" defaultValue={pkg.price} required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-secondary mb-1 block">Badge</label>
                  <input name="badge" defaultValue={pkg.badge || ""} placeholder="e.g. Most Popular" className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-secondary mb-1 block">Features (One per line)</label>
                  <textarea name="features" defaultValue={(pkg.features || []).join("\n")} rows={4} className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border mt-4">
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="isActive" value="true" defaultChecked={pkg.isActive} className="w-4 h-4 rounded accent-primary bg-surface border-border" />
                      <span className="text-sm font-medium">Active</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="isPopular" value="true" defaultChecked={pkg.isPopular} className="w-4 h-4 rounded accent-primary bg-surface border-border" />
                      <span className="text-sm font-medium">Popular (Highlight)</span>
                    </label>
                  </div>
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
                    <button onClick={() => handleMove(index, 'down')} disabled={index === packages.length - 1 || isPending} className="p-1 text-secondary hover:text-primary disabled:opacity-30 disabled:hover:text-secondary rounded bg-surface-elevated">
                      <ArrowDown size={14} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg flex items-center space-x-2">
                      <span>{pkg.name}</span>
                      <span className="text-primary font-mono text-base">{pkg.price}</span>
                      {pkg.isPopular && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">Popular</span>}
                      {!pkg.isActive && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 uppercase tracking-wider">Hidden</span>}
                    </h4>
                    {pkg.badge && <p className="text-xs text-primary mt-1 border border-primary/20 inline-block px-2 py-0.5 rounded">{pkg.badge}</p>}
                    <div className="mt-2 text-sm text-secondary">
                      <ul className="list-disc pl-4 space-y-0.5">
                        {(pkg.features || []).map((f: string, i: number) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <Button variant="ghost" onClick={() => setEditingId(pkg.id)} className="p-2 text-secondary hover:text-primary hover:bg-surface-elevated">
                    <Edit2 size={18} />
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(pkg.id)} className="p-2 text-secondary hover:text-red-500 hover:bg-surface-elevated">
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
