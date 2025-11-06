export async function hasInternet(): Promise<boolean> {
  try {
    const res = await fetch("https://www.google.com", { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}
