export interface User {
    id: string;
    name: string;
    profileImage: string;
}

export interface Task {
    id: string;
    userId?: string;
    title: string;
    category: 'Ready' | 'In Progress' | 'Review' | 'Undefined';
    estimate: string;
    status: 'Done' | 'Not Done';
    estimatedHours: number;
    spentHours: number;
}