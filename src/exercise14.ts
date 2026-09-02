// Define and export the PostItem type
export type PostItem = {
  id: number;
  title: string;
  body: string;
};

export async function fetchPostBatch(postIds: number[]): Promise<PostItem[]> {
  const fetchPromises = postIds.map(async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post with ID: ${id}`);
    }
    
    const data = (await response.json()) as PostItem;
    return data;
  });

  return Promise.all(fetchPromises);
}
