/// <reference types="react" />
export interface BannerProps {
    logo?: string;
    background?: string;
    title: string;
    description: string;
    footer: string;
}
export declare const Banner: {
    (props: BannerProps): JSX.Element;
    defaultProps: Partial<BannerProps>;
};
