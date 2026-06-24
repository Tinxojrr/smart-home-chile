import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch the URL' }, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Estrategia de Scrapeo Universal (Meta Tags)
    let title = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
    let image = $('meta[property="og:image"]').attr('content') || '';
    
    // Limpieza básica
    title = title.replace(/\|.*/, '').trim(); // Remover " | AliExpress" o similares
    
    // Si no encontró imagen Open Graph, buscar la primera imagen grande
    if (!image) {
      image = $('img').first().attr('src') || '';
    }

    return NextResponse.json({ title, image });
  } catch (error) {
    console.error('Error scraping URL:', error);
    return NextResponse.json({ error: 'Failed to scrape the URL' }, { status: 500 });
  }
}
