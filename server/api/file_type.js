export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const response = await fetch(body.file_url);
    const headers = await response.headers;
    let fileType = headers.get('Content-Type');
    return fileType;
})