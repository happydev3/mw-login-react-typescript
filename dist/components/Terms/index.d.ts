/// <reference types="react" />
import { StrictModalProps } from '@mw-kit/mw-ui';
declare type Terms = {
    id: number;
};
interface TermsProps extends StrictModalProps {
    term: Terms;
    onCancel: CallableFunction;
    onSuccess: CallableFunction;
}
export declare const Terms: (props: TermsProps) => JSX.Element;
export {};
