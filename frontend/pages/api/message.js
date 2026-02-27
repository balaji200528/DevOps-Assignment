export default async function handler(req, res) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_INTERNAL_URL}/api/message`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Backend not reachable' });
  }
}