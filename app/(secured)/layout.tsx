"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/signin');
        } else {
          setIsAuthenticated(true);
        }
      }
    }, [router]);

    if (isAuthenticated) {
        return children;
    }

    return <></>;
}
