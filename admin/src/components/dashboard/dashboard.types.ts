// =====================================================================
// Dashboard types — mirrored 1:1 from backend controllers, do not
// widen loosely. Keep in sync with:
//   backend/src/controllers/admin.controller.ts
// =====================================================================

export interface AnalyticsSummary {
    totalViews: number;
    totalBlogs: number;
}

export interface AnalyticsResponse {
    success: boolean;
    analytics: AnalyticsSummary;
}

export interface BlogAnalyticsItem {
    _id: string;
    title: string;
    slug: string;
    views: number;
    createdAt: string;
}

export interface BlogAnalyticsResponse {
    success: boolean;
    blogs: BlogAnalyticsItem[];
}

export type AdminRole = 'READER' | 'PUBLISHER' | 'ADMIN' | 'EDITOR';

export interface AdminUser {
    _id: string;
    email: string;
    name: string;
    role: AdminRole;
    isActive: boolean;
    avatar?: string;
}

export interface BlockedUsersResponse {
    success: boolean;
    count: number;
    users: AdminUser[];
}

export interface RoleListResponse {
    msg: string;
    editor: AdminUser[];
}

export interface DashboardData {
    totalViews: number;
    totalBlogs: number;
    blockedCount: number;
    editorCount: number;
    publisherCount: number;
    blogs: BlogAnalyticsItem[];
}

export interface ViewsByDayPoint {
    _id: string; // "YYYY-MM-DD"
    views: number;
}

export interface ViewsByBlogPoint {
    _id: string;
    title: string;
    slug: string;
    views: number;
    createdAt: string;
}

export interface ViewsTimeseriesResponse {
    success: boolean;
    range: string;
    totalViewsInRange: number;
    byDay: ViewsByDayPoint[];
    byBlog: ViewsByBlogPoint[];
}

export const RANGE_OPTIONS = ['7 Days', '30 Days', 'All Time'] as const;
export type RangeOption = (typeof RANGE_OPTIONS)[number];