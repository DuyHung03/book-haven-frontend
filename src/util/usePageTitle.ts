import { useEffect } from 'react';

function usePageTitle(title: string) {
    useEffect(() => {
        document.title = `${title} - Book Haven`;
    }, [title]);
}

export default usePageTitle;
