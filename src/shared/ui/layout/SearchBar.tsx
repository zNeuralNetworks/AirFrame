import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { SearchableItem } from '../Layout';

interface SearchBarProps {
  searchData: SearchableItem[];
  onSearchResultClick?: (id: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchData, onSearchResultClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2 || !searchData) return [];
    
    const lowerQuery = searchQuery.toLowerCase();
    return searchData.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.content.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 5).map(item => {
      const contentIndex = item.content.toLowerCase().indexOf(lowerQuery);
      let snippet = item.content.substring(0, 60) + '...';
      if (contentIndex > -1) {
        const start = Math.max(0, contentIndex - 20);
        const end = Math.min(item.content.length, contentIndex + 40);
        snippet = (start > 0 ? '...' : '') + item.content.substring(start, end) + (end < item.content.length ? '...' : '');
      }
      return { ...item, snippet };
    });
  }, [searchQuery, searchData]);

  const handleSearchClick = (id: string) => {
    setSearchQuery('');
    if (onSearchResultClick) onSearchResultClick(id);
  };

  return (
    <div className="px-4 mb-4 relative">
      <div className="relative group">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-muted group-focus-within:text-brand-500 transition-colors" />
        <input 
          ref={searchInputRef}
          type="text" 
          placeholder="Search (Cmd+K)" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          className="w-full pl-9 pr-3 py-2 bg-surface border border-border-DEFAULT rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-text-muted shadow-sm"
        />
        {searchQuery ? (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-2 text-text-muted hover:text-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="absolute right-3 top-2.5 pointer-events-none hidden group-hover:block">
             <span className="text-2xs text-text-muted border border-border-DEFAULT rounded px-1.5 py-0.5 bg-surface-highlight">⌘K</span>
          </div>
        )}
      </div>

      {searchQuery && (isSearchFocused || searchResults.length > 0) && (
        <div className="absolute left-4 right-4 top-full mt-2 bg-surface rounded-xl shadow-xl border border-border-highlight overflow-hidden z-50 max-h-80 overflow-y-auto">
          {searchResults.length > 0 ? (
            searchResults.map(res => (
              <button
                key={res.id}
                onClick={() => handleSearchClick(res.id)}
                className="w-full text-left p-3 hover:bg-surface-highlight border-b border-border-DEFAULT last:border-0 transition-colors"
              >
                <div className="text-2xs text-brand-600 font-bold uppercase mb-0.5">{res.category}</div>
                <div className="font-bold text-text-primary text-sm mb-1">{res.title}</div>
                <div className="text-2xs text-text-muted line-clamp-2">{res.snippet}</div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-text-muted">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
