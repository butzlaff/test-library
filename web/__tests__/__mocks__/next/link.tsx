// import Link from 'next/link';
// import { NextRouter } from 'next/router';
// import React, { ReactElement } from 'react';

import React, { ReactElement } from 'react';

jest.mock('next/link', () => {
  return ({ children, ...rest }: { children: ReactElement }) => {
    return <a {...rest}> {children}</a>;
  };
});

jest.mock(
  'next/router',
  () => ({
    useRouter: () => ({
      pathname: '/',
      push: jest.fn(),
    }),
  }),
  { virtual: true },
);

// jest.mock('next/navigation', () => {});

// export function createMockRouter(router: Partial<NextRouter>): NextRouter {
//   return {
//     basePath: '',
//     pathname: '/',
//     route: '/',
//     query: {},
//     asPath: '/',
//     back: jest.fn(),
//     beforePopState: jest.fn(),
//     prefetch: jest.fn(),
//     push: jest.fn(),
//     reload: jest.fn(),
//     replace: jest.fn(),
//     events: {
//       on: jest.fn(),
//       off: jest.fn(),
//       emit: jest.fn(),
//     },
//     isFallback: false,
//     isLocaleDomain: false,
//     isReady: true,
//     defaultLocale: 'en',
//     domainLocales: [],
//     isPreview: false,
//     forward: jest.fn(),
//     ...router,
//   };
// }
// // import React, { ReactElement } from 'react';
// // export default MockedLink;
