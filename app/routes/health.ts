import { json } from "remix";

// the health endpoint tells render's auto-deployment that the service is ready
// to receive traffic
// optionally add in checks here to dependencies like pinging a database
export function loader() {
  return json({ ok: true });
}