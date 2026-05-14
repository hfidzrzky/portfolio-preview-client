export interface Project {
    id: string;
    title: string;
    roles: string[];
    thumbnail: string;
    description: string;
    year: string;
    category: string;
    url: string;
}

export interface ClientProfile {
    fullName: string;
    nickname: string;
    origin: string;
    education: string;
    major: string;
    roles: string[];
    bio: string;
}