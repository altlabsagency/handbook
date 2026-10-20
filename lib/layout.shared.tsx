import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';

function Logo() {
  return (
    <>
      <img
        src="/brand/altlabs-logo-black.png"
        alt="AltLabs"
        width={138}
        height={30}
        className="h-[30px] w-auto dark:hidden"
      />
      <img
        src="/brand/altlabs-logo-white.png"
        alt="AltLabs"
        width={138}
        height={30}
        className="hidden h-[30px] w-auto dark:block"
      />
    </>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
