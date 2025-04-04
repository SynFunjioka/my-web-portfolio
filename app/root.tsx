import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { AlertProvider } from "./context/AlertContext";
import { contactSchema } from "./schemas/contact.schema";
import { ISendEmailParams, sendEmail } from "./utils/mailer.server";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta = () => [
  { charset: "utf-8" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { name: "title", content: "Alan Flores - Desarrollador web" },
  { name: "description", content: "Portafolio de Alan Flores, un desarrollador web especializado en React y Remix, Nest.js y Node.js." },
  { name: "keywords", content: "Alan Flores, desarrollador web, portafolio, React, Remix, Nest.js, Node.js" },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const data = {
    name   : String(formData.get("name")),
    subject: String(formData.get("subject")),
    email  : String(formData.get("email")),
    message: String(formData.get("message")),
  };

  const validation = contactSchema.safeParse(data);
  if (!validation.success) {
    return new Response(JSON.stringify({ errors: validation.error.format() }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await sendEmail(data as ISendEmailParams);
    return new Response(
      JSON.stringify({ success: "Correo enviado exitosamente." }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Hubo un problema al enviar el correo." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AlertProvider>
      <Outlet />
    </AlertProvider>
  );
}
