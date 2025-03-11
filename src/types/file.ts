export interface FileMetadata {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
  uploadDate: Date;
  url?: string;
}

export interface FileUploadResponse {
  status: number;
  message: string;
  creator: string;
  data: FileMetadata | FileMetadata[];
}

export interface FileListResponse {
  status: number;
  message: string;
  creator: string;
  data: FileMetadata[];
}

export interface ErrorResponse {
  status: number;
  message: string;
  creator: string;
  error?: string;
}
