import { withInterfereProxy } from "@interfere/next/server";
import { NextResponse } from "next/server";

export default withInterfereProxy(() => NextResponse.next());

export const config = { matcher: ["/((?!_next/static).*)"] };
