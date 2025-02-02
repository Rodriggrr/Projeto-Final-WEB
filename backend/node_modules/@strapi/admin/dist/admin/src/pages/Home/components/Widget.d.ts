import { MessageDescriptor } from 'react-intl';
import * as React from 'react';
interface RootProps {
    title: MessageDescriptor;
    icon?: typeof import('@strapi/icons').PuzzlePiece;
    children: React.ReactNode;
}
interface LoadingProps {
    children?: string;
}
interface ErrorProps {
    children?: string;
}
interface NoDataProps {
    children?: string;
}
declare const Widget: {
    Root: ({ title, icon, children }: RootProps) => import("react/jsx-runtime").JSX.Element;
    Loading: ({ children }: LoadingProps) => import("react/jsx-runtime").JSX.Element;
    Error: ({ children }: ErrorProps) => import("react/jsx-runtime").JSX.Element;
    NoData: ({ children }: NoDataProps) => import("react/jsx-runtime").JSX.Element;
};
export { Widget };
