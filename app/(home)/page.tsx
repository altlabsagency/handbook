import Link from 'next/link';
import type { Folder } from 'fumadocs-core/page-tree';
import { SearchButton } from '@/components/search-button';
import { cn } from '@/lib/cn';
import { source } from '@/lib/source';
import { docsRoute, gitConfig } from '@/lib/shared';

const button = {
  primary:
    'inline-flex justify-center rounded-full bg-fd-primary px-5 py-3 font-medium tracking-tight text-fd-primary-foreground transition-colors hover:bg-fd-primary/85',
  secondary:
    'inline-flex items-center justify-center gap-2 rounded-full border bg-fd-secondary px-5 py-3 font-medium tracking-tight text-fd-secondary-foreground transition-colors hover:bg-fd-accent',
};

const card = 'rounded-2xl border bg-fd-card p-6 text-sm shadow-lg';

function getSections() {
  return source
    .getPageTree()
    .children.filter(
      (node): node is Folder =>
        node.type === 'folder' && node.index !== undefined && node.index.url.replace(/\/$/, '') !== docsRoute,
    )
    .map((folder) => ({
      folder,
      url: folder.index!.url,
      description: source.getNodePage(folder.index!)?.data.description,
    }));
}

export default function HomePage() {
  const [featured, ...sections] = getSections();

  return (
    <main className="px-4 pt-4 pb-6 md:pb-12">
      <div className="relative mx-auto flex w-full max-w-[1400px] overflow-hidden rounded-2xl border bg-[radial-gradient(60%_70%_at_100%_0%,color-mix(in_oklab,var(--color-fd-primary)_22%,transparent),transparent)]">
        <div className="z-2 flex w-full flex-col px-4 pb-12 max-md:items-center max-md:text-center md:p-12 md:pb-16">
          <h1 className="mt-12 mb-8 text-4xl leading-tight font-medium tracking-tight xl:mb-12 xl:text-5xl">
            How we build software
            <br />
            at <span className="text-fd-primary">AltLabs</span>.
          </h1>
          <div className="flex w-fit flex-row flex-wrap items-center justify-center gap-4">
            <Link href="/docs" className={cn(button.primary, 'max-sm:text-sm')}>
              Start reading
            </Link>
            <SearchButton className={cn(button.secondary, 'max-sm:text-sm')} />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-[1400px] grid-cols-1 gap-10 px-2 md:px-12 lg:mt-20 lg:grid-cols-3">
        <p className="col-span-full text-2xl leading-snug font-light tracking-tight md:text-3xl xl:text-4xl">
          This handbook describes how engineering works at AltLabs: how we make{' '}
          <span className="font-medium text-fd-primary">decisions</span>, the{' '}
          <span className="font-medium text-fd-primary">standards</span> we hold ourselves to, the{' '}
          <span className="font-medium text-fd-primary">tools</span> we build with, and how we{' '}
          <span className="font-medium text-fd-primary">deliver</span> for our clients.
        </p>

        {featured && (
          <Link
            href={featured.url}
            className={cn(card, 'col-span-full flex flex-col transition-colors hover:bg-fd-accent/40 md:p-8')}
          >
            <span className="mb-4 text-fd-primary" aria-hidden>
              {featured.folder.icon}
            </span>
            <h2 className="mb-4 text-xl font-medium tracking-tight lg:text-2xl">{featured.folder.name}</h2>
            <p className="max-w-2xl text-fd-muted-foreground">{featured.description}</p>
          </Link>
        )}

        {sections.map(({ folder, url, description }) => (
          <Link key={url} href={url} className={cn(card, 'flex flex-col transition-colors hover:bg-fd-accent/40')}>
            <span className="mb-4 text-fd-primary" aria-hidden>
              {folder.icon}
            </span>
            <h2 className="mb-2 text-xl font-medium tracking-tight">{folder.name}</h2>
            <p className="text-fd-muted-foreground">{description}</p>
          </Link>
        ))}

        <div className={cn(card, 'col-span-full flex flex-col md:p-8 lg:col-span-2')}>
          <h2 className="mb-6 text-xl font-medium tracking-tight lg:text-2xl">A living document.</h2>
          <p className="mb-6 max-w-xl">
            This handbook will never be finished. If something is missing, unclear or out of date, propose a
            change. It only stays useful if the people who rely on it keep it accurate.
          </p>
          <div className="mt-auto flex flex-row flex-wrap gap-3">
            <Link href="/docs/contributing" className={button.primary}>
              How to contribute
            </Link>
            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              target="_blank"
              rel="noreferrer noopener"
              className={button.secondary}
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className={cn(card, 'col-span-full flex flex-col md:p-8 lg:col-span-1')}>
          <h2 className="mb-6 text-xl font-medium tracking-tight lg:text-2xl">New here?</h2>
          <p className="mb-6">Start with why the handbook exists and how to use it, then see what's changed recently.</p>
          <div className="mt-auto flex flex-row flex-wrap gap-3">
            <Link href="/docs/about" className={button.primary}>
              About
            </Link>
            <Link href="/docs/changelog" className={button.secondary}>
              Changelog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
