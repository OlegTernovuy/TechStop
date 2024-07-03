import { Categories } from '@/types';

export const findTitleBySlug = (
    array: Categories[] | undefined,
    slug: string
): string | null => {
    if (!array) {
        return null;
    }

    for (const item of array) {
        if (item.slug === slug) {
            return item.title;
        }
        if (item.children && item.children.length > 0) {
            const childResult = findTitleBySlug(item.children, slug);
            if (childResult) {
                return childResult;
            }
        }
    }
    return null;
};
