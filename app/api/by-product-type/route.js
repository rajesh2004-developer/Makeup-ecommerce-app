import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productType = searchParams.get('product_type');
  try {
    const res = await axios.get(
      `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`
    );
    const data = res.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || 'Internal Server Error',
      },
      { status: error.status || 500 }
    );
  }
}
