import * as React from 'react';

interface EmailTemplateProps {
  username:string,
  otp:string
}

export function EmailTemplate({ username,otp }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <h2>Your verification code is {otp}</h2>
    </div>
  );
}