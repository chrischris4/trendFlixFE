'use client';

import { useEffect, useState } from 'react';
import { fetchBlogArticles } from '../../services/api';
import { createBlogArticle, updateBlogArticle, deleteBlogArticle } from '../../services/admin';
import type { BlogArticle } from '../../types';

interface FormData {
  tmdbId: string;
  type: string;
  title: string;
  channelTitle: string;
  posterPath: string;
  viewCount: string;
  weekOf: string;
  editorialFr: string;
  editorialEn: string;
}

const emptyForm: FormData = {
  tmdbId: '', type: 'movie', title: '', channelTitle: '',
  posterPath: '', viewCount: '', weekOf: '', editorialFr: '', editorialEn: '',
};

export default function AdminPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  function load() {
    fetchBlogArticles()
      .then(data => setArticles(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())))
      .catch(() => setStatus('Erreur lors du chargement'));
  }

  useEffect(() => { load(); }, []);

  function startEdit(a: BlogArticle) {
    setEditingId(a.id);
    setForm({
      tmdbId: a.tmdbId?.toString() ?? '',
      type: a.type ?? 'movie',
      title: a.title,
      channelTitle: a.channelTitle,
      posterPath: a.posterPath ?? '',
      viewCount: a.viewCount?.toString() ?? '',
      weekOf: a.weekOf ? a.weekOf.split('T')[0] : '',
      editorialFr: a.editorialFr,
      editorialEn: a.editorialEn,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setStatus('');
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('En cours...');
    try {
      const payload = {
        ...(form.tmdbId ? { tmdbId: Number(form.tmdbId) } : {}),
        type: form.type || undefined,
        title: form.title,
        channelTitle: form.channelTitle,
        ...(form.posterPath ? { posterPath: form.posterPath } : {}),
        ...(form.viewCount ? { viewCount: Number(form.viewCount) } : {}),
        weekOf: form.weekOf || new Date().toISOString().split('T')[0],
        editorialFr: form.editorialFr,
        editorialEn: form.editorialEn,
      };
      if (editingId !== null) {
        await updateBlogArticle(editingId, payload);
        setStatus('Article mis à jour !');
      } else {
        await createBlogArticle(payload as Parameters<typeof createBlogArticle>[0]);
        setStatus('Article publié !');
      }
      cancelEdit();
      load();
    } catch (err: unknown) {
      setStatus(`Erreur : ${err instanceof Error ? err.message : 'inconnue'}`);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer cet article ?')) return;
    try {
      await deleteBlogArticle(id);
      load();
    } catch {
      setStatus('Erreur lors de la suppression');
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#1a1a1a',
    border: '1px solid #2a2a2a', borderRadius: 6, color: '#f5f5f5',
    fontSize: 14, fontFamily: 'inherit', outline: 'none',
  };

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', color: '#f5f5f5', padding: '40px 20px', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 32, color: '#e50914' }}>
          TrendFlix Admin
        </h1>

        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, padding: 28, marginBottom: 40 }}>
          <h2 style={{ marginBottom: 20, fontSize: 16 }}>
            {editingId !== null ? `✏️ Blog — Éditer l'article #${editingId}` : '📝 Blog — Nouvel article'}
          </h2>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>TMDB ID (optionnel)</label>
                <input style={inp} value={form.tmdbId} onChange={e => setForm(f => ({ ...f, tmdbId: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Type</label>
                <select style={inp} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="movie">Film</option>
                  <option value="tv">Série</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Titre *</label>
              <input required style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Sous-titre / Studio / Réalisateur</label>
              <input style={inp} value={form.channelTitle} onChange={e => setForm(f => ({ ...f, channelTitle: e.target.value }))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Poster path TMDB</label>
                <input style={inp} placeholder="/xxxx.jpg" value={form.posterPath} onChange={e => setForm(f => ({ ...f, posterPath: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Nb vues / spectateurs</label>
                <input type="number" style={inp} value={form.viewCount} onChange={e => setForm(f => ({ ...f, viewCount: e.target.value }))} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Date de publication</label>
              <input type="date" style={inp} value={form.weekOf} onChange={e => setForm(f => ({ ...f, weekOf: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Éditorial FR *</label>
              <textarea required rows={5} style={{ ...inp, resize: 'vertical' }} value={form.editorialFr} onChange={e => setForm(f => ({ ...f, editorialFr: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Editorial EN *</label>
              <textarea required rows={5} style={{ ...inp, resize: 'vertical' }} value={form.editorialEn} onChange={e => setForm(f => ({ ...f, editorialEn: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" style={{ padding: '10px 20px', background: '#e50914', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
                {editingId !== null ? 'Mettre à jour' : 'Publier l\'article'}
              </button>
              {editingId !== null && (
                <button type="button" onClick={cancelEdit} style={{ padding: '10px 20px', background: '#333', color: '#ccc', border: '1px solid #444', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
                  Annuler
                </button>
              )}
            </div>
            {status && <p style={{ fontSize: 13, color: status.startsWith('Erreur') ? '#f87171' : '#4ade80' }}>{status}</p>}
          </form>
        </div>

        <h2 style={{ fontSize: 16, marginBottom: 16 }}>Articles publiés ({articles.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {articles.map(a => (
            <div key={a.id} style={{
              background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8,
              padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>#{a.id} — {a.title}</div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {new Date(a.createdAt).toLocaleDateString('fr-FR')} · {a.type ?? '—'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => startEdit(a)} style={{ padding: '6px 14px', background: '#166534', color: '#4ade80', border: '1px solid #166534', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  Éditer
                </button>
                <button onClick={() => handleDelete(a.id)} style={{ padding: '6px 14px', background: '#450a0a', color: '#f87171', border: '1px solid #450a0a', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
