import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const res = await axios.get(
      'http://makeup-api.herokuapp.com/api/v1/products.json'
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
