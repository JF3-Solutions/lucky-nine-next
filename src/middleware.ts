import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { descifrarBase64 } from './utilities/descifrarBase64';
import { ROLES } from './models/Roles.enum';

const secret = process.env.NEXT_PUBLIC_SECRET_JWT;

const cryptoKey = process.env.NEXT_PUBLIC_CRYPTO_KEY;

const signInRoute = '/sign-in';

const adminRoutes = '/admin';

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get('refresh');

  if (!jwt) {
    return NextResponse.redirect(new URL(signInRoute, request.url));
  }

  // this condition avoid to show the login page if the user is logged in
  // if (jwt) {
  //   if (request.nextUrl.pathname.includes(signInRoute)) {
  //     try {
  //       await jwtVerify(jwt.value, new TextEncoder().encode(secret));
  //       return NextResponse.redirect(new URL('/', request.url));
  //     } catch (error) {
  //       console.log('error: ', error);
  //       return NextResponse.next();
  //     }
  //   }
  // }

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode(secret)
    );

    // Validamos si la ruta es alguna del administrador
    if (request.nextUrl.pathname.includes(adminRoutes)) {
      // Validamos el rol del usuario
      if (payload) {
        // Validación para que TS no se queje XD
        if (
          typeof payload?.role !== 'string' ||
          typeof cryptoKey !== 'string'
        ) {
          return;
        }

        const descryptedRole = descifrarBase64(payload?.role, cryptoKey);

        // Si el role es diferente a admin, lo mandamos al home
        if (descryptedRole !== ROLES.ADMIN) {
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
    }

    // Lo dejamos pasar
    return NextResponse.next();
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.redirect(new URL(signInRoute, request.url));
  }
}

// Rutas protegidas
export const config = {
  matcher: ['/admin/:path*'],
};
