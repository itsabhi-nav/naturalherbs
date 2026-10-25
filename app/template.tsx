/**
 * Page shell, intentionally friction-free:
 * renders children as-is. A client fade here was hiding the ENTIRE page
 * server-side (opacity 0) until JS hydrated, which made every first load
 * on a phone show a blank screen. Content now appears with the first byte.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
