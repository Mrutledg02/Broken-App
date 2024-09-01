# Broken App Issues

1. **Asynchronous Handling:** 
   - The code was attempting to map over promises without awaiting them, leading to incorrect results.

2. **Error Handling:**
   - The `catch` block did not handle the error parameter, resulting in unhandled errors.

3. **Response Handling:**
   - The use of `JSON.stringify()` with `res.send()` was not appropriate. `res.json()` should be used for sending JSON responses.

4. **Code Structure:**
   - The code was not using middleware to parse JSON bodies, making the app fail when handling JSON requests.

5. **Rate Limiting:**
   - The app may face issues with GitHub's rate limiting if many requests are made within a short period.