'use client';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { Search } from 'lucide-react';
import type { ComponentProps } from 'react';

export function SearchButton(props: ComponentProps<'button'>) {
  const { setOpenSearch } = useSearchContext();

  return (
    <button type="button" onClick={() => setOpenSearch(true)} {...props}>
      <Search className="size-4" aria-hidden />
      Search the handbook
      <kbd className="ms-1 rounded border px-1.5 font-sans text-xs text-fd-muted-foreground max-sm:hidden">⌘K</kbd>
    </button>
  );
}
