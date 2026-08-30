import React, { useState } from 'react';
import { Newspaper, ExternalLink, Clock, ChevronRight } from 'lucide-react';
import type { SolanaNewsArticle } from '../types/solana';

interface Props {
    articles: SolanaNewsArticle[];
}

export const NewsFeed: React.FC<Props> = ({ articles }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [activeArticleModal, setActiveArticleModal] = useState<SolanaNewsArticle | null>(null);

    const categories = ['All', 'Solana Core', 'DeFi', 'Infrastructure', 'Memes & NFTs'];

    const filteredNews = articles.filter(a => {
        if (selectedCategory === 'All') return true;
        return a.category.toLowerCase().includes(selectedCategory.toLowerCase());
    });

    return (
        <div className="glass-card" style={{ padding: '20px', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Newspaper size={18} color="var(--accent-blue)" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                            Solana Ecosystem Intelligence & News Radar
                        </h3>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
                        Live feed covering network upgrades, protocol governance, and Web3 developments
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                background: selectedCategory === cat ? 'rgba(59, 130, 246, 0.18)' : '#0F141F',
                                color: selectedCategory === cat ? '#60A5FA' : 'var(--text-muted)',
                                border: selectedCategory === cat ? '1px solid #3B82F6' : '1px solid var(--border-color)',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontSize: '0.74rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px' }}>
                {filteredNews.map((article) => (
                    <div
                        key={article.id}
                        className="glass-card glass-card-interactive"
                        onClick={() => setActiveArticleModal(article)}
                        style={{
                            padding: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            background: '#0F141F'
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span className="badge badge-info" style={{ fontSize: '0.68rem' }}>
                                    {article.category}
                                </span>
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Clock size={11} /> {article.publishedAt}
                                </span>
                            </div>

                            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px', lineHeight: '1.35' }}>
                                {article.title}
                            </h4>

                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.45', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {article.summary}
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-dim)' }}>
                                Source: <span style={{ color: 'var(--text-muted)' }}>{article.source}</span>
                            </span>

                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                                Read article <ChevronRight size={13} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {activeArticleModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div className="glass-card" style={{ maxWidth: '580px', width: '100%', padding: '24px', background: '#121621', border: '1px solid var(--border-active)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                            <span className="badge badge-solana">{activeArticleModal.category}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{activeArticleModal.publishedAt}</span>
                        </div>

                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF', marginBottom: '12px', lineHeight: '1.3' }}>
                            {activeArticleModal.title}
                        </h2>

                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                            {activeArticleModal.summary}
                            <br /><br />
                            This intelligence update reflects ongoing developments across the Solana Web3 ecosystem. Financial institutions and liquidity providers closely monitor these performance metrics.
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button
                                onClick={() => setActiveArticleModal(null)}
                                className="btn-secondary"
                            >
                                Close
                            </button>

                            <a
                                href={activeArticleModal.url}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-primary"
                                style={{ textDecoration: 'none' }}
                            >
                                Read Full Source Article <ExternalLink size={15} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
