import { apiClient } from '@/api/api-client';

export interface BlogCardDTO {
    id: string;
    category: string;
    title: string;
    slug: string;
    description: string;
    author: string;
    date: string;
    views: string;
    readTime: string;
    imageUrl: string;
}

interface PublishedBlogsResponse {
    success: boolean;
    data: BlogCardDTO[];
}

export const fetchPublishedBlogs = async (params?: {
    limit?: number;
    docType?: 'BLOG' | 'RESEARCH';
}): Promise<BlogCardDTO[]> => {
    const { data } = await apiClient.get<PublishedBlogsResponse>(
        '/blog/published/landing',
        {
            params,
        },
    );

    return data.data;
};
