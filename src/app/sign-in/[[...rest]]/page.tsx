import AuthScreen from '@/components/AuthSection/auth_screen'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'


export default async function SignIn() {
  return (
    <AuthScreen />
  )
}

