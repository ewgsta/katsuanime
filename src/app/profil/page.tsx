"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';

export default function ProfilRedirect() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            // Mock: always redirect to 'duman' as the default user
            router.replace('/p/duman');
        } else {
            router.replace('/');
        }
    }, [isLoggedIn, router]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div className="loader"></div>
        </div>
    );
}
