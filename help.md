## Response Data Header

After API request we get json response with some headers which is

- x-powered-By: `says which language code written `
  - In my case it is 'Express'
    <br>

- content-type: `says which type got on reponse`
  - I got application/json and encoding format which is charset=utf-8
  - "application/json; charset=utf-8"
    <br>

- content-length: `length of the response data`
  <br>

- ETag: `A unique identifier (hash) of the response`
  - ==Used for caching==
  - W/"5d-bB/UtG/VI1jJeupBswRAfNm4cZU"
    <br>

- Date: `Showing date`
  - Tue, 24 Mar 2026 07:51:54 GMT
    <br>
- Connection: `TCP connection`
  - keep-alive
    <br>

- Keep-Alive: `Gives time to check alive or not`
  - timeout=5
    <br>
