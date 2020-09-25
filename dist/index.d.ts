import React from 'react';
import { BannerProps } from './components';
interface MwLoginProps {
    basename: string;
    banner: BannerProps;
    onSuccess: CallableFunction;
}
interface ContextProps {
    locale: string;
    changeLocale: CallableFunction;
}
export declare const Context: React.Context<Partial<ContextProps>>;
export declare const MwLogin: (props: MwLoginProps) => JSX.Element;
export {};
