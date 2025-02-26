'use client'; // Required for client-side logic in the `app` directory

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // useRouter for navigation
import Home from './home';

function Index() {
  const router = useRouter();

  useEffect(() => {
    // Check for the access token in localStorage
    const accessToken = localStorage.getItem('admin_access_token');
    if (accessToken) {
      // Redirect to the /admin page if the token exists
      router.push('/admin');
    }
  }, [router]);

  // Render the Home page while checking the token
  return (
    <div>
      <Home />
    </div>
  );
}

export default Index;
