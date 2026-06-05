"use client";

import React, { useState, useTransition } from "react";
import { createQuote, updateQuote, deleteQuote, reorderQuotes } from "@/lib/actions/quotes";
import { Button } from "@sifiso/ui/components/button";
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Save, X, Loader2 } from "lucide-react";

export function QuotesManager({ initialQuotes }: { initialQuotes: any[] }) {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showNewForm, setShowNewForm] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createQuote(formData);
      if (res.success && res.data) {
        setQuotes([res.data, ...quotes]);
        setShowNewForm(false);
      } else {
        alert(res.error || "Failed to create quote");
      }
    });
  };

  const handleUpdate = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.has("isActive")) formData.set("isActive", "false");

    startTransition(async () => {
      const res = await updateQuote(id, formData);
      if (res.success && res.data) {
        setQuotes(quotes.map(q => q.id === id ? res.data : q));
        setEditingId(null);
      } else {
        alert(res.error || "Failed to update quote");
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;
    startTransition(async () => {
      const res = await deleteQuote(id);
      if (res.success) {
        setQuotes(quotes.filter(q => q.id !== id));
      }
    });
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === quotes.length - 1) return;

    const newQuotes = [...quotes];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newQuotes[index], newQuotes[targetIndex]] = [newQuotes[targetIndex], newQuotes[index]];
    
    const updates = newQuotes.map((q, i) => ({ id: q.id, sortOrder: i }));
    setQuotes(newQuotes);

    startTransition(async () => {
      await reorderQuotes(updates);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-secondary">Manage inspirational quotes shown on your site.</p>
        <Button onClick={() => setShowNewForm(true)} disabled={showNewForm} className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Quote</span>
        </Button>
      </div>

      {showNewForm && (
        <div className="bg-surface-elevated p-6 rounded-2xl border border-border">
          <h3 className="font-bold mb-4">New Quote</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-secondary mb-1 block">Quote Content *</label>
              <textarea name="content" rows={3} placeholder="e.g. Design is not just what it looks like and feels like..." required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
            </div>
            <div>
              <label className="text-xs font-bold text-secondary mb-1 block">Author *</label>
              <input name="author" placeholder="e.g. Steve Jobs" required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowNewForm(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending} className="flex items-center space-x-2">
                {isPending && <Loader2 size={16} className="animate-spin" />}
                <span>Save Quote</span>
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {quotes.length === 0 && !showNewForm && (
          <div className="text-center py-12 bg-surface border border-border rounded-2xl text-secondary">
            No quotes found.
          </div>
        )}

        {quotes.map((quote, index) => (
          <div key={quote.id} className="bg-surface border border-border rounded-2xl p-6 transition-all">
            {editingId === quote.id ? (
              <form onSubmit={(e) => handleUpdate(quote.id, e)} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-secondary mb-1 block">Quote Content *</label>
                  <textarea name="content" defaultValue={quote.content} rows={3} required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none"></textarea>
                </div>
                <div>
                  <label className="text-xs font-bold text-secondary mb-1 block">Author *</label>
                  <input name="author" defaultValue={quote.author} required className="w-full px-4 py-2 bg-surface border border-border rounded-xl focus:border-primary focus:outline-none" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border mt-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="isActive" value="true" defaultChecked={quote.isActive} className="w-4 h-4 rounded accent-primary bg-surface border-border" />
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
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex flex-col space-y-1">
                    <button onClick={() => handleMove(index, 'up')} disabled={index === 0 || isPending} className="p-1 text-secondary hover:text-primary disabled:opacity-30 disabled:hover:text-secondary rounded bg-surface-elevated">
                      <ArrowUp size={14} />
                    </button>
                    <button onClick={() => handleMove(index, 'down')} disabled={index === quotes.length - 1 || isPending} className="p-1 text-secondary hover:text-primary disabled:opacity-30 disabled:hover:text-secondary rounded bg-surface-elevated">
                      <ArrowDown size={14} />
                    </button>
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-lg italic font-medium text-foreground">&quot;{quote.content}&quot;</blockquote>
                    <p className="text-sm text-primary mt-2 font-bold">— {quote.author}</p>
                    {!quote.isActive && <span className="mt-2 inline-block text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 uppercase tracking-wider">Hidden</span>}
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <Button variant="ghost" onClick={() => setEditingId(quote.id)} className="p-2 text-secondary hover:text-primary hover:bg-surface-elevated">
                    <Edit2 size={18} />
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(quote.id)} className="p-2 text-secondary hover:text-red-500 hover:bg-surface-elevated">
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
