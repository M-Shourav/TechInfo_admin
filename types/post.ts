export interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  comments: PostComment[];
}

export interface PostComment {
  id: string;
  text: string;
  username: string;
}

// types.ts

export interface Author {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface TextNode {
  type: "text";
  text: string;
}

export interface Paragraph {
  type: "paragraph";
  attrs: {
    textAlign: string | null;
  };
  content: TextNode[];
}

export interface TiptapDoc {
  type: "doc";
  content: Paragraph[];
}

export interface PostType {
  _id: string;
  title: string;
  summary: string;
  slug: string;
  coverImage: {
    url: string;
    public_id: string;
  }; // or string if only one
  content: TiptapDoc[];
  author: Author;
  categories: Category[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
