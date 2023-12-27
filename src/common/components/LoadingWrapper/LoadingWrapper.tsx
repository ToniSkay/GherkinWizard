import {ReactNode} from 'react';
import {Loader} from '../Loader/Loader';

interface IProps {
    children: ReactNode;
    isLoading: boolean;
}

export const LoadingWrapper = ({children, isLoading}: IProps) => {
    return (<> { isLoading ? (<Loader/>) : (children) } </>);
};
