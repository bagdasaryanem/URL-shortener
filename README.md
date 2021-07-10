# URL Shortener

## How to test this application?

1. npm run prep - To install all dependencies;
2. npm run start-web - To run frontend of the application;
3. npm run start-backend - To run backend of the application;

I used MongoDB cloud to make testing on other devices simple. I have created three models:

- User - Where I store users, username and password;
- Url - Where I store created URLs name, long URL and userId to identify the creator of this URL.
- View - Which helps me to control analytics (e.g. views, unique views);

## Back-end dependencies:

- valid-url - Which helps me check if the passed URL from frontend is valid;
- config - To store the configuration (e.g. database keys);
- uuid - To generate unique ids;

## Front-end dependencies:

- material-ui - Helped me to create modern and nice-looking UI;
- react-copy-to-clipboard - I used to implement for the feature of coping short URL;
