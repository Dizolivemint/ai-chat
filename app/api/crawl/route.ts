import seed from './seed'
import { NextResponse } from 'next/server';
import { ServerlessSpecCloudEnum } from '@pinecone-database/pinecone'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { url, options, index } = await req.json();
  try {
    const { host, region } = getConfigForIndex(index);

    const documents = await seed(
      url,
      1,
      index!,
      host,
      region,
      options
    );
    return NextResponse.json({ success: true, documents });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed crawling" });
  }
}

type IndexConfig = {
  host: ServerlessSpecCloudEnum;
  region: string;
};

function getConfigForIndex(index: string): IndexConfig {
  switch (index) {
    case 'symposium':
      return {
        host: process.env.PINECONE_CLOUD as ServerlessSpecCloudEnum,
        region: process.env.PINECONE_REGION || 'us-east-1',
      };
    case 'blackboard-developer':
      return {
        host: process.env.PINECONE_HOST_BB_DEV as ServerlessSpecCloudEnum,
        region: process.env.PINECONE_REGION || 'us-east-1',
      };
    default:
      throw new Error(`No configuration found for index: ${index}`);
  }
}