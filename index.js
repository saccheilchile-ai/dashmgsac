import DASHBOARD_HTML from './dashboard.html';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const N8N = env.N8N_WEBHOOK_URL;

    // ── CORS preflight ──
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // ── API proxy → n8n ──
    if (url.pathname === '/api/data' && request.method === 'POST') {
      try {
        const body = await request.json();
        const res = await fetch(N8N, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // ── Dashboard ──
    return new Response(DASHBOARD_HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  },
};
