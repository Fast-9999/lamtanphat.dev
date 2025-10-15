---
title: "JavaScript Async/Await 2025: Modern Patterns & React/Next.js Integration"
description: "Tìm hiểu về async/await, Promises, ES2024 features, React/Next.js async patterns, và modern asynchronous programming trong JavaScript"
date: 2025-04-19
categories: ["modern-javascript-2025"]
tags: ["javascript", "async", "await", "promises", "asynchronous", "es2024", "react", "nextjs", "server-components", "vitest", "playwright", "2025"]
featured: false
image: "https://sklc-tinymce-2021.s3.amazonaws.com/comp/2023/01/Coding%20Vs_1673525426.png"
draft: false
---

# JavaScript Async/Await 2025: Modern Patterns & React/Next.js Integration

Asynchronous programming là một phần quan trọng của JavaScript hiện đại. Trong bài viết này, chúng ta sẽ khám phá **async/await**, **Promises**, **ES2024 features**, **React/Next.js async patterns**, và cách xử lý các operations bất đồng bộ một cách hiệu quả trong môi trường hiện đại năm 2025.

## 🎯 Mục tiêu bài viết

Sau khi đọc xong bài viết này, bạn sẽ hiểu:
- Callback Hell và cách tránh với modern patterns
- Promises và cách sử dụng hiệu quả
- Async/Await syntax và ES2024 features
- Error handling trong async code với modern approaches
- Parallel vs Sequential execution và performance optimization
- React/Next.js async patterns và Server Components
- Modern testing với Vitest và Playwright
- State management với async (Zustand, Jotai)
- Real-world examples và best practices cho 2025

## 🔄 Callback Hell và Promises

### Callback Hell

```javascript
// Callback Hell - khó đọc và maintain
function getUserData(userId, callback) {
    setTimeout(() => {
        callback(null, { id: userId, name: 'John' });
    }, 1000);
}

function getPosts(userId, callback) {
    setTimeout(() => {
        callback(null, [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);
    }, 1000);
}

function getComments(postId, callback) {
    setTimeout(() => {
        callback(null, [{ id: 1, text: 'Great post!' }]);
    }, 1000);
}

// Callback Hell
getUserData(1, (err, user) => {
    if (err) return console.error(err);
    
    getPosts(user.id, (err, posts) => {
        if (err) return console.error(err);
        
        getComments(posts[0].id, (err, comments) => {
            if (err) return console.error(err);
            
            console.log('User:', user);
            console.log('Posts:', posts);
            console.log('Comments:', comments);
        });
    });
});
```

### Promises

```javascript
// Chuyển đổi callbacks thành Promises
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: userId, name: 'John' });
        }, 1000);
    });
}

function getPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);
        }, 1000);
    });
}

function getComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{ id: 1, text: 'Great post!' }]);
        }, 1000);
    });
}

// Sử dụng Promises
getUserData(1)
    .then(user => {
        console.log('User:', user);
        return getPosts(user.id);
    })
    .then(posts => {
        console.log('Posts:', posts);
        return getComments(posts[0].id);
    })
    .then(comments => {
        console.log('Comments:', comments);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## 🆕 Modern JavaScript Features (ES2024)

### Top-level Await

```javascript
// ES2024 - Top-level await trong modules
// main.js
const data = await fetch('/api/data').then(r => r.json());
console.log('Data loaded:', data);

// Có thể sử dụng trực tiếp trong module
const config = await import('./config.js');
const { default: settings } = await import('./settings.json', { 
    assert: { type: 'json' } 
});

// Error handling với top-level await
try {
    const user = await fetchUser(1);
    console.log('User:', user);
} catch (error) {
    console.error('Failed to load user:', error);
}
```

### Private Fields với Async Methods

```javascript
// ES2024 - Private fields trong classes
class ApiClient {
    #baseUrl;
    #cache = new Map();
    #abortController = new AbortController();
    
    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
    }
    
    async #makeRequest(endpoint, options = {}) {
        const url = `${this.#baseUrl}${endpoint}`;
        const cacheKey = `${url}-${JSON.stringify(options)}`;
        
        // Check cache first
        if (this.#cache.has(cacheKey)) {
            return this.#cache.get(cacheKey);
        }
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: this.#abortController.signal
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache the result
            this.#cache.set(cacheKey, data);
            
            return data;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request was aborted');
            }
            throw error;
        }
    }
    
    async get(endpoint) {
        return this.#makeRequest(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.#makeRequest(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    
    abort() {
        this.#abortController.abort();
    }
    
    clearCache() {
        this.#cache.clear();
    }
}
```

### AbortController và ReadableStream

```javascript
// Modern async patterns với AbortController
class ModernApiClient {
    constructor() {
        this.abortController = new AbortController();
    }
    
    async fetchWithTimeout(url, timeout = 5000) {
        const timeoutId = setTimeout(() => {
            this.abortController.abort();
        }, timeout);
        
        try {
            const response = await fetch(url, {
                signal: this.abortController.signal
            });
            
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        }
    }
    
    async *streamData(url) {
        const response = await this.fetchWithTimeout(url);
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                const chunk = decoder.decode(value, { stream: true });
                yield chunk;
            }
        } finally {
            reader.releaseLock();
        }
    }
    
    async processStream(url) {
        const results = [];
        
        for await (const chunk of this.streamData(url)) {
            try {
                const data = JSON.parse(chunk);
                results.push(data);
            } catch (error) {
                console.warn('Failed to parse chunk:', error);
            }
        }
        
        return results;
    }
}
```

## ⚡ Async/Await

### Cú pháp cơ bản

```javascript
// Async function
async function fetchUserData() {
    try {
        const user = await getUserData(1);
        console.log('User:', user);
        
        const posts = await getPosts(user.id);
        console.log('Posts:', posts);
        
        const comments = await getComments(posts[0].id);
        console.log('Comments:', comments);
        
        return { user, posts, comments };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Sử dụng async function
fetchUserData()
    .then(result => {
        console.log('Final result:', result);
    })
    .catch(error => {
        console.error('Final error:', error);
    });
```

### Async/Await với Error Handling

```javascript
// Error handling với try/catch
async function fetchDataWithErrorHandling() {
    try {
        const user = await getUserData(1);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        
        return { user, posts, comments };
    } catch (error) {
        console.error('Error fetching data:', error);
        // Có thể return default value hoặc re-throw
        return null;
    }
}

// Error handling với Promise.catch
async function fetchDataWithCatch() {
    const user = await getUserData(1).catch(error => {
        console.error('Error getting user:', error);
        return null;
    });
    
    if (!user) return null;
    
    const posts = await getPosts(user.id).catch(error => {
        console.error('Error getting posts:', error);
        return [];
    });
    
    return { user, posts };
}
```

## 🚀 Parallel vs Sequential Execution

### Sequential Execution

```javascript
// Sequential - chậm hơn
async function fetchSequential() {
    const start = Date.now();
    
    const user = await getUserData(1);        // 1s
    const posts = await getPosts(user.id);    // 1s
    const comments = await getComments(posts[0].id); // 1s
    
    const end = Date.now();
    console.log(`Sequential took: ${end - start}ms`); // ~3000ms
    
    return { user, posts, comments };
}
```

### Parallel Execution

```javascript
// Parallel - nhanh hơn
async function fetchParallel() {
    const start = Date.now();
    
    // Tất cả requests chạy song song
    const [user, posts, comments] = await Promise.all([
        getUserData(1),
        getPosts(1),
        getComments(1)
    ]);
    
    const end = Date.now();
    console.log(`Parallel took: ${end - start}ms`); // ~1000ms
    
    return { user, posts, comments };
}
```

### Mixed Approach

```javascript
// Mixed - tối ưu nhất
async function fetchMixed() {
    const start = Date.now();
    
    // Bước 1: Lấy user data
    const user = await getUserData(1);
    
    // Bước 2: Lấy posts và comments song song
    const [posts, comments] = await Promise.all([
        getPosts(user.id),
        getComments(1) // Giả sử có postId = 1
    ]);
    
    const end = Date.now();
    console.log(`Mixed took: ${end - start}ms`); // ~2000ms
    
    return { user, posts, comments };
}
```

## 🔧 Advanced Async Patterns

### Promise.all vs Promise.allSettled

```javascript
// Promise.all - fail fast
async function fetchWithAll() {
    try {
        const results = await Promise.all([
            getUserData(1),
            getPosts(1),
            getComments(1)
        ]);
        console.log('All succeeded:', results);
    } catch (error) {
        console.error('One failed:', error);
    }
}

// Promise.allSettled - chờ tất cả
async function fetchWithAllSettled() {
    const results = await Promise.allSettled([
        getUserData(1),
        getPosts(1),
        getComments(1)
    ]);
    
    const successful = results.filter(r => r.status === 'fulfilled');
    const failed = results.filter(r => r.status === 'rejected');
    
    console.log('Successful:', successful);
    console.log('Failed:', failed);
}
```

### Promise.race

```javascript
// Promise.race - lấy kết quả đầu tiên
async function fetchWithRace() {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), 5000);
    });
    
    const dataPromise = getUserData(1);
    
    try {
        const result = await Promise.race([dataPromise, timeout]);
        console.log('Data received:', result);
    } catch (error) {
        console.error('Error or timeout:', error);
    }
}
```

### Async Iterators

```javascript
// Async iterator
async function* asyncGenerator() {
    yield await getUserData(1);
    yield await getPosts(1);
    yield await getComments(1);
}

// Sử dụng async iterator
async function useAsyncIterator() {
    for await (const data of asyncGenerator()) {
        console.log('Received:', data);
    }
}
```

## ⚛️ React/Next.js Async Patterns (2025)

### Server Components với Async

```javascript
// Next.js 14+ - Server Components
// app/users/page.js
async function UsersPage() {
    // Server-side data fetching
    const users = await fetch('https://api.example.com/users', {
        next: { revalidate: 60 } // Revalidate every 60 seconds
    }).then(res => res.json());
    
    return (
        <div>
            <h1>Users</h1>
            <UsersList users={users} />
        </div>
    );
}

// Server Component với error handling
async function UserProfile({ userId }) {
    try {
        const user = await fetch(`https://api.example.com/users/${userId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('User not found');
                }
                return res.json();
            });
        
        return (
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        );
    } catch (error) {
        return <div>Error: {error.message}</div>;
    }
}
```

### Client Components với Modern Hooks

```javascript
// React 18+ - Client Components với modern hooks
'use client';

import { useState, useEffect, useTransition, useDeferredValue } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Custom hook với React Query
function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
    });
}

// Component với useTransition
function UsersList() {
    const [isPending, startTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState('');
    const deferredSearchTerm = useDeferredValue(searchTerm);
    
    const { data: users, isLoading, error } = useUsers();
    
    const filteredUsers = users?.filter(user => 
        user.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    ) || [];
    
    const handleSearch = (value) => {
        startTransition(() => {
            setSearchTerm(value);
        });
    };
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div>
            <input
                type="text"
                placeholder="Search users..."
                onChange={(e) => handleSearch(e.target.value)}
            />
            {isPending && <div>Searching...</div>}
            <ul>
                {filteredUsers.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
```

### Streaming với Suspense

```javascript
// React 18+ - Streaming với Suspense
import { Suspense } from 'react';

// Streaming component
async function StreamingUserData({ userId }) {
    const user = await fetch(`/api/users/${userId}`).then(r => r.json());
    const posts = await fetch(`/api/users/${userId}/posts`).then(r => r.json());
    
    return (
        <div>
            <h2>{user.name}</h2>
            <PostsList posts={posts} />
        </div>
    );
}

// Parent component với Suspense boundaries
function UserProfile({ userId }) {
    return (
        <div>
            <Suspense fallback={<div>Loading user...</div>}>
                <StreamingUserData userId={userId} />
            </Suspense>
            
            <Suspense fallback={<div>Loading recommendations...</div>}>
                <UserRecommendations userId={userId} />
            </Suspense>
        </div>
    );
}

// Parallel data fetching
async function UserRecommendations({ userId }) {
    const [recommendations, friends] = await Promise.all([
        fetch(`/api/users/${userId}/recommendations`).then(r => r.json()),
        fetch(`/api/users/${userId}/friends`).then(r => r.json())
    ]);
    
    return (
        <div>
            <h3>Recommendations</h3>
            <RecommendationsList recommendations={recommendations} />
            <h3>Friends</h3>
            <FriendsList friends={friends} />
        </div>
    );
}
```

### Modern State Management với Async

```javascript
// Zustand với async actions
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useUserStore = create(
    devtools(
        persist(
            (set, get) => ({
                users: [],
                loading: false,
                error: null,
                
                // Async actions
                fetchUsers: async () => {
                    set({ loading: true, error: null });
                    
                    try {
                        const response = await fetch('/api/users');
                        const users = await response.json();
                        
                        set({ users, loading: false });
                    } catch (error) {
                        set({ error: error.message, loading: false });
                    }
                },
                
                createUser: async (userData) => {
                    try {
                        const response = await fetch('/api/users', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(userData)
                        });
                        
                        const newUser = await response.json();
                        
                        set(state => ({
                            users: [...state.users, newUser]
                        }));
                        
                        return newUser;
                    } catch (error) {
                        set({ error: error.message });
                        throw error;
                    }
                },
                
                updateUser: async (userId, updates) => {
                    try {
                        const response = await fetch(`/api/users/${userId}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updates)
                        });
                        
                        const updatedUser = await response.json();
                        
                        set(state => ({
                            users: state.users.map(user => 
                                user.id === userId ? updatedUser : user
                            )
                        }));
                        
                        return updatedUser;
                    } catch (error) {
                        set({ error: error.message });
                        throw error;
                    }
                }
            }),
            {
                name: 'user-store',
                partialize: (state) => ({ users: state.users })
            }
        )
    )
);

// Jotai với async atoms
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/utils';

// Async atom
const usersAtom = atomWithQuery(() => ({
    queryKey: ['users'],
    queryFn: async () => {
        const response = await fetch('/api/users');
        return response.json();
    }
}));

// Derived atom
const userCountAtom = atom((get) => {
    const users = get(usersAtom);
    return users.data?.length || 0;
});

// Component sử dụng Jotai
function UsersList() {
    const [users] = useAtom(usersAtom);
    const [userCount] = useAtom(userCountAtom);
    
    if (users.isLoading) return <div>Loading...</div>;
    if (users.error) return <div>Error: {users.error.message}</div>;
    
    return (
        <div>
            <h2>Users ({userCount})</h2>
            <ul>
                {users.data?.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
```

## 🌐 Real-world Examples

### API Client với Retry Logic

```javascript
class ApiClient {
    constructor(baseURL, maxRetries = 3) {
        this.baseURL = baseURL;
        this.maxRetries = maxRetries;
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                return await response.json();
            } catch (error) {
                console.log(`Attempt ${attempt} failed:`, error.message);
                
                if (attempt === this.maxRetries) {
                    throw error;
                }
                
                // Exponential backoff
                await new Promise(resolve => 
                    setTimeout(resolve, Math.pow(2, attempt) * 1000)
                );
            }
        }
    }
    
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

// Sử dụng ApiClient
const api = new ApiClient('https://api.example.com');

async function fetchUserData() {
    try {
        const user = await api.get('/users/1');
        const posts = await api.get(`/users/${user.id}/posts`);
        const comments = await api.get(`/posts/${posts[0].id}/comments`);
        
        return { user, posts, comments };
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
}
```

### Database Operations với Transaction

```javascript
class Database {
    constructor() {
        this.connection = null;
    }
    
    async connect() {
        // Simulate database connection
        this.connection = { connected: true };
    }
    
    async query(sql, params = []) {
        if (!this.connection) {
            throw new Error('Database not connected');
        }
        
        // Simulate database query
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ rows: [{ id: 1, name: 'John' }] });
            }, 100);
        });
    }
    
    async beginTransaction() {
        await this.query('BEGIN');
        return new Transaction(this);
    }
}

class Transaction {
    constructor(db) {
        this.db = db;
        this.committed = false;
        this.rolledBack = false;
    }
    
    async query(sql, params = []) {
        if (this.committed || this.rolledBack) {
            throw new Error('Transaction already completed');
        }
        return this.db.query(sql, params);
    }
    
    async commit() {
        if (this.committed || this.rolledBack) {
            throw new Error('Transaction already completed');
        }
        
        await this.db.query('COMMIT');
        this.committed = true;
    }
    
    async rollback() {
        if (this.committed || this.rolledBack) {
            throw new Error('Transaction already completed');
        }
        
        await this.db.query('ROLLBACK');
        this.rolledBack = true;
    }
}

// Sử dụng Database với Transaction
async function transferMoney(fromUserId, toUserId, amount) {
    const db = new Database();
    await db.connect();
    
    const transaction = await db.beginTransaction();
    
    try {
        // Check balance
        const fromUser = await transaction.query(
            'SELECT balance FROM users WHERE id = ?',
            [fromUserId]
        );
        
        if (fromUser.rows[0].balance < amount) {
            throw new Error('Insufficient funds');
        }
        
        // Deduct from sender
        await transaction.query(
            'UPDATE users SET balance = balance - ? WHERE id = ?',
            [amount, fromUserId]
        );
        
        // Add to receiver
        await transaction.query(
            'UPDATE users SET balance = balance + ? WHERE id = ?',
            [amount, toUserId]
        );
        
        // Commit transaction
        await transaction.commit();
        console.log('Transfer completed successfully');
        
    } catch (error) {
        // Rollback on error
        await transaction.rollback();
        console.error('Transfer failed:', error);
        throw error;
    }
}
```

### File Processing với Streams

```javascript
const fs = require('fs').promises;
const path = require('path');

class FileProcessor {
    constructor(inputDir, outputDir) {
        this.inputDir = inputDir;
        this.outputDir = outputDir;
    }
    
    async processFiles() {
        try {
            // Đọc danh sách files
            const files = await fs.readdir(this.inputDir);
            
            // Xử lý từng file song song
            const results = await Promise.allSettled(
                files.map(file => this.processFile(file))
            );
            
            // Tổng hợp kết quả
            const successful = results.filter(r => r.status === 'fulfilled');
            const failed = results.filter(r => r.status === 'rejected');
            
            console.log(`Processed ${successful.length} files successfully`);
            console.log(`Failed to process ${failed.length} files`);
            
            return { successful, failed };
            
        } catch (error) {
            console.error('Error processing files:', error);
            throw error;
        }
    }
    
    async processFile(filename) {
        const inputPath = path.join(this.inputDir, filename);
        const outputPath = path.join(this.outputDir, `processed_${filename}`);
        
        try {
            // Đọc file
            const content = await fs.readFile(inputPath, 'utf8');
            
            // Xử lý content (ví dụ: transform text)
            const processedContent = content
                .toUpperCase()
                .replace(/\s+/g, ' ')
                .trim();
            
            // Ghi file đã xử lý
            await fs.writeFile(outputPath, processedContent, 'utf8');
            
            console.log(`Processed: ${filename}`);
            return { filename, success: true };
            
        } catch (error) {
            console.error(`Failed to process ${filename}:`, error);
            throw error;
        }
    }
}

// Sử dụng FileProcessor
async function main() {
    const processor = new FileProcessor('./input', './output');
    
    try {
        const results = await processor.processFiles();
        console.log('Processing completed:', results);
    } catch (error) {
        console.error('Processing failed:', error);
    }
}
```

## 🧪 Modern Testing với Vitest và Playwright (2025)

### Vitest Testing

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.js']
    }
});

// async-functions.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchUserData, fetchUserPosts } from './async-functions';

// Mock fetch
global.fetch = vi.fn();

describe('Async Functions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it('should fetch user data successfully', async () => {
        const mockUser = { id: 1, name: 'John' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUser
        });
        
        const result = await fetchUserData(1);
        
        expect(result).toEqual(mockUser);
        expect(fetch).toHaveBeenCalledWith('/api/users/1');
    });
    
    it('should handle fetch errors', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });
        
        await expect(fetchUserData(1)).rejects.toThrow('Failed to fetch user data');
    });
    
    it('should handle network errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));
        
        await expect(fetchUserData(1)).rejects.toThrow('Network error');
    });
    
    it('should handle multiple async operations', async () => {
        const mockUser = { id: 1, name: 'John' };
        const mockPosts = [{ id: 1, title: 'Post 1' }];
        
        fetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockPosts
            });
        
        const [user, posts] = await Promise.all([
            fetchUserData(1),
            fetchUserPosts(1)
        ]);
        
        expect(user).toEqual(mockUser);
        expect(posts).toEqual(mockPosts);
    });
    
    it('should handle timeout', async () => {
        const timeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout')), 100);
        });
        
        fetch.mockImplementationOnce(() => 
            new Promise(resolve => setTimeout(resolve, 200))
        );
        
        await expect(
            Promise.race([fetchUserData(1), timeout])
        ).rejects.toThrow('Timeout');
    });
});
```

### Playwright E2E Testing

```javascript
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
});

// tests/async-operations.spec.js
import { test, expect } from '@playwright/test';

test.describe('Async Operations', () => {
    test('should load user data asynchronously', async ({ page }) => {
        await page.goto('/users');
        
        // Wait for loading state
        await expect(page.locator('[data-testid="loading"]')).toBeVisible();
        
        // Wait for data to load
        await expect(page.locator('[data-testid="user-list"]')).toBeVisible();
        
        // Check if users are displayed
        const userItems = page.locator('[data-testid="user-item"]');
        await expect(userItems).toHaveCountGreaterThan(0);
    });
    
    test('should handle search with debouncing', async ({ page }) => {
        await page.goto('/users');
        
        // Type in search input
        const searchInput = page.locator('[data-testid="search-input"]');
        await searchInput.fill('John');
        
        // Wait for debounced search
        await page.waitForTimeout(500);
        
        // Check if results are filtered
        const userItems = page.locator('[data-testid="user-item"]');
        await expect(userItems).toHaveCountGreaterThan(0);
        
        // Check if all visible users contain "John"
        const userNames = await userItems.allTextContents();
        userNames.forEach(name => {
            expect(name.toLowerCase()).toContain('john');
        });
    });
    
    test('should handle error states', async ({ page }) => {
        // Mock API to return error
        await page.route('/api/users', route => {
            route.fulfill({
                status: 500,
                body: JSON.stringify({ error: 'Internal Server Error' })
            });
        });
        
        await page.goto('/users');
        
        // Check if error message is displayed
        await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
        await expect(page.locator('[data-testid="error-message"]')).toContainText('Failed to load users');
    });
    
    test('should handle concurrent operations', async ({ page }) => {
        await page.goto('/users');
        
        // Click multiple users simultaneously
        const userItems = page.locator('[data-testid="user-item"]');
        const firstUser = userItems.first();
        const secondUser = userItems.nth(1);
        
        // Click both users at the same time
        await Promise.all([
            firstUser.click(),
            secondUser.click()
        ]);
        
        // Check if both user details are loaded
        await expect(page.locator('[data-testid="user-details"]')).toHaveCount(2);
    });
});
```

## 🧪 Testing Async Code

### Testing với Jest

```javascript
// async-functions.js
export async function fetchUserData(userId) {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return response.json();
}

export async function fetchUserPosts(userId) {
    const response = await fetch(`/api/users/${userId}/posts`);
    if (!response.ok) {
        throw new Error('Failed to fetch user posts');
    }
    return response.json();
}

// async-functions.test.js
import { fetchUserData, fetchUserPosts } from './async-functions';

// Mock fetch
global.fetch = jest.fn();

describe('Async Functions', () => {
    beforeEach(() => {
        fetch.mockClear();
    });
    
    test('fetchUserData should return user data', async () => {
        const mockUser = { id: 1, name: 'John' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUser
        });
        
        const result = await fetchUserData(1);
        expect(result).toEqual(mockUser);
        expect(fetch).toHaveBeenCalledWith('/api/users/1');
    });
    
    test('fetchUserData should throw error on failed request', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });
        
        await expect(fetchUserData(1)).rejects.toThrow('Failed to fetch user data');
    });
    
    test('should handle multiple async operations', async () => {
        const mockUser = { id: 1, name: 'John' };
        const mockPosts = [{ id: 1, title: 'Post 1' }];
        
        fetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockPosts
            });
        
        const [user, posts] = await Promise.all([
            fetchUserData(1),
            fetchUserPosts(1)
        ]);
        
        expect(user).toEqual(mockUser);
        expect(posts).toEqual(mockPosts);
    });
});
```

## 🛠️ Practical Exercises & GitHub Repository

### Exercise 1: Modern Async API Client

Tạo một modern API client với ES2024 features:

```javascript
// src/api/client.js
class ModernApiClient {
    #baseUrl;
    #cache = new Map();
    #abortController = new AbortController();
    
    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
    }
    
    async #makeRequest(endpoint, options = {}) {
        const url = `${this.#baseUrl}${endpoint}`;
        const cacheKey = `${url}-${JSON.stringify(options)}`;
        
        // Check cache first
        if (this.#cache.has(cacheKey)) {
            return this.#cache.get(cacheKey);
        }
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: this.#abortController.signal
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache the result
            this.#cache.set(cacheKey, data);
            
            return data;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request was aborted');
            }
            throw error;
        }
    }
    
    async get(endpoint) {
        return this.#makeRequest(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.#makeRequest(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    
    abort() {
        this.#abortController.abort();
    }
    
    clearCache() {
        this.#cache.clear();
    }
}

export default ModernApiClient;
```

### Exercise 2: React Hook với Async

```javascript
// src/hooks/useAsyncData.js
import { useState, useEffect, useCallback } from 'react';

function useAsyncData(fetchFn, dependencies = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFn();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, dependencies);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    return { data, loading, error, refetch: fetchData };
}

export default useAsyncData;
```

### Exercise 3: Next.js API Route với Streaming

```javascript
// app/api/users/stream/route.js
import { NextResponse } from 'next/server';

export async function GET() {
    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
        async start(controller) {
            const users = await fetchUsers();
            
            for (const user of users) {
                const chunk = encoder.encode(JSON.stringify(user) + '\n');
                controller.enqueue(chunk);
                
                // Simulate streaming delay
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            controller.close();
        }
    });
    
    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'application/x-ndjson',
            'Transfer-Encoding': 'chunked'
        }
    });
}
```

## 📁 GitHub Repository

🔗 **Repository**: [javascript-async-await-2025](https://github.com/your-username/javascript-async-await-2025)

**Cấu trúc project:**
```
javascript-async-await-2025/
├── src/
│   ├── api/                 # Modern API client
│   ├── hooks/              # Custom React hooks
│   ├── components/         # React components
│   ├── utils/              # Utility functions
│   └── test/               # Test files
├── app/                    # Next.js app directory
├── tests/                  # Playwright E2E tests
├── vitest.config.js        # Vitest configuration
├── playwright.config.js    # Playwright configuration
├── package.json
└── README.md
```

**Setup Instructions:**
```bash
# Clone repository
git clone https://github.com/your-username/javascript-async-await-2025.git
cd javascript-async-await-2025

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test
npm run test:e2e

# Build for production
npm run build
```

## 📚 Best Practices

### 1. Error Handling

```javascript
// ✅ Good - Specific error handling
async function fetchData() {
    try {
        const user = await getUserData(1);
        const posts = await getPosts(user.id);
        return { user, posts };
    } catch (error) {
        if (error.message.includes('404')) {
            console.log('User not found');
            return null;
        }
        throw error;
    }
}

// ❌ Bad - Generic error handling
async function fetchDataBad() {
    try {
        const user = await getUserData(1);
        const posts = await getPosts(user.id);
        return { user, posts };
    } catch (error) {
        console.log('Something went wrong');
        return null;
    }
}
```

### 2. Performance Optimization

```javascript
// ✅ Good - Parallel execution when possible
async function fetchUserDataOptimized(userId) {
    const [user, posts, comments] = await Promise.all([
        getUserData(userId),
        getPosts(userId),
        getComments(userId)
    ]);
    
    return { user, posts, comments };
}

// ❌ Bad - Sequential execution
async function fetchUserDataSlow(userId) {
    const user = await getUserData(userId);
    const posts = await getPosts(userId);
    const comments = await getComments(userId);
    
    return { user, posts, comments };
}
```

### 3. Memory Management

```javascript
// ✅ Good - Cleanup resources
async function processLargeDataset() {
    let connection = null;
    
    try {
        connection = await createConnection();
        const data = await connection.query('SELECT * FROM large_table');
        
        // Process data in chunks
        for (let i = 0; i < data.length; i += 1000) {
            const chunk = data.slice(i, i + 1000);
            await processChunk(chunk);
        }
        
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}
```

## 📚 Tài liệu tham khảo

### Official Documentation
- [MDN Web Docs - Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info - Async/Await](https://javascript.info/async-await)
- [React 18 Documentation](https://react.dev/)
- [Next.js 14 Documentation](https://nextjs.org/docs)

### Modern Tools & Libraries
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Jotai](https://jotai.org/)
- [TanStack Query](https://tanstack.com/query)

### Best Practices
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [React Best Practices](https://react.dev/learn)
- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application)

### Performance & Optimization
- [Web Performance](https://web.dev/performance/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)

## 🎉 Kết luận

Chúng ta đã tìm hiểu về:

- ✅ **Callbacks vs Promises vs Async/Await**: Evolution của async programming
- ✅ **ES2024 Features**: Top-level await, Private fields, AbortController
- ✅ **Error Handling**: Try/catch, Promise.catch, và modern approaches
- ✅ **Parallel vs Sequential**: Performance optimization với Promise.all
- ✅ **React/Next.js Patterns**: Server Components, Streaming, Suspense
- ✅ **Modern State Management**: Zustand, Jotai với async actions
- ✅ **Advanced Patterns**: Promise.all, Promise.race, Promise.allSettled
- ✅ **Modern Testing**: Vitest, Playwright E2E testing
- ✅ **Real-world Examples**: API clients, database operations, file processing
- ✅ **Best Practices**: Error handling, performance, memory management

## 🚀 Hướng dẫn tiếp theo

**Cho Sinh viên IT & Junior Developers:**
1. Thực hành async/await với GitHub repository
2. Học về [Modern JavaScript ES6+ Features](link-to-es6-post)
3. Thực hành React/Next.js async patterns

**Cho Career Changers:**
1. Master modern async programming patterns
2. Học về [React SPA với Hooks và Routing](link-to-react-post)
3. Thực hành modern testing với Vitest và Playwright

**Cho Backend/Frontend Developers:**
1. Tích hợp async patterns vào full-stack applications
2. Học về performance optimization
3. Thực hành modern state management

---

*Bạn có câu hỏi nào về async/await, modern JavaScript features, hoặc React/Next.js async patterns không? Hãy để lại comment hoặc liên hệ với mình!* 🚀

**🔗 Liên kết hữu ích:**
- [GitHub Repository](https://github.com/your-username/javascript-async-await-2025)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [React 18 Documentation](https://react.dev/)
- [Next.js 14 Documentation](https://nextjs.org/docs)
