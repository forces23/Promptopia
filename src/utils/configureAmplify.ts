'use client'
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import { useEffect } from 'react';

export default function ConfigureAmplify() {
  useEffect(() => {
    console.log('[ConfigureAmplify] Initializing Amplify on client side');
    
    // Configure Amplify on the client-side
    Amplify.configure(outputs, {
      ssr: true // Enable SSR mode
    });
    
    console.log('[ConfigureAmplify] Amplify initialized');
  }, []);
  
  return null; // This component doesn't render anything
}