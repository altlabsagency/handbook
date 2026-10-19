import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        { text: 'Handbook', url: '/docs' },
        { text: 'Changelog', url: '/docs/changelog' },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
