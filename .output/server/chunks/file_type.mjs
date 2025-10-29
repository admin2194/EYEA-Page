import { defineEventHandler, readBody } from 'h3';

const file_type = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await fetch(body.file_url);
  const headers = await response.headers;
  let fileType = headers.get("Content-Type");
  return fileType;
});

export { file_type as default };
//# sourceMappingURL=file_type.mjs.map
