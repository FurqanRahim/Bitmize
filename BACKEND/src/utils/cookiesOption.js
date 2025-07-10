const cookiesOption = {
  httpOnly: true,               // Block client-side JS access
  secure: process.env.NODE_ENV === 'production', // HTTPS-only in prod
  sameSite: 'lax',             // Balanced CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, 
}

export default cookiesOption;
