import { SignIn } from '@clerk/react';
import { Suspense } from 'react';

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <Suspense fallback={<div className="text-sm text-font-secondary">Loading...</div>}>
        <SignIn />
      </Suspense>
    </div>
  );
}
