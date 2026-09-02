import { promises as fs } from 'fs';

export type CommentSummary = {
  postId: number;
  id: number;
  commenterEmail: string;
};

type JsonPlaceholderComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export async function processCommentsPipeline(
  targetPostId: number,
  outputPath: string,
): Promise<number> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${targetPostId}/comments`);

  if (!response.ok) {
    throw new Error(`Failed to fetch comments for post ID: ${targetPostId}`);
  }

  const rawComments = (await response.json()) as JsonPlaceholderComment[];

  const transformedComments: CommentSummary[] = rawComments.map((comment) => ({
    postId: comment.postId,
    id: comment.id,
    commenterEmail: comment.email.trim(),
  }));

  const filteredComments = transformedComments.filter(
    (comment) => !comment.commenterEmail.toLowerCase().endsWith('.org'),
  );

  const serializedData = JSON.stringify(filteredComments, null, 2);

  await fs.writeFile(outputPath, serializedData, 'utf-8');

  return filteredComments.length;
}
